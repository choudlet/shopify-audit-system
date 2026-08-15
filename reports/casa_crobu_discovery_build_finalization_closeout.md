# Casa Crobu Discovery And Build Finalization Closeout

**Date:** 2026-06-14  
**Purpose:** Close out the current work order: discovery, scope confirmation, launch approach, and finalization of the Phase 1 build plan.

This document is not a Phase 2 launch-support scope. It records the completed Phase 1 capture build and the remaining operating work Casa Crobu owns after launch.

---

## 1. Recommended Closeout Message

Kelly,

I’m at a good closeout point for the first phase of the build and the product discovery portion.

The launch approach is live: Casa Crobu Market Club uses a lightweight signup form at `/pages/market-club`, creates or updates Shopify customers, adds source/location/offer/opt-in tags, and sends the `MARKET5` welcome offer by SMS when a customer opts in.

Shopify remains the customer and segmentation system, the custom form handles capture and tagging, Twilio sends the live SMS welcome message, and Shopify Email can manage future email campaigns for email-opted-in customers.

The remaining work is operational: monitoring the live capture system, keeping the QR/signage links current, maintaining staff redemption instructions, and reviewing Shopify and Twilio reporting.

---

## 2. Original Work Order Items

| Work order item | Status |
|---|---|
| Kickoff and scope confirmation | Complete |
| Collection of required account access, brand assets, and approvals | Complete for the live capture system |
| Confirmation of launch offer and signup approach | Complete |
| Confirmation of email and SMS capture plan | Complete |
| Implementation plan and workflow walkthrough | Complete |
| Finalize launch plan for the Phase 1 build | Complete; the capture system is live |

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
5. The backend sends the welcome SMS through Twilio when the customer opts into SMS.

Shopify Admin credentials remain server-side in Vercel.

---

## 4. Tagging Plan

Core tags:

```text
market_club
welcome_offer_5_off
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
$5 off your next lasagna or market order of $29 or more
One use per customer
```

Recommended redemption:

1. Customer joins Market Club.
2. Customer receives code by SMS and/or email once messaging is active.
3. Customer shows the SMS/email at the booth.
4. Staff applies the discount manually or through Shopify/POS if the code is configured there.

Recommended staff instruction:

> If a customer shows MARKET5 from the Market Club text, apply $5 off their next lasagna or market order of $29 or more.

---

## 7. SMS And Email Plan

### SMS

Recommended provider:

```text
Twilio
```

Recommended SMS:

```text
Benvenuto to the Casa Crobu Market Club. Use code MARKET5 for $5 off your next lasagna or purchase of $29 or more. To redeem at the booth, give the phone number you used to sign up. Reply STOP to opt out.
```

Current status:

- Direct Twilio SMS delivery is live.
- The app sends the welcome SMS after a customer gives SMS consent.
- The inbound webhook records STOP, START, and HELP replies and syncs opt-out status back to Shopify.

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
- Google Sheets logging can remain optional for inbound and operator-SMS audit history.
- A heavier platform such as Klaviyo, Postscript, Attentive, or SimpleTexting can be revisited if the Market Club proves volume and revenue.

Source: Twilio U.S. SMS Pricing  
https://www.twilio.com/en-us/sms/pricing/us

Recommended framing:

> We are not committing Casa Crobu to a heavy SMS platform before the pilot proves opt-in volume and redemption. The current plan keeps customer records in Shopify, uses tags for reporting, and uses Twilio for lightweight SMS delivery once the number is approved.

---

## 10. Remaining Decisions For Kelly

To move into launch activation, Kelly should confirm:

1. Final offer: `MARKET5`, $5 off your next lasagna or market order of $29 or more.
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

- Shopify reporting dashboard for Market Club customers, offer redemptions, and source/location tags
- Twilio Messaging dashboard review for delivery and reply activity
- optional welcome-email campaign setup
- first-week launch monitoring
- reporting on signups by source/location/channel

This should be treated separately from the current discovery and build-finalization work order.
