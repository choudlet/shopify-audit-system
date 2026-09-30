import { NextResponse } from "next/server";
import { appendSmsLogs, type InboundSmsLog } from "@/lib/google-sheets";
import { authenticateOperatorSms, cleanOperatorSmsText } from "@/lib/operator-sms";
import { buildSmsAudienceQuery, getSmsAudience } from "@/lib/sms-campaign";
import { getSmsAudienceRecipients, type SmsAudienceRecipient } from "@/lib/shopify";
import { sendSms } from "@/lib/twilio";

type CampaignPayload = {
  audienceId?: unknown;
  confirmed?: unknown;
  expectedRecipientCount?: unknown;
  message?: unknown;
  operator?: unknown;
  password?: unknown;
};

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  let json: CampaignPayload;

  try {
    json = (await request.json()) as CampaignPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const authentication = authenticateOperatorSms(json.password);

  if (!authentication.ok) {
    return NextResponse.json(
      { ok: false, error: authentication.error },
      { status: authentication.status },
    );
  }

  const audience = getSmsAudience(json.audienceId);
  const message = cleanOperatorSmsText(json.message, 1000);
  const operator = cleanOperatorSmsText(json.operator, 80);

  if (!audience) {
    return NextResponse.json({ ok: false, error: "Select a valid audience." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ ok: false, error: "Enter a message to send." }, { status: 400 });
  }

  if (json.confirmed !== true) {
    return NextResponse.json({ ok: false, error: "Confirm the campaign before sending." }, { status: 400 });
  }

  if (
    typeof json.expectedRecipientCount !== "number" ||
    !Number.isInteger(json.expectedRecipientCount) ||
    json.expectedRecipientCount < 0
  ) {
    return NextResponse.json({ ok: false, error: "Load the audience again before sending." }, { status: 400 });
  }

  let recipients: SmsAudienceRecipient[];

  try {
    recipients = await getSmsAudienceRecipients(buildSmsAudienceQuery(audience));
  } catch (error) {
    console.error("Could not reload the Shopify SMS audience", error);
    return NextResponse.json(
      { ok: false, error: "Could not reload this audience from Shopify." },
      { status: 502 },
    );
  }

  if (recipients.length !== json.expectedRecipientCount) {
    return NextResponse.json(
      {
        ok: false,
        error: `The audience changed from ${json.expectedRecipientCount} to ${recipients.length} recipients. Load it again and review the new count.`,
        eligibleCount: recipients.length,
      },
      { status: 409 },
    );
  }

  if (recipients.length === 0) {
    return NextResponse.json({ ok: false, error: "This audience has no eligible SMS recipients." }, { status: 400 });
  }

  const results = await Promise.all(
    recipients.map(async (recipient) => ({
      recipient,
      sms: await sendSms(recipient.phone, message),
    })),
  );
  const loggedAt = new Date().toISOString();
  const action = operator
    ? `outbound_campaign:${operator}:${audience.id}`
    : `outbound_campaign:${audience.id}`;
  const logs: InboundSmsLog[] = results.map(({ recipient, sms }) => ({
    receivedAt: loggedAt,
    fromPhone: recipient.phone,
    body: message,
    optOutType: "",
    action,
    messageSid: sms.sid || "",
    customerFound: true,
    shopifyCustomerId: recipient.customerId,
    syncStatus: sms.sent ? "sent" : "send_failed",
    error: sms.sent ? "" : sms.reason || "Twilio did not accept the message.",
  }));
  let logged = true;

  try {
    logged = await appendSmsLogs(logs);
  } catch (logError) {
    logged = false;
    console.error("Could not append campaign SMS logs to Google Sheets", logError);
  }

  const sentCount = results.filter(({ sms }) => sms.sent).length;
  const failedCount = results.length - sentCount;

  return NextResponse.json({
    ok: true,
    audienceId: audience.id,
    audienceLabel: audience.label,
    recipientCount: recipients.length,
    sentCount,
    failedCount,
    logged,
  });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
