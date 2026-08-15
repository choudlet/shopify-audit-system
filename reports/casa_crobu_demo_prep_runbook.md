# Casa Crobu Demo Prep Runbook

**Prep window:** Wednesday, June 3, 2026 evening  
**Meeting:** Thursday, June 4, 2026 morning  
**Goal:** Demonstrate one shopper journey through Shopify-first and Klaviyo without accidentally launching a real campaign.

## What Must Be Working Tomorrow

The minimum convincing demo is:

1. A proposed Shopify discount configured with safe demo restrictions.
2. A Shopify landing page and form that captures a test subscriber and applies both `market_club` and a location-specific market-club tag.
3. A draft Shopify welcome automation that delivers the offer.
4. A draft Klaviyo signup form and welcome flow that deliver the same Shopify offer.
5. A clear explanation or configured demo of Klaviyo's SMS keyword and Instagram auto-reply advantages.

Do not spend tonight trying to make every feature production-ready. The meeting is for choosing the launch path, not completing Phase 1 before approval.

## Safety Rules

* Keep all forms, flows, automations, campaigns, and discounts inactive, draft, or scheduled for after the meeting.
* Use only your own test email address and phone number.
* Name every demo asset with `DEMO` or `DO NOT SEND`.
* Do not import the full Shopify customer list into Klaviyo.
* Do not activate SMS or send a real campaign.
* Do not connect or change Casa Crobu's Instagram permissions without Kelly's approval.
* Record screenshots after each working step so the demo can survive Wi-Fi or account issues.

## First 10 Minutes: Access Gate

Open each account and mark what you can actually access.

| Access | Needed To Build Tonight | If Missing |
|---|---|---|
| Casa Crobu Shopify admin | Discounts, Forms, Messaging, customers, segments, and analytics | Demo using screens/documentation and ask Kelly to approve access handoff. |
| Shopify Forms app | Live Shopify landing page and form | Install only if authorized; otherwise show the setup path. |
| Shopify Messaging app | Draft welcome automation | Install only if authorized; otherwise show the available automation template. |
| Klaviyo account with Shopify connected | Draft Klaviyo form, flow, coupon delivery, and profile/segment | Use a sandbox/demo account or screenshots. |
| Klaviyo billing/profile access | Actual plan estimate | Make this a live meeting decision/input request. |
| Klaviyo two-way SMS number | Working keyword/tap-to-text demo | Show configuration screens or official documentation; do not chase number setup tonight. |
| Instagram Business Admin access | Working Klaviyo Social Auto-reply | Show the feature and prerequisites; request approval/access after platform selection. |

If Shopify admin or Klaviyo access is missing, send the access request immediately, then continue preparing the mock/demo narrative.

## Tonight's Order Of Operations

### Use Shopify Sidekick To Accelerate Setup

Open Sidekick from the Shopify Admin top navigation. Ask it to draft or configure native Shopify objects, then review every proposed change before applying it.

Suggested prompts:

```text
Help me create a Shopify Forms inline signup form for Casa Crobu's farmers-market club. Require email, make phone and SMS consent optional, tag submissions market_club and city_park_market_club, and use copy focused on market specials, preorder drops, and fall delivery updates.
```

```text
Create a customer segment for customers tagged market_club who are subscribed to email marketing.
```

```text
Create an amount-off-order discount named MARKET5 for $5 off purchases of $29 or more. Make it one use per customer and do not combine it with other discounts. Show me the configuration before applying it.
```

```text
Help me draft a welcome email for new market-list subscribers. Explain that they can show the message at their next market visit for $5 off a purchase of $29 or more.
```

```text
In Shopify Flow, create a draft workflow that runs after the City Park market-club form is submitted, confirms the customer has the market_club and city_park_market_club tags, and sends an internal notification. Do not activate it.
```

For the landing page, use the existing theme editor first. Shopify Magic can generate headings, body copy, images, and theme blocks on Basic. Avoid generating a custom theme block unless the existing page sections cannot produce a clean mobile landing page; generated code still needs mobile and accessibility testing.

### Shopify-First SMS Setup Check: 10 Minutes

Shopify-first SMS uses the **Shopify Messaging** app.

Check:

1. Open **Apps > Messaging**.
2. Open **Settings > SMS**.
3. Confirm whether United States SMS setup has already started or completed.
4. Do not submit the toll-free registration without Kelly's approval. It requires business, contact, privacy-policy, and terms-of-service information and typically takes 2-5 business days.
5. Review the SMS campaign composer and customer-segment selector.

