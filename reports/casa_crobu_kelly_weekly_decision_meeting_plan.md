# Casa Crobu Weekly Decision Meeting Plan

**Meeting:** Kelly weekly progress and Phase 1 decision  
**Date:** Thursday, June 4, 2026  
**Primary outcome:** Move from discovery and planning into active Phase 1 delivery.

## Working Decision Register

This section is the live source of truth while preparing for the meeting. Condense it before the final presentation.

| # | Decision / Direction | Status | Remaining Question |
|---|---|---|---|
| 1 | Use a two-stage offer strategy. The initial market-capture offer should reward a return market visit; later in the summer, introduce a percentage-off first delivery order to convert engaged market subscribers into delivery customers. | Proposed recommendation for Kelly approval | Approve offer economics and timing for the later delivery offer. |
| 2 | Initial offer: **5% off the subscriber's next market purchase of `$20` or more**. In Shopify, use **Amount off order** rather than a product-specific, Buy X Get Y, or shipping discount. | Working decision | Set expiration window and confirm final POS redemption behavior. |
| 3 | The first offer's strategic job is retention and habit-building: invest in the customer relationship now, then push delivery conversion later. | Proposed recommendation for Kelly approval | Define the signal or date that triggers the delivery-conversion phase. |
| 4 | Confirmed: none of Casa Crobu's POS locations use POS Pro. On Basic + POS Lite, Retail Markets cannot apply different market settings to POS locations versus the online store in the same region. | Confirmed plan constraint | Use staff-controlled POS redemption, allow online code use, or consider a future POS Pro upgrade. |
| 5 | Confirmed attribution workflow: at the subscriber's next market visit, staff attaches the customer to the Shopify POS order before applying the discount. This connects the return purchase to the subscriber. | Confirmed workflow; recommend for pilot | Decide whether staff can do it consistently during busy market periods. |
| 6 | Use one shared, memorable pilot code and QR for the initial test rather than generating unique codes for every subscriber. | Proposed recommendation for Kelly approval | Accept limited code-sharing risk, or approve the added complexity of unique codes. |
| 7 | For Phase 1, skip Shopify Campaigns and UTM parameters. Point each market QR directly to its market-specific Shopify page and use form-applied customer tags as the source of truth. | Working recommendation | Revisit one umbrella campaign later only if QR visits and session-level attribution become important. |
| 8 | `DEMO_MARKET_WELCOME` is configured as 5% off a minimum `$20` purchase, one use per customer, no combinations, and currently active for Online Store. | Confirmed demo configuration | Test it in Shopify POS and decide whether online redemption is acceptable. |
| 9 | Keep one canonical product catalog. Do not duplicate every product into separate online and market listings merely to enforce the discount. | Working decision | Use a staff-controlled POS workflow on the current plan. |
| 10 | A test Shopify Campaign exists, but it is not required for the recommended Phase 1 setup. Market-specific pages and form tags provide the needed customer-level attribution with less configuration. | Working decision | Keep the test campaign for reference; do not build separate campaigns for each market. |
| 11 | Reject Shopify POS Pro for Phase 1. At `$89 per location per month`, upgrading multiple farmers-market locations is not justified merely to automate the market-only discount rule. | Working decision | Revisit only if later operational needs create substantially more value than discount automation alone. |
| 12 | Shopify-first can send SMS through Shopify Messaging. US SMS costs `$0.012` per message and requires toll-free sender registration, which typically takes 2-5 business days. The assigned number is outbound-only and cannot receive customer replies. | Confirmed platform capability | Decide whether outbound campaigns are sufficient or whether text-to-join, replies, and richer welcome automation justify Klaviyo. |
| 13 | Use Shopify Forms as the Shopify-first capture tool. Use Sidekick, Shopify Magic, Flow, and Messaging to accelerate setup before adding another third-party form or landing-page app. | Working recommendation | Confirm the existing theme supports a clean inline form page and review whether existing GemPages/SendWILL usage creates any conflicts. |
| 14 | Shopify Forms requires an SMS marketing app before enabling the SMS field. Install the official **Shopify Messaging** app first; do not select a third-party SMS app from the category list until the vendor decision is made. | Working recommendation | Install Shopify Messaging, return to Forms, and verify it appears as the SMS integration option. |
| 15 | Lovable produced a strong market-list landing-page prototype. Use it as the approved visual design and demo prototype; for production, recreate the design inside Shopify and insert the native Shopify Form rather than embedding the external React form. | Working recommendation | Publish/share the Lovable prototype for tomorrow, then confirm whether the Shopify theme or existing GemPages is the fastest production implementation path. |
| 16 | Use Shopify Messaging as the Shopify-first SMS provider in the demo. Do not install another third-party SMS app during discovery. | Working recommendation | Install Shopify Messaging and begin US toll-free registration only with Kelly's approval; full SMS sending may remain unavailable for 2-5 business days. |
| 17 | Shopify Forms cannot collect SMS consent until Casa Crobu has a Terms of Service page and Privacy Policy configured in Shopify legal settings, with links included in the SMS disclaimer. | Confirmed launch blocker; Kelly-owned business/legal input | Kelly must provide or approve the policies. Implementation can then configure the legal-settings URLs and form disclaimer. |
| 18 | For Phase 1, create one native Shopify page and Form per pilot market. Every form applies the shared `market_club` customer tag plus a location-specific `<location>_market_club` tag. | Proposed recommendation for Kelly approval | Select the 2-3 pilot markets, then duplicate the approved page/form and assign the correct location tag to each form. |
| 19 | Shopify storefronts can run custom JavaScript, but injecting hidden UTM fields into the rendered Shopify Forms app would rely on unsupported DOM behavior and could break when Shopify updates the app. | Confirmed implementation option; not recommended for pilot | Use separate market-specific Shopify Forms with shared and location tags for Phase 1; revisit a supported custom app/form integration only if customer-level placement attribution proves valuable. |
| 20 | If customer-level UTM capture justifies replacing Shopify Forms, evaluate **Hulk Contact Form Builder Pro** first. It is Built for Shopify and explicitly supports UTM tracking, dynamic values, and creating Shopify customer accounts. | Third-party form recommendation to validate | Confirm in a trial that it records native Shopify email and SMS marketing consent correctly before adopting it. |
| 21 | Deliver the shared return-offer QR after signup by redirecting each Shopify Form to a Shopify-hosted thank-you page containing the downloaded discount QR and text code. | Working recommendation | Generate the QR from the active discount, build the thank-you page, and test scanning it in Shopify POS 11.5 or later. |
| 22 | Treat the Shopify-hosted thank-you page as the durable offer wallet. Include the QR image and text code directly in email; send SMS subscribers a shortened link to the page. Klaviyo MMS can send the image directly, but costs more and is unnecessary for the pilot. | Working recommendation | Build one reusable offer page and test the email image, email link, and SMS link on a phone. |
| 23 | The main remaining Shopify-first capability gap is **SMS-first acquisition**: letting someone text a keyword or otherwise begin with SMS rather than completing the web form. | Confirmed comparison point; defer vendor selection | Explore Shopify-compatible SMS providers and pricing during the upcoming week; do not block the initial capture strategy or tomorrow's decision meeting. |
| 24 | Define a sustainable summer engagement cadence before paying for a messaging platform. The value comes from consistently giving Market Club subscribers useful reasons to return, not merely collecting contact information. | Decision needed from Kelly | Agree on message types, frequency, content owner, and approval workflow. |

