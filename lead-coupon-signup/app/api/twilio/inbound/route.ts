import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { syncCustomerSmsPreference } from "@/lib/shopify";

type SmsPreferenceAction = "opt_out" | "opt_in" | "help";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const params = new URLSearchParams(rawBody);

  if (!isValidTwilioRequest(request, params)) {
    return NextResponse.json({ ok: false, error: "Invalid Twilio signature." }, { status: 403 });
  }

  const phone = cleanText(params.get("From"));
  const body = cleanText(params.get("Body"));
  const optOutType = cleanText(params.get("OptOutType")).toUpperCase();
  const messageSid = cleanText(params.get("MessageSid"));
  const action = getSmsPreferenceAction(optOutType, body);

  if (!phone || !action) {
    return twimlResponse();
  }

  try {
    const result = await syncCustomerSmsPreference({
      phone,
      action,
      body,
      messageSid,
      receivedAt: new Date().toISOString(),
    });

    if (!result.customerFound) {
      console.info("Twilio inbound SMS preference event did not match a Shopify customer", {
        action,
        phone: maskPhone(phone),
        messageSid,
      });
    }
  } catch (error) {
    console.error("Twilio inbound SMS preference sync failed", error);
    return NextResponse.json({ ok: false, error: "Preference sync failed." }, { status: 500 });
  }

  return twimlResponse();
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

function isValidTwilioRequest(request: Request, params: URLSearchParams): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const signature = request.headers.get("x-twilio-signature") || "";

  if (!authToken || !signature) {
    return false;
  }

  const configuredUrl = process.env.TWILIO_INBOUND_WEBHOOK_URL;
  const webhookUrl = configuredUrl || request.url;
  const expectedSignature = createHmac("sha1", authToken)
    .update(`${webhookUrl}${signaturePayload(params)}`)
    .digest("base64");
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function signaturePayload(params: URLSearchParams): string {
  return Array.from(params.keys())
    .sort()
    .map((key) => `${key}${params.get(key) || ""}`)
    .join("");
}

function getSmsPreferenceAction(optOutType: string, body: string): SmsPreferenceAction | null {
  const normalizedBody = body.trim().toUpperCase();

  if (optOutType === "STOP" || ["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"].includes(normalizedBody)) {
    return "opt_out";
  }

  if (optOutType === "START" || ["START", "UNSTOP"].includes(normalizedBody)) {
    return "opt_in";
  }

  if (optOutType === "HELP" || normalizedBody === "HELP") {
    return "help";
  }

  return null;
}

function cleanText(value: string | null): string {
  return value?.trim() || "";
}

function maskPhone(phone: string): string {
  return phone.length > 4 ? `***${phone.slice(-4)}` : "***";
}

function twimlResponse(): Response {
  return new Response("<Response></Response>", {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
