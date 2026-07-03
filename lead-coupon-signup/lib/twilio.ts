import type { NormalizedLeadPayload } from "./validation";

export type SmsResult = {
  sent: boolean;
  skipped: boolean;
  sid?: string;
  reason?: string;
};

type TwilioMessageResponse = {
  sid?: string;
  message?: string;
};

const WELCOME_SMS_BODY =
  "Grazie from Casa Crobu. Use code MARKET5 for $5 off your next lasagna or purchase of $29 or more. To redeem at the booth, give the phone number you used to sign up. Reply STOP to opt out.";

export async function sendWelcomeSms(lead: NormalizedLeadPayload): Promise<SmsResult> {
  if (!lead.smsOptIn || !lead.phone) {
    return { sent: false, skipped: true };
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!accountSid || !authToken || !messagingServiceSid) {
    console.error("Twilio environment variables are not configured.");
    return { sent: false, skipped: false };
  }

  const body = new URLSearchParams({
    To: lead.phone,
    Body: WELCOME_SMS_BODY,
    MessagingServiceSid: messagingServiceSid,
  });

  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = (await response.json()) as TwilioMessageResponse;

    if (!response.ok) {
      console.error("Twilio welcome SMS failed", {
        status: response.status,
        message: result.message || "Unknown Twilio error",
      });
      return { sent: false, skipped: false };
    }

    return { sent: true, skipped: false, sid: result.sid };
  } catch (error) {
    console.error("Twilio welcome SMS request failed", error);
    return { sent: false, skipped: false };
  }
}
