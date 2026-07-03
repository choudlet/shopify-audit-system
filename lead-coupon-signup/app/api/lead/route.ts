import { NextResponse } from "next/server";
import { createOrUpdateShopifyCustomer, markCustomerWelcomeSmsSent } from "@/lib/shopify";
import { sendWelcomeSms, type SmsResult } from "@/lib/twilio";
import { validateLeadPayload } from "@/lib/validation";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const validation = validateLeadPayload(json);

  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: "Please check the form fields.", errors: validation.errors }, { status: 400 });
  }

  try {
    if (process.env.DEBUG_LEAD_SUBMISSIONS === "true") {
      console.info("Lead form submission", {
        ...validation.data,
        email: validation.data.email ? "[provided]" : "",
        phone: validation.data.phone ? "[provided]" : "",
      });
    }

    const shopifyResult = await createOrUpdateShopifyCustomer(validation.data);
    const sms: SmsResult = shopifyResult.shouldSendWelcomeSms
      ? await sendWelcomeSms(validation.data)
      : { sent: false, skipped: true, reason: "welcome_sms_already_sent" };
    let welcomeSmsTagged = false;

    if (sms.sent) {
      try {
        await markCustomerWelcomeSmsSent(shopifyResult.customerId);
        welcomeSmsTagged = true;
      } catch (error) {
        console.error("Could not tag welcome SMS as sent", error);
      }
    }

    return NextResponse.json({
      ok: true,
      customerId: shopifyResult.customerId,
      action: shopifyResult.action,
      smsSent: sms.sent,
      smsSid: sms.sid,
      welcomeAlreadySent: shopifyResult.alreadyHadWelcomeOffer,
      welcomeSmsAlreadySent: shopifyResult.alreadyHadWelcomeSms,
      welcomeSmsTagged,
    });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      {
        ok: false,
        code: "SHOPIFY_CUSTOMER_SYNC_FAILED",
        error: "We could not submit the form right now. Please try again.",
      },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