### Recommended Shopify-First Build Stack

| Tool | Role In Pilot | Why Use It |
|---|---|---|
| Shopify Forms | Capture email, optional phone/SMS consent, form data, and customer tags | Free, native customer profiles, segments, analytics, discounts, and automation hooks |
| Shopify Sidekick | Create/refine copy, discounts, segments, reports, and Flow workflows using natural-language prompts | Fastest way to configure native Shopify objects while preserving review before changes apply |
| Shopify Magic | Generate landing-page copy, headings, images, and optional theme blocks | Included on Basic; useful for quickly producing a branded page |
| Shopify Flow | Tag/process form submissions and support internal notifications or custom workflow logic | Native workflow layer; Sidekick can generate Flow workflows from a description |
| Shopify Messaging | Send immediate welcome email and later segmented email/SMS campaigns | Keeps Shopify-first messaging tied to customer consent and segments |
| Shopify Campaigns | Optional later reporting layer for tracked links and QR traffic | Defer during Phase 1 unless session-level visit attribution becomes necessary |

Avoid adding another form tool during Phase 1 unless Shopify Forms fails a concrete requirement. The store appears to already have GemPages and SendWILL installed; confirm whether either is actively used before changing or removing anything.

### Lovable Landing Page Integration Options

| Option | What It Produces | Recommendation |
|---|---|---|
| Publish Lovable at its generated URL | Fastest live prototype for tomorrow | Use for the demo |
| Connect a subdomain such as `market.casacrobu.com` to Lovable | Branded Lovable-hosted React page; requires a paid Lovable plan and DNS changes | Possible, but do not route production consent/customer data through it without reviewing the submission integration |
| Embed Lovable in a Shopify page using an iframe | Lovable remains externally hosted inside a Shopify page frame | Avoid; creates responsive, analytics, cookie, accessibility, and form-data integration problems |
| Recreate the design in Shopify theme/GemPages and insert Shopify Forms | Native `casacrobu.com/pages/...` landing page with Shopify consent, customer profiles, tags, and analytics | Recommended production path |
| Build a custom Shopify app proxy/theme extension for the React app | React content served under a Shopify storefront path such as `/apps/...` | Technically possible, but unnecessary engineering for Phase 1 |

The Lovable prototype should not become the system of record for customer consent. Shopify Forms should remain the production form so submissions create/update Shopify customers and preserve email/SMS consent correctly.

