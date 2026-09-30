import { NextResponse } from "next/server";
import { appendInboundSmsLog } from "@/lib/google-sheets";
import { authenticateOperatorSms, cleanOperatorSmsText } from "@/lib/operator-sms";
import { sendSms } from "@/lib/twilio";
import { normalizePhone } from "@/lib/validation";

type OperatorSmsPayload = {
  phone?: unknown;
  message?: unknown;
  password?: unknown;
  operator?: unknown;
  test?: unknown;
};

export async function POST(request: Request) {
  let json: OperatorSmsPayload;

  try {
    json = (await request.json()) as OperatorSmsPayload;
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

  const phone = normalizePhone(json.phone);
  const message = cleanOperatorSmsText(json.message, 1000);
  const operator = cleanOperatorSmsText(json.operator, 80);
  const isTest = json.test === true;

  if (!phone || phone.length < 10) {
    return NextResponse.json({ ok: false, error: "Enter a valid mobile number." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ ok: false, error: "Enter a message to send." }, { status: 400 });
  }

  const sms = await sendSms(phone, message);

  if (!sms.sent) {
    await appendOutboundSmsLogSafely({
      phone,
      message,
      operator,
      messageSid: sms.sid || "",
      syncStatus: "send_failed",
      error: sms.reason || "Twilio did not accept the message.",
      isTest,
    });

    return NextResponse.json({ ok: false, error: "Twilio did not accept the message." }, { status: 502 });
  }

  await appendOutboundSmsLogSafely({
    phone,
    message,
    operator,
    messageSid: sms.sid || "",
    syncStatus: "sent",
    error: "",
    isTest,
  });

  return NextResponse.json({ ok: true, messageSid: sms.sid });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

async function appendOutboundSmsLogSafely({
  phone,
  message,
  operator,
  messageSid,
  syncStatus,
  error,
  isTest,
}: {
  phone: string;
  message: string;
  operator: string;
  messageSid: string;
  syncStatus: string;
  error: string;
  isTest: boolean;
}): Promise<void> {
  try {
    await appendInboundSmsLog({
      receivedAt: new Date().toISOString(),
      fromPhone: phone,
      body: message,
      optOutType: "",
      action: operator
        ? `${isTest ? "outbound_test" : "outbound_custom"}:${operator}`
        : isTest
          ? "outbound_test"
          : "outbound_custom",
      messageSid,
      customerFound: null,
      shopifyCustomerId: "",
      syncStatus,
      error,
    });
  } catch (logError) {
    console.error("Could not append outbound SMS log to Google Sheets", logError);
  }
}