Shopify-first SMS capabilities to explain:

* Shopify Forms can collect phone numbers and explicit SMS marketing consent.
* Shopify Messaging can send SMS campaigns to consented customer segments.
* US SMS currently costs `$0.012` per message.
* The assigned US toll-free number is outbound-only and cannot receive replies.
* Native Shopify Messaging SMS automation templates currently focus on abandoned browse, cart, and checkout. Do not promise a native immediate welcome SMS until that workflow is validated in the account.

Confirmed SMS launch blocker:

* Shopify Forms requires a Terms of Service page and Privacy Policy configured in Shopify legal settings before it can collect SMS consent.
* Kelly owns providing or approving the business/legal policy content.
* Implementation owns adding the approved policy URLs in Shopify and linking them in the SMS consent disclaimer.
* Do not invent or approve legal policy language on Kelly's behalf.

Practical Shopify-first launch:

1. Form collects email required and SMS optional.
2. Shopify creates/updates the customer and records consent.
3. Welcome offer is delivered immediately by email.
4. Casa Crobu sends periodic outbound SMS campaigns to the consented market-list segment after toll-free registration is approved.

This is sufficient if Casa Crobu wants outbound market reminders and specials. Klaviyo remains stronger if Casa Crobu needs text-to-join keywords, replies/conversations, Instagram capture, or a coordinated immediate welcome SMS flow.

### 1. Create The Market-Specific Shopify Page: 15 Minutes

For the demo, show one representative market-specific page and explain that it will be duplicated for each pilot market:

| Market | Page URL | Form Tags |
|---|---|---|
| Arvada | `/pages/welcome-market-arvada` | `market_club`, `arvada_market_club` |
| Boulder | `/pages/welcome-market-boulder` | `market_club`, `boulder_market_club` |
| City Park | `/pages/welcome-market-city-park` | `market_club`, `city_park_market_club` |

Do not confuse it with the discount QR:

* **Signup QR:** Opens the market-specific signup page.
* **Discount QR:** Is delivered after signup and redeemed on the return visit.

Generate each signup QR directly from its page URL. Skip UTM parameters and Shopify Campaigns for Phase 1. The market-specific Form and tags identify the signup market, Shopify Forms reports views/submissions/completion rate, and the attached POS customer measures the later return.

Do not create a campaign for each page. If session-level QR traffic becomes useful later, create one umbrella pilot campaign with multiple shareable links rather than separate campaigns.

For customer-level signup-market attribution, use a separate duplicate Shopify Form for each pilot market. Every form applies the shared `market_club` tag plus its location-specific tag:

| Pilot Form | Shared Tag | Location Tag |
|---|---|---|
| `Market Club - City Park` | `market_club` | `city_park_market_club` |
| `Market Club - Boulder` | `market_club` | `boulder_market_club` |
| `Market Club - South Pearl` | `market_club` | `south_pearl_market_club` |

Point each market's direct QR to the page/form intended for that market. The page-specific form tags are the Phase 1 source of truth; do not add UTM parameters.

Pitch this as the Phase 1 recommendation. It keeps consent and customer profiles native to Shopify while providing useful customer-level market attribution without custom JavaScript.

Tonight, build one representative pilot-market form and be ready to show how it can be duplicated and assigned a different location tag while retaining `market_club`. After Kelly selects the pilot markets, create the remaining market-specific forms, segments, and QR links.

Add **Hulk Contact Form Builder Pro** to the post-demo validation backlog. Trial it only if automatic UTM capture becomes important, and do not adopt it unless a test submission writes native Shopify email and SMS consent correctly.

### 2. Configure The Shared Shopify Discount: 20 Minutes

Create a safe proposed discount in Shopify:

| Setting | Demo Value |
|---|---|
| Code | `MARKET5` |
| Type | Amount off order |
| Value | `$5 off` |
| Strategic purpose | Reward the subscriber's next market visit and build loyalty before introducing a later delivery-conversion offer |
| Minimum purchase | `$29` |
| Intended use | Next market purchase |
| Customer eligibility | All customers for demo |
| Usage | Maximum 10 uses; limit one use per customer |
| Combinations | Off unless there is a clear reason |
| Start date | After the meeting |
| End date | One week after the proposed start |
| Redemption constraint | Shopify codes cannot be restricted to POS only; demonstrate the constraint and ask Kelly to choose the handling approach |

Capture screenshots of:

* the discount rules,
* the scheduled/inactive status,
* where Shopify reports discount redemption,
* and the customer-facing code.