For Shopify-first SMS, install the official **Shopify Messaging** app from Shopify. Shopify Forms will then use the selected SMS marketing app to handle consented SMS subscribers and sending. The broad App Store category also includes third-party platforms, but those introduce their own pricing and subscriber systems:

| SMS App | Current Entry Cost | Relevant Capability | Recommendation |
|---|---:|---|---|
| Shopify Messaging | Free to install; US SMS `$0.012/message` | Native segments, campaigns, Forms/Flow integration | Recommended Shopify-first baseline |
| TxtCart | `$29/month` minimum spend plus usage/carrier fees | Two-way conversational AI, campaigns, automations | Consider only if two-way conversation is a must-have |
| Postscript | `$49/month` minimum spend plus usage/carrier fees; unlimited keywords on `$100/month` Growth | Two-way messaging, campaigns, automations, keywords | Too expensive for the lean pilot unless SMS becomes the central channel |

Do not install multiple SMS apps during discovery. Each can introduce separate consent, sending-number, billing, and profile-sync behavior.

### Screenshots Collected

| Screenshot | What It Shows | Use In Meeting |
|---|---|---|
| Shopify "Select discount type" screen | Available discount structures: Amount off products, Buy X Get Y, Amount off order, Free shipping, and installed-app discount types. | Use when asking Kelly to approve **Amount off order** for the initial `5% off $20+ next market purchase` offer. |
| Shopify `DEMO_MARKET_WELCOME` summary | Confirmed demo configuration: 5% off entire order, `$20` minimum, one-time purchase, one use per customer, no combinations, all customers, Active, and shown as Online Store. | Use to show the actual offer configuration and ask whether online redemption is acceptable. |
| Lovable desktop market-list landing page | Polished desktop design candidate with Casa Crobu branding, offer-led hero, benefits, and a prominent email/SMS form. | Keep as a potential visual direction for the Shopify landing page. Its `5% off $20+` offer copy is aligned with the working offer decision. |
| Shopify POS cart before customer attachment | Cart contains two Classic Lasagna Bolognese items totaling `$58`; **Add customer** is visible. | Begin the redemption walkthrough and emphasize that staff attaches the customer before applying the offer. |
| Shopify POS customer search | Staff can search by customer email, phone number, name, or address. | Show that booth staff can quickly find an existing Market Club subscriber. |
| Shopify POS cart with attached customer and Apply discount menu | Test customer is attached and shown as accepting marketing; **Apply discount** is available from the cart menu. | Demonstrate the required order of operations: identify the subscriber, attach them, then apply the offer. |
| Shopify POS cart after discount | `DEMO_WELCOME_MARKET` successfully applies a `$2.90` order discount to the `$58` cart, reducing checkout from `$63.33` to `$60.18` after recalculated tax. | Confirm that the 5% discount works in POS and remains connected to the attached customer. |

## The Decision To Get

Do not make the meeting a general platform review. Ask Kelly to approve a launch direction:

1. Approve Phase 1 and its budget.
2. Choose the initial platform path.
3. Confirm whether SMS is included at launch.
4. Choose the first pilot markets and offer.
5. Confirm access, approvers, and a launch date.

The platform decision should use a budget gate:

> Start Shopify-first unless the actual Klaviyo account quote is within the approved monthly budget and Casa Crobu commits to using Klaviyo's differentiated features during the pilot.

This keeps the pilot moving without turning Klaviyo into a prerequisite. The capture path, source model, copy, offer, QR codes, and measurement plan should be designed so they can migrate to Klaviyo later.

## Recommended Meeting Position

Recommend approving the **$2,500 Recommended Setup**, with platform subscription costs separate.

Recommend **email required and SMS optional** in the signup experience. Include SMS in the pilot only after Kelly approves the compliance requirements, operating plan, and expected platform/message cost.

Recommend postponing the **$750 Member Lookup + POS Attribution Add-On** until the capture flow is live and the booth team has proven it can consistently prompt signups. This avoids adding checkout friction before the core behavior works.

Recommend a two-stage offer strategy:

1. **Initial retention offer:** `5% off the next market purchase of $20 or more` to reward signup, encourage another visit, and build the market-list habit.
2. **Later delivery-conversion offer:** A percentage off the subscriber's first delivery order after the list has been activated and Casa Crobu is ready to shift demand toward fall delivery.

Recommend this Shopify Basic + POS Lite redemption workflow:

1. Capture email/SMS, create or update the Shopify customer, and add the customer to the market-list segment.
2. The welcome message tells the subscriber to show the offer at the booth.
3. On the subscriber's next market visit, staff attaches the customer to the Shopify POS order using email or phone lookup.
4. Staff verifies that the customer belongs to the market-list segment and has not already redeemed the offer.
5. Staff applies a `5%` custom order discount in Shopify POS after the cart reaches `$20`.
6. The completed order is connected to the customer for attribution.

The customer-attachment step is the key attribution moment. Without it, Shopify can report that the discount was redeemed. With it, Casa Crobu can also see which market-list customer returned, what they purchased, and whether that customer later converts to delivery.

