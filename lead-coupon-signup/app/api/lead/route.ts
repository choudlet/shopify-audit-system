import { NextResponse } from "next/server";
import { createOrUpdateShopifyCustomer } from "@/lib/shopify";
import { validateLeadPayload, type NormalizedLeadPayload } from "@/lib/validation";

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
    await notifyMake(validation.data, shopifyResult.customerId);

    return NextResponse.json({
      ok: true,
      customerId: shopifyResult.customerId,
      action: shopifyResult.action,
    });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { ok: false, error: "We could not submit the form right now. Please try again." },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

async function notifyMake(lead: NormalizedLeadPayload, shopifyCustomerId: string) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const payload = {
    event: "lead_form_submitted",
    firstName: lead.firstName,
    lastName: lead.lastName || "",
    email: lead.email || "",
    phone: lead.phone || "",
    market: lead.market || "",
    message: lead.message || "",
    smsOptIn: Boolean(lead.smsOptIn),
    emailOptIn: Boolean(lead.emailOptIn),
    shopifyCustomerId,
    internalNotificationPhone: process.env.INTERNAL_NOTIFICATION_PHONE || "",
    submittedAt: lead.submittedAt,
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Make webhook failed with ${response.status}.`);
  }
}