Present `$5 off the next market purchase of $29 or more` as the initial offer. Ask Kelly to approve the expiration and final redemption handling. Explain that the later delivery-conversion offer would be a percentage off the subscriber's first delivery order.

Generate an easily redeemable shared code:

1. Use the live code `MARKET5`.
2. In Shopify Discounts, use **Promote > Get a shareable discount code**.
3. Use **Download QR code** to generate the customer-facing QR.
4. Upload the QR image to Shopify and place it on a Shopify-hosted thank-you page with the text code and offer terms.
5. In the Shopify Form's **Success** settings, choose **Redirect to another page** and select/paste the thank-you-page URL.
6. Place the QR in the welcome email and save it as a backup demo screenshot.
7. On the Shopify POS device, attach your test customer to a draft/test order.
8. Open the QR from another phone and scan it with the POS device camera. Shopify POS must be version 11.5 or later.
9. Confirm the discount applies and the customer remains attached.

Shopify Forms' **Show message** success behavior can display the selected discount code, but it does not natively display the discount QR image. Use the redirect approach for the QR demo. Keep the text code visible on the thank-you page in case scanning fails.

The thank-you page and shared QR are forwardable. Treat this as a convenient pilot workflow, not secure per-customer gating.

Deliver the same offer after signup:

**Shopify email**

1. Add the downloaded QR image to the welcome email.
2. Include the text code `MARKET5` and the offer terms beneath it.
3. Add a **View your market offer** button linking to the Shopify-hosted thank-you page.
4. Send a test email and confirm the QR remains readable on mobile with images enabled.

**Shopify SMS**

1. Send a short link to the Shopify-hosted thank-you page rather than trying to embed the QR image.
2. Use Shopify Messaging's link-shortening option when available.
3. Include concise terms in the message, such as `$5 off $29+ at your next market visit`.
4. Test that the link opens the QR page and that the POS device can scan the displayed QR.

**Klaviyo option**

Klaviyo can send the QR image directly as MMS in supported countries, including the United States, but MMS uses more credits. Prefer the linked offer page for the pilot unless Kelly specifically values image-based text delivery.

Recommended staff script:

> Welcome back. Can I look you up by the email or phone number you used to join? Great, now show me your market-list QR code and I will apply your `$5 off` return offer.

Confirmed POS walkthrough for tomorrow:

1. Start with the `$58` cart and point to **Add customer**.
2. Tap **Add customer** and show that staff can search by email, phone number, name, or address.
3. Attach the subscriber and confirm the customer appears on the cart.
4. Tap the three-dot cart menu, then **Apply discount**.
5. Apply the code and show the final cart with the customer still attached.
6. Point out the successful `$5` discount after the cart meets the `$29` minimum.

The live customer-facing code is `MARKET5`. Update or retire any old demo screenshots before using them in a client handoff.

If the offer must be strictly market-only, do not distribute the shared code. Use this workflow instead:

1. Customer shows the welcome message at the booth.
2. Staff attaches the customer to the Shopify POS order.
3. Staff verifies the offer has not already been redeemed.
4. Once the cart reaches `$29`, staff uses **Apply discount > Apply custom order discount > Amount > `$5`**.
5. Staff completes the order with the customer attached.

Staff must have the Shopify POS **Apply custom discounts** permission.

Decision to explain:

* **Strict market-only:** Staff-controlled POS custom discount; no customer-facing Shopify discount code.
* **Fast scan-to-redeem:** Shared Shopify code and QR; easier, but Shopify cannot prevent online redemption.
* **POS Pro / Retail Markets:** Do not recommend for Phase 1. At `$89 per location per month`, the recurring cost is disproportionate to the value of automating this offer across multiple farmers-market locations.

Demo narration:

> This customer-attachment step is what makes the offer measurable. Attaching the customer first tells us which subscriber returned, what they bought, and whether they later become a delivery customer. If we need the offer to be strictly market-only, staff applies it as a custom Shopify POS discount rather than distributing a standard discount code.

### 3. Build The Shopify-First Journey: 45-60 Minutes

Create an inline Shopify Form and landing page.

**Internal name:** `Market Club Signup`

**Landing page handle:** `/pages/market-club`

**Customer tag:** `market_club`

**Optional source tag:** `source_location_{market}`

Suggested form copy:

**Title:** Join the Casa Crobu Market List  
**Body:** Get market specials, preorder drops, and fall delivery updates.  
**Fields:** First name, email required, phone optional  
**Button:** Join the Market List  
**Success behavior:** Redirect to the Shopify-hosted market-offer thank-you page  
**Thank-you page:** Show the `MARKET5` QR, text code, and `$5` off a market purchase of `$29` or more terms.

Configure:

* email marketing consent,
* optional SMS consent only if the form and account support the intended disclosure setup,
* the shared `market_club` and location-specific customer tags,
* the thank-you-page redirect containing the discount QR and text code,
* and a draft landing page.

Then create a draft Shopify Messaging automation:

**Internal name:** `DEMO - Welcome New Market Subscribers`  
**Template:** Welcome new subscribers with a discount email  
**Subject:** Welcome to the Casa Crobu market list  
**CTA:** View your market offer  
**Code:** `MARKET5`

Test the journey with your email:

1. Open the landing page on mobile.
2. Submit the form.
3. Confirm the customer profile is created or updated.
4. Confirm `market_club` and the correct location-specific market-club tag are present.
5. Confirm consent status is correct.
6. Confirm submission redirects to the thank-you page showing the discount QR and text code.
7. Send a test of the welcome email.
8. Open the customer segment and form analytics screens.

Keep the form and automation inactive after testing unless activation is explicitly required for previewing.

### 4. Build The Klaviyo Draft Journey: 45-60 Minutes

Only do this in Casa Crobu's Klaviyo account if authorized and Shopify is already connected.

Create:

**List:** `DEMO - Market List - DO NOT SEND`  
**Signup form:** `DEMO - Market Signup - DO NOT PUBLISH`  
**Flow:** `DEMO - Market Welcome - MANUAL`  
**Segment:** `DEMO - Market Subscribers`

Configure the signup form with the same shopper-facing copy and live Shopify code, `MARKET5`.

Show in the draft flow:

1. List-triggered welcome message.
2. Static Shopify coupon in the form success step and welcome email.
3. Optional welcome SMS block, left in draft/manual.
4. A reminder branch for subscribers who have not placed an order.
5. Profile properties or source data that could distinguish pilot markets.

Then briefly demonstrate Klaviyo's unique Shopify coupon option without making it the recommended pilot default.

Test using only your email:

1. Submit the Klaviyo form preview.
2. Confirm your profile appears in the demo list.
3. Confirm consent and source properties.
4. Preview the welcome email.
5. Confirm the Shopify static code appears.
6. Show the segment and flow analytics screens.

### 5. Evaluate SMS Keyword Demo: 10 Minutes Maximum

Check whether Klaviyo already has a two-way SMS sending number.

If yes:

* Create or show a custom keyword such as `PASTA`.
* Show the keyword's target list and confirmation behavior.
* Test only with your phone number if the account is already approved for SMS testing.

If no:

* Stop after 10 minutes.
* Show the keyword configuration area or official Klaviyo documentation.
* Explain that a two-way sending number is required before text-to-join and reply-based confirmation can work.

Do not start a number-registration or compliance process just to improve tomorrow's demo.

### 6. Evaluate Instagram Auto-Reply Demo: 10 Minutes Maximum

Check whether Casa Crobu's Instagram Business Account is already connected to Klaviyo and whether you have Admin access.

If yes:

* Create a draft auto-reply keyword such as `PASTA`.
* Configure it to collect email first.
* Show the message sequence and resulting Klaviyo profile properties.
* Test through a DM only if authorized.

If no:

* Stop after 10 minutes.
* Show the Klaviyo Social Auto-reply setup page or documentation.
* Explain that it requires Instagram Business Admin access and account permissions.

Treat Instagram as a Klaviyo differentiator to approve, not a blocker to launching the pilot.

## Screenshots To Capture

Save one screenshot for each of these:

* Shopify discount configuration.
* POS cart before customer attachment.
* POS customer search.
* POS cart with attached customer and Apply discount menu.
* POS cart showing the successfully applied discount.
* One market-specific Shopify page and its direct signup QR.
* Shopify Forms landing page on mobile.
* Shopify Form success state with coupon.
* Shopify customer profile with source tag and consent.
* Shopify welcome automation.
* Shopify segment and Forms analytics.
* Klaviyo form preview.
* Klaviyo welcome flow.
* Klaviyo profile/segment.
* Klaviyo SMS keyword configuration or prerequisite screen.
* Klaviyo Instagram Auto-reply configuration or prerequisite screen.
* Actual Klaviyo billing/profile estimate, if accessible.

Put the screenshots in meeting order so you can switch to them instantly if a live demo fails.

