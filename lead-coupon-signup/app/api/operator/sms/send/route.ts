import { NextResponse } from "next/server";
import { appendInboundSmsLog } from "@/lib/google-sheets";
import { sendSms } from "@/lib/twilio";
import { normalizePhone } from "@/lib/validation";

type OperatorSmsPayload = {
  phone?: unknown;
  message?: unknown;
  password?: unknown;
  operator?: unknown;
};

export async function POST(request: Request) {
  let json: OperatorSmsPayload;

  try {
    json = (await request.json()) as OperatorSmsPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const configuredPassword = process.env.OPERATOR_SMS_PASSWORD;

  if (!configuredPassword) {
    return NextResponse.json({ ok: false, error: "Operator SMS is not configured." }, { status: 503 });
  }

  if (typeof json.password !== "string" || json.password !== configuredPassword) {
    return NextResponse.json({ ok: false, error: "Invalid operator password." }, { status: 401 });
  }

  const phone = normalizePhone(json.phone);
  const message = cleanText(json.message, 1000);
  const operator = cleanText(json.operator, 80);

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
  });

  return NextResponse.json({ ok: true, messageSid: sms.sid });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

async function appendOutboundSmsLogSafely({
  phone,
  message,
  operator,
  messageSid,
  syncStatus,
  error,
}: {
  phone: string;
  message: string;
  operator: string;
  messageSid: string;
  syncStatus: string;
  error: string;
}): Promise<void> {
  try {
    await appendInboundSmsLog({
      receivedAt: new Date().toISOString(),
      fromPhone: phone,
      body: message,
      optOutType: "",
      action: operator ? `outbound_custom:${operator}` : "outbound_custom",
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
