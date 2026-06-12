# Casa Crobu Phase 1 Scope Decisions

Working document for `Phase 1A` discovery.

## Goal

Turn the signed SOW into a clear build plan for `Phase 1B`.

This phase is complete when the scope is concrete enough that you can build without making major new decisions mid-project.

## What Phase 1A Needs To Produce

By the end of this phase, you should be able to show Kelly:

* the recommended launch stack
* the exact signup and follow-up workflow
* the open approvals still needed
* the in-scope build plan for Phase `1B`
* the boundaries of what is not included

## What Is Already Clear

* The signed package is `Phase 1 Recommended Setup`
* Phase `1` includes both `email + SMS`
* `Klaviyo` is not installed yet
* Shopify native `Messaging / Email` is in use today
* Shopify native `Messaging / Email` is not just installed, but appears to be actively sending promotional campaigns
* `LayoutHub` is active on the storefront
* `Pickeasy` is active operationally
* `GA4` is running on the site
* The storefront appears to be a standard `Shopify` site, not a custom/headless build
* Some pages are standard Shopify pages and some are managed through `LayoutHub`
* Shopify live segmentation shows a currently reachable audience of about `1,304` subscribed customers across email or SMS
* That reachable audience is overwhelmingly email-based today; the live SMS-consented base is still small
* `Google & YouTube` is installed and appears active, but the connected Google account `ciao@casacrobu.com` needs verification

## Recommended Build Direction

Current best-fit recommendation:

* `Shopify` = customer and order source of record
* `Klaviyo` = email/SMS capture, consent, flows, and engagement
* one QR/signup path per market
* one welcome flow with channel branching as needed
* one launch offer used in the capture flow

## Storefront Finding

Current discovery suggests:

* Casa Crobu is running a normal Shopify storefront
* `LayoutHub` is being used to manage some live pages inside that Shopify storefront
* this does not appear to be a custom or headless implementation

What this means for scope:

* no custom frontend complexity needs to be accounted for in Phase `1`
* the QR signup destination can live inside the existing Shopify storefront
* if a landing page is needed, it can likely be built with standard Shopify pages or `LayoutHub`
* care is still needed around duplicate/older pages so QR traffic does not point to the wrong destination

## Google Account Dependency

Current discovery suggests:

* GA / Google integration is running through Shopify's `Google & YouTube` channel
* the connected Google account is `ciao@casacrobu.com`
* that connected Google account currently needs verification or has lost access

What this means for scope:

* do not disconnect the current Google account casually during discovery
* Merchant Center, Google Ads, and Google product sync could be affected by a bad reconnect
* this is a real Phase `1A` dependency because Google account ownership and access need to be clarified before any reconnection work

What Kelly needs to do:

1. Confirm who owns and can log into `ciao@casacrobu.com` as a Google account.
2. Verify or recover access to that account if possible.
3. Decide whether `ciao@casacrobu.com` should remain the long-term Google owner account.
4. If yes, complete the Shopify `Google & YouTube` verification flow using that account.
5. If no, pause before any reconnect and decide which Google account should replace it.
6. After the correct owner account is confirmed, grant the needed GA4 access separately if reporting review is required.

## Scope Decisions To Lock

### 1. Email And SMS Capture Setup

Need to decide:

* Will capture be built in `Klaviyo` from the start?
* Is `email` required and `phone` optional, or are both required?
* What exact consent language is used for email and SMS?
* Where will new signups land: one main list, or one main list plus market properties?

Recommended default:

* one primary market capture list
* email required
* phone collected for SMS consent
* channel consent stored in Klaviyo, customer identity synced to Shopify

Additional scope decision:

* Should the full currently reachable Shopify audience be actively brought into the Klaviyo launch setup, or should launch focus on a tighter audience plus new market captures?

Current discovery suggests:

* total reachable audience in Shopify (`email OR SMS subscribed`): about `1,304`
* email subscribed: about `1,300`
* SMS subscribed: about `33`

Implication:

* SMS is part of the Phase `1` setup, but existing list value is still primarily email.
* This is both a scope decision and a software-cost decision because Klaviyo active profile volume matters.
* A separate discovery question is what Casa Crobu feels is and is not working in the current Shopify Email setup, so the project can preserve what is already useful and focus new build work on the missing capture / SMS / tracking layer.

### 2. QR-Based Signup Flow

Need to decide:

* Does each market get its own QR code?
* Does the QR go to a `Klaviyo` form, a Shopify page, or a LayoutHub landing page?
* What is the exact signup CTA?
* Is the signup flow one-step or two-step?

Recommended default:

* one QR code per market
* one shared landing-page experience on the Shopify site
* Klaviyo handles the signup form, consent capture, and hidden/source tracking
* market source is pre-filled by URL/source
* one simple CTA and one offer

Current leading direction:

* use a dedicated market landing page for the QR transition
* keep the landing page on the existing Shopify storefront
* use `LayoutHub` only if it makes the page faster/easier to build cleanly
* avoid sending QR traffic straight to a bare hosted subscribe page unless simplicity wins over brand/context

Why this is a good fit:

* a market customer is scanning from a physical booth, so a simple branded landing page can explain the club quickly
* the page can frame the offer, what they are signing up for, and why email/SMS is worth it
* Klaviyo can still own consent capture and profile tracking without requiring the entire experience to live off-site

Recommended landing page flow:

1. customer scans a market-specific QR code
2. QR opens one shared market-club landing page on the Shopify site
3. URL carries hidden tracking context such as market and asset source
4. page quickly explains the club, the offer, and what customers will receive
5. step 1 collects required email consent
6. step 2 offers optional SMS signup with explicit SMS consent
7. success state shows the launch offer and confirms what happens next
8. Klaviyo adds the person to the main market-club list and stores source properties
9. welcome flow branches based on channel consent

### 3. QR Tracking By Market

Need to decide:

* what naming convention to use
* what field/property stores market source
* whether to track asset type too, like `sticker` vs `sign`

Recommended default:

* `cc_market_source`
* `cc_signup_asset`
* `cc_capture_season`

### 4. One Welcome Flow For Email And SMS

Need to decide:

* does this mean one automation with branches, or separate email and SMS sends triggered from one entry point?
* what is the timing?
* what assets are included in scope?

Recommended default:

* one welcome flow entry point
* immediate send after signup
* email + SMS branch logic based on consent
* in-scope assets limited to welcome copy and launch-offer delivery

### 5. One Launch Offer Setup

Need to decide:

* what the offer is
* whether it uses one discount code or one automatic offer
* whether the offer is online-only or usable in another context
* expiration and guardrails

Recommended default:

* one simple online redemption offer
* one code or one clearly tracked offer mechanic
* no multi-offer testing in Phase `1`

### 6. Customer List Organization

Need to decide:

* what base segments are needed at launch
* what tags/properties need to exist in Shopify
* what properties need to exist in Klaviyo

Recommended default:

* market signups
* email-consented market signups
* SMS-consented market signups
* by-market segments
* launch-offer segment

### 7. Basic Reporting And Dashboard Setup

Need to decide:

* what metrics count as the launch baseline
* where reporting will live
* how much manual reporting is acceptable for Phase `1`

Recommended default:

Track:

* signups by market
* email opt-ins
* SMS opt-ins
* welcome flow performance
* offer redemption
* first online orders from signups
* unsubscribe rate

Use:

* Shopify
* Klaviyo
* GA4

No custom BI build in Phase `1`.

### 8. Launch Testing And QA

Need to decide:

* what needs to be tested before launch
* who signs off

Recommended default test scope:

* QR scan works
* form submit works
* consent stores correctly
* correct segment/tag/property is applied
* welcome email sends
* welcome SMS sends if consented
* offer delivery works
* reporting views reflect the signup

### 9. Launch Handoff

Need to decide:

* what the handoff includes
* who owns the system after launch

Recommended default:

* final walkthrough
* simple SOP for using the system
* note on what to monitor weekly
* no ongoing campaign management included

## Open Decisions For Kelly

These are the main things still worth getting explicit approval on:

* approve `Klaviyo` install and billing
* confirm the first launch offer
* confirm the exact signup CTA
* confirm the pilot markets
* confirm whether the landing experience should live in Klaviyo or on a storefront page
* confirm privacy policy and terms links
* confirm brand/sender details for email and SMS
* confirm who will prompt customers at the booth
* confirm any market rules around signage, QR use, or stickers
* confirm who should own the Google account connection currently tied to `ciao@casacrobu.com`

## Scope Guardrails

These are important to keep clean:

* no ongoing weekly campaign management
* no paid ads
* no printing or physical production
* no extra flows beyond the one welcome flow
* no broad copywriting project
* no custom customer lookup / POS attribution add-on
* no major expansion beyond the listed launch system

## Recommended Supporting Idea

Outside the core Phase `1` build, a useful supporting improvement would be to align Casa Crobu's Instagram link in bio with the summer market-capture goal.

Suggested future priority links:

* `Join the Market Club`
* `Order / Shop`
* `Market Schedule`
* `Delivery / Pickup Info`

This is not a Phase `1` blocker, but it would help support the same funnel being built for market traffic.

## Sample Software Cost Comparison

Rough sample numbers based on current discovery:

### Shopify Native

Published Shopify Messaging pricing:

* email: first `10,000` emails per month included
* additional email: about `$1 / 1,000` emails
* U.S. SMS: about `$0.012` per message

Simple examples:

* `1,300` subscribers x `1` email campaign in a month = about `1,300` emails = likely `$0` extra
* `1,300` subscribers x `4` email campaigns in a month = about `5,200` emails = likely `$0` extra
* `1,300` subscribers x `10` email campaigns in a month = about `13,000` emails = about `$3` extra over the included amount
* `100` SMS sends in the U.S. = about `$1.20`
* `500` SMS sends in the U.S. = about `$6.00`

### Klaviyo

Live Klaviyo recommendation seen during discovery:

* about `$70 / month` for email
* about `$85 / month` for email + mobile messaging

Observed recommendation included roughly:

* `3,000` active profiles
* `30,000` monthly email sends
* `1,250` mobile messaging credits on the email + mobile plan

### What This Means

* Shopify native is dramatically cheaper at Casa Crobu's current size.
* Klaviyo is more expensive, but it is likely the cleaner fit for the combined email + SMS market-capture architecture being considered.
* The tradeoff is not just cost. It is cost versus cleaner consent capture, list structure, source tracking, and future SMS growth.

## Phase 1A Is Complete When

You can answer these clearly:

1. What exact stack are we using?
2. What exact signup flow are we building?
3. What exact data/segments/properties are needed?
4. What exact offer are we launching with?
5. What exact reporting baseline are we using?
6. What is in scope for Phase `1B`, and what is not?