This workflow has now been tested in Shopify POS using an attached test customer. The code displayed in the successful POS test is `DEMO_WELCOME_MARKET`; standardize the final demo and production code name before launch so all forms, messages, QR codes, and staff instructions use the same value.

Do not create duplicate "market" versions of the product catalog to enforce the offer. That would split inventory, product reporting, purchase history, and ongoing catalog maintenance. Preserve one product record per product and use the staff-controlled POS workflow.

### Confirmed Phase 1 POS Workflow

Casa Crobu is on Shopify Basic with POS Lite at its locations. Do not add POS Pro or rely on Retail Markets for Phase 1 merely to automate this offer.

Use the tested staff-controlled workflow:

1. Staff builds the cart and confirms it meets the `$20` minimum.
2. Staff searches for and attaches the Market Club customer.
3. Staff verifies the customer has `market_club` and has not already redeemed the offer.
4. Staff applies the shared discount code or a custom 5% order discount.
5. Staff confirms the discount and attached customer remain visible before checkout.

The standard code has been confirmed to apply in Shopify POS. The remaining policy decision is whether Casa Crobu accepts that the shared code can also be used online. If not, staff should apply a custom POS discount instead of distributing the code.

### Market Page And Discount Roles

Use market-specific pages, Forms, tags, and Discounts together:

| Object | Job | Example |
|---|---|---|
| Market-specific Shopify page / QR | Send shoppers to the correct signup form | `/pages/welcome-market-arvada`, `/pages/welcome-market-boulder`, `/pages/welcome-market-city-park` |
| Shopify customer tags | Create the full market-club audience and preserve the signup market on the customer record | `market_club`, `city_park_market_club` |
| Shopify discount | Reward and measure the return purchase | `DEMO_MARKET_WELCOME` |
| Attached Shopify POS customer | Connect discount redemption and order behavior to the subscriber | Customer email/phone lookup before redemption |

Do not use the discount QR as the initial acquisition QR. Each market's acquisition QR should open its dedicated signup page. After signup, the customer receives the separate return-offer discount QR.

Use hyphenated Shopify page handles for readability. The page/form determines the signup market, so UTM parameters and separate campaigns are unnecessary for Phase 1. Shopify Forms analytics still report views and submissions for each form.

Shopify Forms can natively display a selected discount **code** in its standard success message, but it does not natively display the discount's QR image there. For the pilot, configure the form's success behavior to redirect to a Shopify-hosted thank-you page containing:

* the downloaded `DEMO_MARKET_WELCOME` discount QR,
* the text code as a fallback,
* the `5% off a market purchase of $20 or more` terms,
* and a reminder that staff will attach the customer before scanning.

The thank-you-page URL and shared QR can be forwarded, so this is a convenient redemption workflow rather than secure per-customer gating. The one-use-per-customer setting and attached-customer workflow provide the pilot controls.

Use the same page for follow-up delivery:

| Channel | Recommended Delivery |
|---|---|
| Shopify Messaging email | Include the QR image, the text code, and a `View your market offer` button linking to the thank-you page |
| Shopify Messaging SMS | Send a short text link to the thank-you page; Shopify's SMS composer supports text and shortened links, not an embedded QR image |
| Klaviyo SMS/MMS | Prefer an SMS link for the pilot; Klaviyo can send the QR image as MMS in supported countries, but MMS consumes more credits |

Always include the text code and offer terms outside the QR image because email clients can block images and QR scanning can fail.

Recommended structure:

```text
Direct market-page QR
  -> market-specific landing page
  -> Shopify Form submission
  -> Shopify customer profile + shared/location tags
  -> welcome message / market-return offer
  -> attached Shopify POS return order
```

### QR And Signup-Source Attribution

For Phase 1, the market-specific page and form are the attribution mechanism:

* Point each market QR directly to its dedicated Shopify page.
* Create one Shopify Form per pilot market. Every form applies `market_club` plus a location tag such as `city_park_market_club`.
* Use each Form's views, submissions, and completion rate to compare markets.
* Do not use UTM parameters or create campaigns during the pilot.
* Revisit one umbrella Shopify Campaign later only if the team needs session-level QR traffic reporting beyond form analytics.

Create Shopify customer segments from those tags:

| Segment | Rule |
|---|---|
| All Market Club subscribers | Customer tag is `market_club` |
| City Park Market Club | Customer tag is `city_park_market_club` |
| Boulder Market Club | Customer tag is `boulder_market_club` |

Use lowercase `snake_case` tags consistently. The shared tag supports club-wide campaigns and reporting; the location tag supports market-specific reminders, offers, and attribution.

### Custom JavaScript And App Options

Shopify allows custom storefront JavaScript through several mechanisms:

