# Casa Crobu Market Capture Pilot Plan

## Overview

Casa Crobu has proven market demand. The opportunity now is to stop letting so much of that demand stay anonymous.

From the Shopify/POS data reviewed for **May 2024 through March 2026**, the biggest finding is that most market buyers are not currently tied to a customer profile or email address. That means Casa Crobu cannot reliably follow up, measure repeat behavior, learn which buyers are returning, or transition those shoppers into online ordering and fall delivery.

The recommended next step is a focused market capture pilot built around **Lid Stickers + Market QR Codes**, email/SMS consent, summer market experimentation, and a fall delivery conversion plan.

## Key Findings

| Metric | Finding |
|---|---:|
| Orders analyzed | 36,031 |
| Total order-level revenue | $1.59M |
| POS revenue | $1.17M |
| All orders anonymous | 83.25% |
| POS orders anonymous | 91.62% |
| Anonymous POS orders | 29,621 |
| Known POS order share | 8.38% |

The **8.38% known POS order share** is not active booth capture. It only means that 2,709 POS orders already had an email or Shopify customer profile attached. There is not currently a deliberate system at the booth to capture and consent market shoppers.

## Why It Matters

For anonymous market orders, average order value is almost all we know.

| Segment | Orders | Average Order Value | Known Customers | Repeat Behavior | Customer LTV | What It Means |
|---|---:|---:|---:|---:|---:|---|
| Anonymous Market Orders | 29,621 | $35.73 | ? | ? | ? | We cannot reliably follow up, measure repeat visits, or connect market behavior to online conversion. |
| Known Market Only | 2,405 | $39.22 | 1,827 | 1.32 orders/customer | $51.63 | They bought at market and are identifiable, but not yet online buyers. |
| Online Only | 2,912 | $114.72 | 1,368 | 2.13 orders/customer | $244.20 | They have stronger repeat behavior and higher average LTV. |
| Known Market + Online | 677 | $87.52 | 154 | 4.40 orders/customer | $384.76 | These customers are about 7.5x more valuable than Known Market Only. |

The customer value gap used in the opportunity model is:

```text
$384.76 Known Market + Online LTV
-$51.63 Known Market Only LTV
= $333.13 observed customer value gap
```

This is directional, not guaranteed future revenue. It is a base-case way to estimate what could happen if market shoppers become known and start behaving more like current market + online customers. Recurring delivery or subscription behavior would be upside beyond this model.

## Base-Case Opportunity Model

| Scenario | New Contacts | Online Buyers | Base LTV Upside |
|---|---:|---:|---:|
| Capture 5% of anonymous POS orders; 5% convert online | 1,481 | 74 | About $24.7K |
| Capture 10%; 10% convert online | 2,962 | 296 | About $98.7K |
| Capture 15%; 10% convert online | 4,443 | 444 | About $148.0K |
| Capture 20%; 10% convert online | 5,924 | 592 | About $197.4K |

Formula:

```text
29,621 anonymous POS orders
x capture rate
x online conversion rate
x $333.13 observed customer value gap
= base LTV upside
```

Anonymous orders are the proxy base because shopper-level identity is missing.

## Recommended Pilot

Build the system in four connected steps:

| Step | Focus | What It Means |
|---|---|---|
| 1 | Capture | Lid Stickers + Market QR Codes give market shoppers a simple reason to identify themselves. |
| 2 | Consent | Collect email first, make SMS optional, and route new signups into the right email/SMS system with the right consent status. |
| 3 | Activate | Use the welcome flow and summer market offers to train the list to open, click, and redeem. |
| 4 | Convert To Delivery | Turn summer response data into personalized fall delivery bundles, freezer-stock boxes, and recurring order tests. |

Klaviyo is the recommended path if account setup and cost make sense. A lighter Shopify-first path is possible if the first test needs to stay simpler.

## Three-Phase Project Structure

| Phase | Focus | What It Means |
|---|---|---|
| Phase 1: Prep + Capture Infrastructure | Set up the system before the pilot markets launch. | QR/signup path, consent handling, email/SMS setup, source tags, first offer mechanics, welcome flow, and basic tracking. |
| Phase 2: Summer Experimentation | Use the market list during the summer and learn what works. | Weekly specials, pre-reserve tests, offer response, unsubscribe monitoring, product interest, market-by-market learning, and a 45-minute weekly sync if I am supporting activation. |
| Phase 3: Fall Delivery Conversion | Turn summer engagement into delivery demand. | Personalized fall delivery offer, freezer-stock bundle, recurring order test, and transition messaging. |

## Sample Summer Flow

| Moment | Example |
|---|---|
| Welcome + Consent | "You're on the Casa Crobu market list. We'll send market specials, preorder drops, and delivery updates. Reply STOP to opt out." |
| Pizzetta Deal | Test a simple market-list offer or preorder hook that teaches shoppers there is a reason to open Casa Crobu messages. |
| Weekly Market Special | Example: City Park special or pre-reserve test for the week, with or without a discount, while watching clicks, redemptions, replies, and unsubscribes. |
| Fall Delivery Offer | Send a summer thank-you and wind-down flow, then move customers into personalized fall delivery bundles or recurring order tests. |

Final SMS copy should be reviewed against Klaviyo SMS disclosure setup and Casa Crobu's privacy/terms pages before launch.

## What We Learn This Summer

