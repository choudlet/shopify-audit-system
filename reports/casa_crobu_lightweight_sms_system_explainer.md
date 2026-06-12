# Casa Crobu Lightweight SMS System Explainer

**Date:** 2026-06-12  
**Purpose:** Explain why the Phase 1 recommendation is a lightweight SMS system instead of immediately adopting a heavier SMS marketing platform.

This is a practical Phase 1 recommendation, not legal advice. Final SMS consent language, sender registration, privacy policy, terms, STOP/HELP handling, and campaign setup should be reviewed against the selected provider's requirements before launch.

---

## Short Version

For the first market-capture pilot, the recommended path is to use a lightweight custom system:

- **Landing page:** the custom Casa Crobu signup page
- **Customer record:** Shopify customer create/update
- **Workflow trigger:** Make webhook
- **SMS infrastructure:** Twilio
- **Optional internal alerts:** Make + Twilio or Make's SMS modules

This gives Casa Crobu the important parts now: a clean customer-facing form, Shopify customer capture, source tags, coupon delivery, and internal notifications. It avoids paying for a larger SMS/lifecycle platform before there is enough market-list volume to justify it.

---

## Why Not Start With A Full SMS Marketing Platform?

Tools like Klaviyo SMS, Postscript, Attentive, or SimpleTexting can be useful later. The issue is timing. Casa Crobu is not yet trying to run a large SMS revenue program. The immediate job is simpler:

1. Capture market shoppers who are currently anonymous.
2. Store the customer in Shopify.
3. Send a welcome/coupon message.
4. Notify the team internally.
5. Learn whether people scan, opt in, redeem, and respond.

A full SMS marketing platform can add monthly cost, setup overhead, list-management complexity, and compliance configuration before the pilot has proven how many shoppers will actually join.

The lightweight system keeps Phase 1 focused on proof: can Casa Crobu turn market traffic into reachable customers?

---

## How This Helps With Cost

The cost advantage is that Casa Crobu pays mostly for usage instead of paying for a larger platform before the list exists.

Twilio's published U.S. SMS pricing currently lists standard long-code SMS at about `$0.0083` per outbound segment and `$0.0083` per inbound segment, before carrier fees and other applicable fees. Twilio also notes that SMS is charged per segment, additional carrier fees may apply, and U.S. A2P 10DLC messaging is subject to registration/onboarding requirements.

That means a small pilot can stay inexpensive:

| Example usage | Rough message cost before carrier/registration/number fees |
|---|---:|
| 100 outbound SMS segments | About `$0.83` |
| 500 outbound SMS segments | About `$4.15` |
| 1,000 outbound SMS segments | About `$8.30` |

There will still be other costs, such as a Twilio phone number, A2P 10DLC registration/campaign fees if using a 10DLC number, carrier pass-through fees, and any Make/Vercel usage. But the key difference is that Casa Crobu does not need to commit to a heavier monthly SMS platform until the list and revenue signal justify it.

Cost framing for Kelly:

> We can prove the market signup loop first, with low fixed cost and usage-based SMS spend, then upgrade to Klaviyo/SimpleTexting/Postscript only if the pilot shows enough opt-ins and redemptions.

---

## How This Helps With Control

The custom system gives Casa Crobu more control over the first version of the workflow.

### Message Control

Casa Crobu can approve exact copy for:

- welcome/coupon SMS
- internal team notifications
- weekly market reminder messages
- special drop or preorder messages
- STOP/HELP compliance copy

The message templates live in the workflow/app instead of being locked into one marketing platform's campaign builder.

### Data Control

The system stores the important customer record in Shopify, with tags like:

- `website-lead`
- `coupon-signup`
- `casa-crobu`
- `source-custom-landing-page`
- `market-south-pearl-street`

This keeps Shopify as the source of truth for customer identity and market signup context.

### Workflow Control

Because the form posts to Casa Crobu's own backend first, the workflow can branch however Casa Crobu wants:

- create/update Shopify customer
- send coupon SMS
- send coupon email
- notify internal phone number
- add market-specific tags
- route notes/questions to the team
- later sync to Klaviyo, Shopify Email, or another platform

This is useful because the pilot may change quickly. If the team learns that one market, one offer, or one message works better, the workflow can be adjusted without rebuilding the whole system.

### Sending Control

With Twilio, Casa Crobu can send transactional-style pilot messages from a controlled phone number, subject to proper consent and registration. The initial send pattern should stay simple:

1. immediate welcome/coupon message after signup
2. occasional market-location reminders
3. occasional preorder or seasonal special messages

This avoids blasting the list while still proving whether SMS is useful.

---

## What Provider Would We Use?

Recommended Phase 1 provider stack:

| Layer | Provider | Role |
|---|---|---|
| Landing page/backend | Vercel + Next.js | Hosts the signup page and secure API route |
| Customer database | Shopify | Creates/updates customer profiles, tags, notes |
| Workflow automation | Make | Receives signup event and routes actions |
| SMS infrastructure | Twilio | Sends SMS messages |
| Optional email | Shopify Email, Make, or later Klaviyo | Sends coupon or market updates by email |

In plain English:

> Twilio is the phone/SMS pipe. Make is the workflow glue. Shopify is the customer record. The custom landing page is the capture experience.

---

## How Twilio Would Be Used

### Phase 1: Simple Make + Twilio Flow

The simplest setup:

1. Customer submits the Casa Crobu signup form.
2. The app creates or updates the Shopify customer.
3. The app sends a webhook to Make.
4. Make checks whether the customer provided a phone number and opted into SMS.
5. Make sends an SMS through Twilio.
6. Make optionally sends an internal notification to Casa Crobu.

Example customer SMS:

> Grazie from Casa Crobu. Use code MARKET5 for 5% off your next market order of $20 or more. Show this text at the booth. Reply STOP to opt out.

Example internal SMS:

> New Casa Crobu market signup: Maria Rossi. Market: South Pearl Street. Contact: maria@example.com / +15551234567.

This is the easiest first version because Make can handle the Twilio action without building extra SMS code immediately.

### Phase 2: Direct Twilio Integration

If the pilot grows, the app can send SMS directly from the serverless backend using Twilio's API. That would allow more control over:

- message templates
- retry behavior
- event logging
- delivery status webhooks
- STOP/HELP handling
- message history
- campaign-specific analytics

This is not required for the first demo or first market test. Make + Twilio is enough to prove the flow.

---

## Compliance Guardrails

Before sending marketing SMS, Casa Crobu should confirm:

1. The form has explicit SMS opt-in language.
2. Consent is not bundled with purchase.
3. Messages include STOP opt-out instructions where appropriate.
4. HELP behavior is configured.
5. Twilio sender registration is completed for the chosen number type.
6. Privacy Policy and Terms links are available if required by the provider/setup.
7. Only SMS-opted-in customers receive SMS marketing messages.

The MVP should not import or text historical phone numbers unless Casa Crobu can verify SMS marketing consent.

---

## Recommended Meeting Framing

Use this language with Kelly:

> My recommendation is not to over-buy SMS software before we know the list will work. For Phase 1, we can use a lightweight system: the landing page captures the signup, Shopify stores the customer, Make routes the workflow, and Twilio sends the SMS. That keeps fixed costs low, gives us control over the exact messages, and lets us test the market-capture loop quickly. If the pilot proves that people opt in and redeem offers, we can later move into Klaviyo, SimpleTexting, or a more advanced SMS platform with better evidence.

---

## Sources To Verify Before Launch

- Twilio U.S. SMS pricing: https://www.twilio.com/en-us/sms/pricing/us
- Twilio Messaging pricing overview: https://www.twilio.com/en-us/pricing/messaging
- Twilio A2P 10DLC guidance and current registration requirements should be checked during provider setup.