| Option | Can Read URL Parameters? | Can Reliably Save Them To Shopify Customer? | Recommendation |
|---|---:|---:|---|
| Theme asset or custom theme section/Liquid | Yes | Not by itself | Fine for analytics, cookies, and page behavior |
| GemPages custom code | Yes | Not by itself | Fine if GemPages becomes the production landing-page builder |
| JavaScript that modifies the rendered Shopify Form DOM | Yes | Possibly, but unsupported and brittle | Avoid |
| Web pixel/custom pixel | Yes, for analytics events | No; not intended to update customer profiles | Use only for analytics |
| Third-party form app with hidden fields/UTM capture | Usually | Usually through the app's Shopify integration | Evaluate only if native Forms attribution is insufficient |
| Custom Shopify app + theme app extension/app proxy | Yes | Yes, through a supported backend/API integration | Strongest custom solution, but too much engineering for Phase 1 |

A small theme script can safely read and retain UTMs for the session:

```javascript
const params = new URLSearchParams(window.location.search);
const source = params.get("utm_source");
const medium = params.get("utm_medium");
const content = params.get("utm_content");
```

It can store those values in `sessionStorage`, `localStorage`, or cookies for analytics. However, saving them to a Shopify customer requires either:

* a form field that Shopify Forms officially submits,
* a third-party form app designed for hidden attribution fields,
* or a custom backend/app that writes the values through Shopify APIs.

Do not place Admin API credentials or customer-writing logic in storefront JavaScript.

### Third-Party Form Recommendation

If Shopify Forms cannot meet the required attribution needs, the first app to trial should be **Hulk Contact Form Builder Pro**.

| Factor | Hulk Contact Form Builder |
|---|---|
| Shopify App Store status | Built for Shopify |
| Track record | Launched in 2017; approximately 1,800 reviews; 4.8 rating |
| Relevant features | UTM tracking, dynamic values, custom fields, customer-account creation, conditional logic, responsive embedded forms |
| Current relevant tier | Pro, currently listed around `$7.43-$9.90/month` depending on billing/offer |
| Critical gap to validate | Whether email and SMS consent are written into Shopify's native customer marketing-consent statuses, rather than only stored in the app/submission |

Do not choose an app based only on UTM tracking. The production form must also:

1. Create or update the Shopify customer without duplicates.
2. Write explicit email and SMS consent to Shopify's native consent fields.
3. Preserve UTM/source data in an exportable field, tag, or customer metafield.
4. Integrate cleanly with the selected email/SMS provider.
5. Support the required legal disclaimer and policy links.

If Hulk fails the consent test, keep Shopify Forms and use form-specific source tags rather than sacrificing consent integrity for finer attribution.

## 45-Minute Run Of Show

| Time | Topic | What To Do | Outcome |
|---|---|---|---|
| 0-5 min | Re-anchor on the opportunity | Show the 91.62% anonymous POS order rate, 8.38% known POS order share, and 15-20% pilot capture target. | Agreement that the next move is implementation, not more discovery. |
| 5-10 min | Show completed work | Briefly show the audit, three-phase plan, Phase 1 options, and proposed responsibilities. | Kelly sees what has been completed and what Phase 1 buys. |
| 10-25 min | Demo the customer journey | Demo the same shopper journey in Klaviyo and Shopify-first. Keep each demo focused on capture, consent, follow-up, and measurement. | Kelly can compare outcomes instead of interfaces. |
| 25-32 min | Compare paths and cost | Show the decision matrix and actual Klaviyo quote/account limits if available. | Choose Shopify-first or Klaviyo. |
| 32-40 min | Make operating decisions | Decide SMS, pilot markets, first offer, approver, staff owner, and launch target. | Remove the blockers to starting work. |
| 40-45 min | Confirm active-work kickoff | Read back decisions, owners, dates, and the first-week deliverables. | Verbal approval to begin Phase 1. |

## Demo Story

Demo one consistent scenario across both platforms:

> A shopper buys pizzetta at a pilot market, scans a QR code or responds through Instagram, joins the market list, receives a Shopify-configured welcome offer, redeems it online or through Shopify POS, and is tagged to the correct source so Casa Crobu can measure response and later promote fall delivery.

### Shared Shopify Coupon Demo

Show the offer configuration before comparing messaging providers. This establishes Shopify as the source of truth for discount rules and redemption.

1. Select **Amount off order** and create a static pilot discount code in Shopify, such as `DEMO_MARKET_WELCOME`.
2. Configure the initial offer as `5% off the subscriber's next market purchase of `$20` or more`.
3. Show the business rules Kelly must approve: minimum purchase, eligible products or collections, start/end dates, total usage limit, one-use-per-customer rule, and combinations.
4. Explain the Shopify constraint: discount codes cannot be restricted to POS only. Decide whether the offer uses market-only eligible products, a staff redemption process, or can also be redeemed online.
5. Walk through the confirmed POS screenshots: add customer, search and attach the subscriber, open **Apply discount**, then show the successfully discounted cart.
6. Show the Shopify **Sales by discount** report that will measure redemption.
7. Deliver the same code through both provider paths:
   * **Shopify-first:** Display it after the Shopify Form submission and include it in the Shopify Messaging welcome automation.
   * **Klaviyo:** Add the static Shopify code to the form success step and welcome email/SMS, with an optional link that applies the code to the Shopify cart.