| Signal | What We Learn | How It Shapes Fall | Measured In |
|---|---|---|---|
| QR and signup source | Which markets, sticker placements, and staff prompts create the most opt-ins. | Focus the fall push on the audiences and markets already responding. | Email/SMS source tags + Shopify POS counts |
| Offer response | Whether shoppers respond better to pizzetta deals, preorder hooks, bundles, or threshold discounts. | Use the winning offer style in the fall delivery launch. | Clicks, redemptions, replies, and unsubscribes |
| Product interest | Which products get attention when we promote specials, preorders, or bundle previews. | Create personalized freezer-stock boxes and delivery bundles around proven interest. | Product clicks, discount usage, and online orders |
| Delivery intent | Who clicks delivery, preorder, freezer-stock, or recurring bundle messages before markets slow down. | Send a summer thank-you and wind-down flow with a personalized fall delivery offer. | Email/SMS segments + Shopify order history |

## Responsibility Breakdown

| Workstream | My Responsibility | Casa Crobu Responsibility | Output |
|---|---|---|---|
| Platform decision | Review current Shopify/Klaviyo setup and recommend Klaviyo vs. a lighter Shopify-first path. | Confirm current tools, account access, plan limits, and whether SMS should be included in phase one. | Approved platform path. |
| Consent + list prep | Identify marketing-consented Shopify customers, separate non-consented customers, and define initial segments. | Confirm which existing customers can be messaged and provide privacy/terms links needed for signup forms. | Consent-ready audience setup. |
| Market opt-in funnel | Build the signup path: QR destination, form/page, source tags, first offer code, welcome message, and SMS consent language if used. | Approve offer, SMS use, landing copy, and required brand/customer language. | Live opt-in funnel for pilot markets. |
| Offer strategy | Recommend first offer options, such as pizzetta deal, pre-reserve test, threshold discount, or free add-on. | Set margin guardrails, inventory constraints, and products that are realistic to promote. | First pilot offer and testing plan. |
| Market assets | Create trackable Market QR Codes, lid sticker CTA copy, booth CTA copy, and print-ready handoff. | Choose 2-3 pilot markets, confirm market rules, approve copy, and handle printing. | Lid Stickers + Market QR Codes ready for launch. |
| Launch QA | Test QR codes, form submission, source tagging, consent status, discount code, and welcome message. | Review and approve the live flow before it goes to market. | Launch-ready capture system. |
| Summer activation | Recommend weekly specials, pre-reserve tests, and offer adjustments based on early engagement; lead a 45-minute weekly sync if retained for activation support. | Share market calendar, product availability, staff feedback, and approve weekly messages/offers. | Active summer learning loop. |
| Measurement | Track opt-ins, source tags, clicks, redemptions, unsubscribes, first online orders, and delivery-interest signals. | Share booth observations and operational context that the numbers do not capture. | Simple performance dashboard and learning notes. |
| Fall delivery transition | Turn summer engagement into a personalized fall delivery offer, freezer-stock bundle, or recurring order test. | Confirm delivery capacity, product/bundle options, fulfillment constraints, and offer economics. | Fall delivery transition plan. |

## Success Benchmarks

| Initiative | Metric | Baseline | Pilot Target | Measured In |
|---|---|---|---|---|
| Lid Stickers + Market QR Codes | New market opt-ins as a share of POS orders | No active booth capture system; historical known POS order share is 8.38% | 15-20% opt-in rate at pilot markets | Email/SMS source tags + Shopify POS counts |
| Email/SMS consent flow | New email/SMS opt-ins | No unified capture flow | Clear weekly opt-in count by market | Email/SMS list growth and consent status |
| Monthly summer offers | Click rate + redemption rate | Not currently tracked by market list | Identify one offer that earns repeat response | Email/SMS clicks + Shopify discount usage |
| Market-to-online transition | First online order from market signups | Not currently tracked from new market signups | Drive first online orders before the fall delivery push | Shopify order source + customer profile history |
| Fall delivery offer | Delivery bundle purchases or recurring offer signups | New test | Validated fall offer before markets slow down | Shopify products, discounts, and email/SMS campaigns |

## Pricing Structure To Discuss

| Phase | Planning Range | Notes |
|---|---:|---|
| Current audit / data dive | $500 | About 8 hours of audit work: data cleaning, order-level revenue correction, customer segmentation, findings, and pilot recommendations. |
| Phase 1: Prep + Capture Infrastructure | $1,500-$2,500 | Final price depends on Klaviyo status, SMS needs, number of pilot markets, offer setup, QR/sticker funnel complexity, welcome flow, and dashboard depth. |
| Phase 2: Summer Experimentation | $1,000-$1,500/month if I own weekly support | Applies if I help with weekly specials, pre-reserve tests, unsubscribe monitoring, reporting, offer learning, optimization during market season, and a 45-minute weekly sync. |
| Phase 3: Fall Delivery Conversion | Scope after summer learnings | Can be scoped as a project or included in the activation retainer depending on how much campaign/build work is needed. |
| Client costs | Separate | Klaviyo/software, print assets, and offer/discount budget are separate from my implementation work. |
| Later media tests | Save for later | Retargeting or lookalike tests should wait until the list is larger and the fall offer is proven. |

## Inputs Needed Before Final Quote

* Shopify access or a current export.
* Klaviyo access/status, if Klaviyo is already installed.
* Decision on SMS for phase one.
* Pilot market list.
* Market rules around stickers, QR codes, and signage.
* First offer budget and margin guardrails.
* Print quantity and asset timing.
* Delivery/fall fulfillment constraints.

## Suggested Next Step

The main thing to decide first is whether this pilot is worth scoping. If yes, the next deliverable is a tighter implementation scope with:

* final platform recommendation,
* launch timeline,
* three-phase pilot plan,
* exact responsibilities,
* final setup budget,
* optional summer activation support,
* and the inputs needed to launch at the first pilot markets.
