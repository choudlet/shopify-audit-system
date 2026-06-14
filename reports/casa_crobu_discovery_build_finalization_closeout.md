# Casa Crobu Discovery And Build Finalization Closeout

**Date:** 2026-06-14  
**Purpose:** Close out the current work order: discovery, scope confirmation, launch approach, and finalization of the Phase 1 build plan.

This document is not a Phase 2 launch support scope. It summarizes what has been clarified and prepared so Casa Crobu can decide whether to proceed into launch activation, QA, campaign setup, and ongoing operations as a separate next phase.

---

## 1. Recommended Closeout Message

Kelly,

I’m at a good closeout point for the first phase of the build and the product discovery portion.

The launch approach is now defined: Casa Crobu Market Club will use a lightweight signup form at `/pages/market-club`, create or update Shopify customers, add source/location/offer/opt-in tags, and prepare SMS/email delivery around the `MARKET5` welcome offer.

I have also confirmed the recommended technical path: Shopify remains the customer and segmentation system, the custom form handles capture and tagging, Twilio is the lightweight SMS provider, and email can be managed through Shopify Email/segments or a simple welcome-email workflow.

The remaining work is now launch activation and operations, not discovery/scope definition. That includes Twilio approval completion, production QA, final QR/signage links, SMS reply handling, welcome email setup, and staff redemption rollout.

---

## 2. Original Work Order Items

| Work order item | Status |
|---|---|
| Kickoff and scope confirmation | Complete |
| Collection of required account access, brand assets, and approvals | Substantially complete; Twilio approval still in process |
| Confirmation of launch offer and signup approach | Complete, pending your final approval |
| Confirmation of email and SMS capture plan | Complete |
| Implementation plan and workflow walkthrough | Complete |
| Finalize launch plan for the Phase 1 build | Complete as a plan; activation is a separate next phase |

---

## 3. Build Plan Confirmed

### Signup Destination

Recommended customer-facing destination:

```text
https://casacrobu.com/pages/market-club
```

The Shopify page embeds the custom Vercel signup app.

Direct Vercel links remain useful for QR testing and market-specific source links:

```text
https://shopify-audit-system.vercel.app
```

### Signup Form

The form captures:

- first name
- last name
- email
- phone
- email opt-in
- SMS opt-in
- source/location/campaign context from URL parameters or a dropdown

If a URL contains `location` or `market`, the form hides the location dropdown.

If no location is present, the form shows a `Where did you find us?` dropdown. This way we will always attempt to get a lead source.

### Shopify Customer Sync

The build plan uses Shopify as the customer record.

On submit:

1. The backend validates the submission.
2. The backend creates or updates a Shopify customer.
3. The backend adds tags.
4. The backend adds a customer note with submission details.
5. The backend will trigger SMS/email/notification workflows.

Shopify Admin credentials remain server-side in Vercel.

---

## 4. Tagging Plan

Core tags:

```text
market_club
welcome_offer_5_off_20 (dependendant on actual offer that you decide)
source_custom_landing_page
```

Source tags:

```text
source_location_south_pearl_street_market
source_channel_product_sticker
source_channel_booth_code
source_channel_shopify_page
source_channel_instagram
campaign_summer_2026
```

Opt-in tags:

```text
email_opt_in
sms_opt_in
```

Opt-in tags should only be added when the customer provides the relevant contact method and checks the relevant box.

---

## 5. Recommended Launch Links

### Shopify Website Page

```text
https://shopify-audit-system.vercel.app?embed=1&channel=shopify_page&campaign=summer-2026
```

### Product Sticker

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street%20Market&channel=product_sticker&campaign=summer-2026
```

### Booth Code

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street%20Market&channel=booth_code&campaign=summer-2026
```

### Instagram / Generic Link

```text
https://shopify-audit-system.vercel.app?channel=instagram&campaign=summer-2026
```

---

## 6. Offer And Redemption Plan

Recommended offer:

```text
MARKET5
5% off one market order of $20 or more
One use per customer
```