8. Show Klaviyo's optional advanced path: generate a unique one-time Shopify coupon for each subscriber and remind subscribers who have not redeemed it.

For the initial pilot, recommend a **static Shopify code** because it is easy for booth staff to explain and easy to compare across both paths. Use unique Klaviyo coupons only if controlling code sharing is more important than simplicity.

### Market Redemption Options

| Option | Booth Steps | Strength | Tradeoff |
|---|---|---|---|
| Recommended for easiest pilot: shared code + customer lookup | Staff attaches customer, then scans/enters code | Confirmed working in POS; retains one-use rules and attributes the order | Shared code can also be used online and forwarded |
| Strict market-only: staff-controlled custom discount | Staff attaches customer, verifies eligibility, then manually applies `5%` when cart reaches `$20` | Prevents customers from using a distributed code online | Manual staff step; eligibility/use limit must be operationally tracked |
| Segment-restricted standard code | Code eligibility is the market-list customer segment | Restricts use to captured customers | Does not by itself prevent online redemption |

The current sample code has been tested successfully in Shopify POS with an attached customer. Before launch, standardize its name and decide whether online use is acceptable.

### Klaviyo Demo

Show these in order:

1. **Market landing/signup page:** Email field, optional phone field, required consent language, source market, and offer.
2. **SMS keyword or tap-to-text:** Show how a shopper can text a custom keyword or use a subscribe link from a lid sticker, sign, or Instagram story.
3. **Instagram subscriber capture:** Show the social auto-reply experience for a comment or DM keyword and explain that this is a meaningful Klaviyo differentiator.
4. **Welcome flow:** Show the immediate welcome message, offer, and expected message cadence.
5. **Coupon delivery:** Show the Shopify-created static code in the success step and welcome message, then briefly show the unique-coupon option.
6. **Profile and segmentation:** Show how source market, channel consent, offer response, product interest, and delivery interest can support later targeting.
7. **Measurement:** Show where signups, clicks, redemptions, unsubscribes, and flow performance will be reviewed.

Do not spend demo time on advanced features Casa Crobu will not use during Phase 1.

### Shopify-First Demo

Show these in order:

1. **Shopify landing page with an inline Shopify Form:** Email required, phone optional, marketing consent, source tag, and first offer.
2. **Customer record:** Show how the submission creates or updates the Shopify customer profile and stores tags/metafields.
3. **Welcome automation:** Show the welcome email or SMS automation triggered by signup.
4. **Coupon delivery:** Submit the form and show its redirect to the Shopify thank-you page containing the shared discount QR and text code.
5. **Customer segment:** Show the pilot-market segment and how it can be used for campaigns or discounts.
6. **Form analytics:** Show views, submissions, completion rate, and Shopify discount redemption.

Be explicit that Shopify-first covers the core pilot cheaply, but it is a simpler activation system. Do not promise a custom text-to-join keyword or Instagram DM/comment capture in the Shopify-first path unless it is demonstrated in the live account.

## Feature And Cost Decision Matrix

### Cost Comparison: Capture First, Pay For Activation

Place this comparison **after demonstrating the Shopify capture and POS redemption flow** and **before asking Kelly for decisions**.

The core recommendation:

> We can launch the capture mechanism inside the Shopify setup Casa Crobu already pays for. The decision is not whether we can collect and segment customers; it is how much messaging and automation capability Casa Crobu wants to pay for after capture.

For Shopify-first, the market pages, Shopify Forms, customer records, tags, segments, and POS attribution do not add a separate platform subscription. Shopify Messaging includes the first 10,000 email sends each month, then charges by usage; SMS is charged per message.

Klaviyo has a free tier up to 250 active profiles, 500 monthly email sends, and 150 mobile-message credits. Unlike Shopify-first, Klaviyo's ongoing paid tier is affected by the number of active profiles as the captured audience grows, in addition to sending volume.

| Decision Factor | Klaviyo | Shopify-First | Why It Matters |
|---|---|---|---|
| Capture mechanism | Free tier until the account exceeds 250 active profiles or sending limits; then requires a paid plan | Pages, Forms, tags, segments, customer profiles, and POS attribution are included in the existing Shopify setup | Do not pay for Klaviyo merely to prove shoppers will subscribe and return. |
| Email + SMS consent | Supported | Supported | Both can collect the required contact and consent fields. |
| Email cost | Monthly plan depends on active profiles and email sends | First 10,000 emails per month are included; then usage pricing applies | Shopify-first has a clear cost advantage for the pilot. |
| SMS cost | Separate mobile-message credits; confirm quote in account | US SMS is billed per message; current published rate is $0.012 per message | Model the expected audience and cadence before approving SMS. |
| What paying unlocks | SMS keywords, Instagram auto-replies, coordinated cross-channel flows, richer automation, unique coupons, and deeper segmentation | Straightforward email/SMS campaigns using native customer tags and segments | Klaviyo is an activation upgrade, not a capture requirement. |
| Billing risk | Active-profile growth can raise the required plan even if send volume remains modest | Costs primarily grow when Casa Crobu sends messages beyond included email volume or sends SMS | Klaviyo should be justified by an actual messaging plan. |