## Exact Demo Sequence Tomorrow

1. Show the market-specific page URLs and explain that each Form applies the shared and location-specific tags.
2. Show the proposed discount and explain that its separate QR rewards the return visit.
3. Use the four confirmed POS screenshots to demonstrate attaching the customer and applying the discount.
4. Run the Shopify-first signup journey from landing page to customer tags to welcome automation.
5. Present the cost comparison: the Shopify capture mechanism adds no separate platform subscription; messaging is where costs begin.
6. Explain the Klaviyo nuance: its free tier ends at 250 active profiles or its send limits, so list growth itself can trigger a paid plan.
7. Show only the Klaviyo features that justify paying: SMS keyword, Instagram Auto-reply, richer flows, and unique coupons.
8. Explain that the main Shopify-first gap to explore next week is SMS-first capture, which requires selecting and pricing an SMS provider.
9. Ask Kelly what recurring summer messages Casa Crobu can sustain and who will own them.
10. Ask whether Klaviyo's activation features justify paying now or should be revisited after the Shopify-first pilot proves capture.

## What Not To Build Tonight

* Production consent language or final legal review.
* Full historical customer import or segmentation.
* Multiple market landing pages or QR codes.
* Finished booth signage or lid stickers.
* Production SMS sending-number setup.
* Production Instagram connection or permission changes.
* Full dashboard.
* Member lookup or POS attribution workflow.

Those are Phase 1 delivery work after approval.

## Final 20-Minute Rehearsal

Run the demo once in this order and keep it under 12 minutes.

Check:

* Every demo asset says `DEMO` or remains inactive.
* The same Shopify coupon appears in both paths.
* Your test subscriber is visible in both platforms.
* No production audience can receive a message.
* Screenshots are open in meeting order.
* The decision table is ready to complete live.
* You can state the recommendation in one sentence:

> Shopify-first proves the core capture and redemption journey at the lowest cost; Klaviyo is worth the added cost only if Casa Crobu will use SMS keywords, Instagram Auto-replies, unique coupons, or richer cross-channel flows during the pilot.

Use this cost framing:

> The capture mechanism is effectively included in the Shopify setup you already pay for. We can create the pages, forms, customer records, tags, segments, and POS attribution without adding another platform subscription. Costs begin when we activate the audience through messaging. Shopify includes the first 10,000 email sends each month and charges for SMS by usage. Klaviyo gives us more sophisticated activation tools, but its paid cost can also begin as the active-profile list grows.

## If Time Runs Short

Prioritize in this order:

1. Shared Shopify discount.
2. Market-specific Shopify page, Form tags, and direct signup QR.
3. Shopify landing page/form and customer tag.
4. Shopify draft welcome automation.
5. Klaviyo form and flow preview.
6. Klaviyo pricing screen.
7. SMS keyword and Instagram setup screens.

The first four are enough to hold the decision meeting.

## Remaining Verification Checklist

### Do Now

* Archive or replace old POS screenshots that show `DEMO_WELCOME_MARKET`; the live code is `MARKET5`.
* Build one representative Shopify Form with `market_club` and one location-specific tag.
* Submit the form and verify the customer record, both tags, and email/SMS consent statuses.
* Build the Shopify-hosted offer page with the discount QR, text code, and terms; configure the form redirect.
* Test the offer page and QR on a phone.
* Prepare one welcome-email preview containing the QR image, text code, and offer-page link.

### Verify Or Explain Tomorrow

* The standard discount code works in POS after attaching the customer.
* Decide whether online use of the shared code is acceptable; otherwise use a staff-applied custom POS discount.
* Show that one form per market creates both the full `market_club` segment and location-specific segments.
* Explain that SMS launch requires approved Terms of Service, Privacy Policy, and sender registration.
* Explain that true SMS-first capture, such as text-to-join, requires a provider and is the primary vendor question to explore next week.
* Show the actual Klaviyo price and its differentiators if accessible; otherwise present them as post-selection validation.

### Decisions Needed From Kelly

* Approve Shopify-first or Klaviyo and set the maximum monthly software budget.
* Choose the 2-3 pilot markets.
* Approve the $5 off `$29+` offer, expiration, and online-redemption policy.
* Decide whether SMS is included at launch.
* Choose a sustainable summer message cadence and identify which message types subscribers will receive.
* Name the person responsible for supplying and approving recurring content.
* Provide or approve the Terms of Service and Privacy Policy.
* Name the business approver and booth workflow owner.
* Approve a launch date.
