import { NextResponse } from "next/server";
import { authenticateOperatorSms } from "@/lib/operator-sms";
import { buildSmsAudienceQuery, getSmsAudience } from "@/lib/sms-campaign";
import { getSmsAudienceRecipients } from "@/lib/shopify";

type AudiencePayload = {
  audienceId?: unknown;
  password?: unknown;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: AudiencePayload;

  try {
    json = (await request.json()) as AudiencePayload;
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

  if (!audience) {
    return NextResponse.json({ ok: false, error: "Select a valid audience." }, { status: 400 });
  }

  try {
    const recipients = await getSmsAudienceRecipients(buildSmsAudienceQuery(audience));

    return NextResponse.json({
      ok: true,
      audienceId: audience.id,
      audienceLabel: audience.label,
      eligibleCount: recipients.length,
    });
  } catch (error) {
    console.error("Could not load the Shopify SMS audience", error);
    return NextResponse.json(
      { ok: false, error: "Could not load this audience from Shopify." },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