## Recommendation Rule

Choose **Klaviyo now** only if all of these are true:

* Kelly approves the actual monthly quote after the profile count and SMS volume are reviewed.
* Casa Crobu wants SMS at launch.
* Casa Crobu will use at least one differentiated acquisition path during the pilot: custom text-to-join or Instagram social auto-replies.
* The team wants cross-channel segmentation and flows enough to justify the added setup and operating complexity.

Choose **Shopify-first now** if any of these are true:

* Monthly software cost is the main concern.
* The priority is proving that shoppers will scan, subscribe, and redeem.
* Casa Crobu is not ready to operate SMS consistently.
* The team wants the fastest path to a live landing page, source tags, welcome message, and basic measurement.

The one meaningful acquisition gap to investigate after the meeting is SMS-first capture. Shopify Forms can collect SMS consent through the web form, and a connected provider can send to those subscribers, but a true text-a-keyword-to-join experience requires a provider and introduces cost. Treat that as this upcoming week's vendor-validation task rather than a blocker to approving the overall strategy.

## Summer Engagement Strategy

Use part of the meeting to decide what will keep Market Club subscribers engaged after they receive the welcome offer. Recommend a lightweight, useful cadence instead of frequent generic promotions:

| Message Type | Suggested Cadence | Purpose |
|---|---:|---|
| This week's market schedule and locations | Weekly during market season | Give subscribers a practical reason to open and return |
| Featured dish, seasonal special, or limited quantity | Weekly or biweekly | Create anticipation and urgency |
| Preorder reminder | When preorder inventory opens or closes | Convert attention into a planned purchase |
| Market cancellation, sellout, or location update | As needed | Make the list operationally valuable |
| Customer story, serving idea, or behind-the-scenes update | Monthly | Build affinity without relying on discounts |
| First delivery-order offer | Later-summer conversion moment | Move engaged market customers toward delivery |

Recommended starting cadence: one useful weekly email, with SMS reserved for time-sensitive market reminders, preorder deadlines, and operational updates. Do not commit to SMS until Kelly identifies who will create, approve, and schedule those messages.

## Decisions Kelly Needs To Make In The Meeting

Capture these decisions live:

| Decision | Recommended Default | Kelly's Decision |
|---|---|---|
| Approve Phase 1 | $2,500 Recommended Setup | |
| Platform | Shopify-first unless Klaviyo passes the budget/value gate | |
| Maximum monthly platform budget | Set a hard ceiling before choosing Klaviyo | |
| SMS at launch | Optional; include only with an owner and approved compliance setup | |
| SMS legal pages | Kelly provides/approves Terms of Service and Privacy Policy; implementation wires links into Shopify legal settings and form disclaimer | |
| Pilot markets | Choose 2-3 markets | |
| First offer | `5% off the subscriber's next market purchase of `$20` or more` | |
| Later conversion offer | Percentage off the subscriber's first delivery order | |
| Coupon rules | Amount off order; define minimum purchase, products, dates, usage limit, and combinations | |
| Market-redemption handling | Shared code if online use is acceptable; staff-controlled custom POS discount if it must be market-only | |
| Checkout workflow | Attach customer, verify eligibility, then scan/enter the code or apply the custom discount | |
| Code structure | Recommended: one shared memorable code and QR for the pilot | |
| Page and form structure | One Shopify page/Form per pilot market, shared `market_club` and location-specific tags, and one direct QR per page | |
| Primary signup CTA | Join the market list for specials, preorder drops, and delivery updates | |
| Launch target | Set a date within 2-3 weeks of access and approvals | |
| Casa Crobu approver | One person for copy, offer, and launch approval | |
| Booth owner | One person accountable for staff prompt and feedback | |
| Weekly activation support | Decide whether Casa Crobu owns it or approves a separate support scope | |
| Summer message cadence | Start with one useful weekly email; reserve SMS for timely reminders and updates | |
| Content owner | Name the person responsible for supplying weekly schedule, special, and preorder information | |

## Questions To Ask Kelly

* What is the maximum monthly software spend that still makes this pilot feel lightweight?
* Is SMS important enough that the team will send useful, timely messages throughout the season?
* Which recurring summer messages would customers genuinely value: weekly market locations, seasonal specials, preorder reminders, sellout/cancellation updates, or delivery announcements?
* Who will provide the weekly content, and how far in advance can it be approved?
* Should SMS be reserved for urgent/timely updates while email carries the regular weekly story?
* Who will provide or approve Casa Crobu's Terms of Service and Privacy Policy required for SMS consent?
* Would Casa Crobu actively run Instagram comment/DM signup campaigns, or would a link to the landing page be enough?
* Which 2-3 markets give us the best combination of volume, staff consistency, and permission to use signage or stickers?
* Is `5% off the next market purchase of $20 or more` safe for margin?
* Because Shopify cannot restrict a discount code to POS only, should we use market-only eligible products, a staff redemption process, or allow online redemption too?
* Should the coupon be reusable, limited to one use per customer, or replaced with unique Klaviyo codes?
* Can booth staff consistently look up the customer by email or phone before scanning the QR code?
* When should the later percentage-off first-delivery-order offer launch?
* Who can approve copy and offers within 24-48 hours?
* What is the earliest realistic launch date after access and printing?