Recommended redemption:

1. Customer joins Market Club.
2. Customer receives code by SMS and/or email once messaging is active.
3. Customer shows the SMS/email at the booth.
4. Staff applies the discount manually or through Shopify/POS if the code is configured there.

Recommended staff instruction:

> If a customer shows MARKET5 from the Market Club text or email, apply 5% off one market order of $20 or more.

---

## 7. SMS And Email Plan

### SMS

Recommended provider:

```text
Twilio
```

Recommended SMS:

```text
Grazie from Casa Crobu. Use code MARKET5 for 5% off your next market order of $20 or more. Show this text at the booth. Reply STOP to opt out.
```

Current status:

- Direct Twilio SMS delivery has been selected for the build plan.
- Toll-free verification/approval is in process.
- Production SMS sending should wait until Twilio approves the toll-free number.

Twilio's documentation says toll-free numbers cannot send SMS messages to the U.S. and Canada until toll-free verification is completed and approved. Verification can be submitted through the Twilio Console, and status can be checked in Trust Hub or on the number's Regulatory Information page.

Source: Twilio Toll-Free Verification Console Onboarding Guide  
https://www.twilio.com/docs/messaging/compliance/toll-free/console-onboarding

### Email

Recommended operating model:

- Use Shopify customer tags/segments for audience management.
- Use Shopify Email for ongoing email campaigns if Kelly wants direct control in Shopify.
- Use a simple welcome-email workflow only if immediate email code delivery is needed at launch.

---

## 8. Management And Handoff Plan

Recommended operational inbox:

```text
club@casacrobu.com
```

Why:

- Gives Kelly/team one place for Market Club replies and questions.
- Can receive forwarded Twilio replies.
- Can receive internal signup notifications if desired.
- Keeps customer communication owned by Casa Crobu instead of a consultant inbox.

Recommended future SMS reply flow:

```text
Customer replies to Twilio number
→ Twilio inbound webhook
→ forward reply to club@casacrobu.com
→ Kelly/team responds or decides follow-up
```

This is a next-phase operations setup item, not required to close discovery/build finalization.

---

## 9. Cost And Usage Framing

The recommended lightweight approach avoids a heavy SMS/email platform commitment before the pilot proves signup and redemption volume.

Cost posture:

- Shopify remains the customer database and email segmentation layer.
- Vercel hosts the signup form.
- Twilio is usage-based for SMS.
- Make can remain optional for notifications/logging.
- A heavier platform such as Klaviyo, Postscript, Attentive, or SimpleTexting can be revisited if the Market Club proves volume and revenue.

Source: Twilio U.S. SMS Pricing  
https://www.twilio.com/en-us/sms/pricing/us

Recommended framing:

> We are not committing Casa Crobu to a heavy SMS platform before the pilot proves opt-in volume and redemption. The current plan keeps customer records in Shopify, uses tags for reporting, and uses Twilio for lightweight SMS delivery once the number is approved.

---

## 10. Remaining Decisions For Kelly

To move into launch activation, Kelly should confirm:

1. Final offer: `MARKET5`, 5% off one market order of $20 or more.
2. Final redemption process: show SMS/email at booth, staff applies discount.
3. `/pages/market-club` as the website destination.
4. Initial source channels:
   - `product_sticker`
   - `booth_code`
   - `shopify_page`
   - `instagram`
5. Launch market/location list.
6. Whether to create `club@casacrobu.com`.
7. Whether welcome email is needed at launch or SMS is enough after Twilio approval.
8. Whether launch QA and campaign operations should be scoped as the next phase.

---

## 11. Suggested Boundary For Next Phase

The next phase would be activation and operations, such as:

- Twilio approval follow-through
- production SMS test
- inbound SMS reply forwarding
- welcome email setup
- QR code generation
- final Shopify page QA
- market-specific QR/signage package
- staff redemption instructions
- first-week launch monitoring
- reporting on signups by source/location/channel

This should be treated separately from the current discovery and build-finalization work order.