## What To Prepare Before The Meeting

### Must Have

* Open the audit slide showing the anonymous POS gap and pilot target.
* Open the Phase 1 options one-pager.
* Prepare one branded mock landing page for the shared shopper scenario.
* Prepare one inactive Shopify pilot discount showing the proposed rules and both online/POS eligibility.
* Prepare one concise Klaviyo feature/cost comparison showing what paying for Klaviyo unlocks: SMS keywords, Instagram capture, richer flows, and unique coupons.
* Prepare a Shopify demo or screenshots for the landing page/form, customer tag, welcome automation, segment, and form analytics.
* Get the actual Klaviyo plan estimate based on the current account's active profiles and expected SMS sends. If unavailable, show the free-tier limits and make the actual quote a pre-adoption requirement.
* Bring this decision table and fill it in live.

### Nice To Have

* A sample lid sticker and booth-sign CTA.
* A sample first welcome email and optional welcome text.
* A simple two-week launch calendar.
* A rough SMS usage model for 250, 500, and 1,000 subscribers.

## Suggested Talk Track

Open with:

> I want to use today to move us from planning into launch. The opportunity is established: 91.62% of POS orders are anonymous today, and the pilot target is to actively capture 15-20% at selected markets. I will show you two ways to launch the same customer journey, then I would like us to choose the path, offer, markets, and launch date.

Frame the platform comparison with:

> Shopify-first can deliver the core test at a much lower software cost. Klaviyo is worth paying for if we are going to use the things Shopify does not give us as cleanly, especially text-to-join, Instagram DM/comment capture, and richer cross-channel flows. I do not want us paying for Klaviyo just to host a form.

Close with:

> Based on today's decisions, I will begin Phase 1 with the agreed platform and deliver the first working capture flow for review in week one. We will treat the platform choice as a launch decision, not a permanent commitment.

## First Two Weeks After Approval

| Timing | Delivery |
|---|---|
| Days 1-2 | Confirm access, platform, source-of-record rules, pilot markets, offer, consent requirements, and launch date. |
| Days 3-5 | Build the first landing/form path, source tags, consent handling, welcome message, and offer mechanics. |
| Week 2 | Create QR/sticker paths, test end to end, prepare staff prompt, finish dashboard, and hold launch QA. |

## Definition Of A Successful Meeting

The meeting is successful only if it ends with:

* an approved Phase 1 scope and budget,
* a selected launch platform,
* an SMS decision,
* selected pilot markets and first offer,
* a named Casa Crobu approver and booth owner,
* an access handoff date,
* and a target launch date.

## Current Vendor Facts To Verify In The Live Accounts

These facts were reviewed against vendor documentation on June 3, 2026, but account availability and pricing should be confirmed before launch:

* Klaviyo supports custom SMS subscribe keywords, dynamic SMS subscribe links, list subscribe pages, signup forms, and Instagram social auto-replies that can collect consent.
* Klaviyo's free tier is limited to 250 active profiles, 500 monthly emails, and 150 mobile-message credits. Paid billing depends on active profiles/email sends, while mobile messaging uses separate credits.
* Static discount codes are configured in Shopify and can be delivered through either provider. Klaviyo can also generate unique one-time Shopify coupons and include them in forms, email, and SMS.
* Shopify Forms supports inline and popup forms, email and SMS marketing consent, customer tags/metafields, automations, and form analytics. Shopify Forms is free to install and use.
* Shopify Messaging includes 10,000 email sends per month on eligible Shopify plans, then charges by usage. Its published US SMS campaign price is $0.012 per message.

### Vendor Documentation

* [Klaviyo: collect consent via Instagram](https://help.klaviyo.com/hc/en-us/articles/360059544911)
* [Klaviyo: SMS opt-in methods](https://help.klaviyo.com/hc/en-us/articles/27902671291419)
* [Klaviyo: billing](https://help.klaviyo.com/hc/en-us/articles/115000976672)
* [Klaviyo: pricing](https://www.klaviyo.com/pricing)
* [Klaviyo: coupon codes](https://help.klaviyo.com/hc/en-us/articles/115005084727)
* [Klaviyo: apply a Shopify coupon through a link](https://help.klaviyo.com/hc/en-us/articles/115005253088)
* [Shopify: create forms](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/create)
* [Shopify: form settings](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/settings/all-forms)
* [Shopify: manage forms and analytics](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/manage)
* [Shopify Messaging: email pricing](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-email/shopify-email-cost)
* [Shopify Messaging: SMS pricing](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging/sms/pricing)
* [Shopify: discount codes](https://help.shopify.com/en/manual/discounts/discount-types/discount-codes)
