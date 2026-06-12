# Casa Crobu Phase 1A Kickoff Checklist

This checklist is for the signed **Phase 1A: Launch Planning and Setup Inputs** milestone.

## Primary Goal

Use Shopify access to confirm the current setup, collect the missing launch inputs, and lock the implementation plan before any build work starts.

## Best First Move

Start with a **Shopify discovery pass**, not with form building.

The first milestone is won when you can present:

* the current-state setup,
* the recommended platform path,
* the required inputs still missing,
* the proposed capture workflow,
* and the exact build plan for Phase 1B.

## Step 1: Shopify Discovery Pass

Go through Shopify and document the current state of:

* customer accounts and customer fields,
* Shopify POS configuration,
* discounts,
* customer segments,
* forms or popups already installed,
* app stack related to email, SMS, popups, or loyalty,
* existing tags used on customers or orders,
* online store pages for privacy policy and terms,
* checkout capture points,
* and any existing reporting that could support launch tracking.

Capture screenshots and notes while you do this.

## Step 2: Confirm The Platform Decision

Before you build, confirm:

* whether Klaviyo is already installed,
* whether Casa Crobu wants email only or email + SMS,
* whether Shopify should remain source of record for customer identity,
* and whether the first launch will use Shopify-first capture or Klaviyo-led capture.

Recommended default:

* Shopify = customer/order source of record
* Klaviyo = email/SMS consent, flows, and engagement source of record

## Step 3: Gather The Missing Inputs

You still need these decisions locked:

* the 2-3 pilot markets,
* the launch offer,
* the exact signup CTA,
* privacy policy link,
* terms link,
* whether SMS is in scope on day one,
* who will prompt customers at the booth,
* and whether there are market rules around QR signage or stickers.

## Step 4: Define The Minimum Data Model

Before building, decide what must be captured on every new signup:

* email
* phone if SMS is included
* consent status
* source market
* signup asset or QR source
* launch offer used
* signup date

Suggested tracking pattern:

* `cc_market_source`
* `cc_signup_asset`
* `cc_capture_season`
* customer tags for pilot list membership

## Step 5: Map The Launch Workflow

Write the exact flow from booth to follow-up:

1. Customer scans QR code at market.
2. Customer lands on signup page or form.
3. Customer submits email and optional SMS consent.
4. Customer is tagged by market/source.
5. Welcome flow sends immediately.
6. Launch offer is delivered.
7. Customer appears in reporting/dashboard views.

If any part of this flow is fuzzy, do not start Phase 1B yet.

## Step 6: Prepare The Phase 1A Review Deliverable

Your Phase 1A review should include:

* current-state findings from Shopify,
* platform recommendation,
* launch workflow walkthrough,
* data model and tagging plan,
* missing client approvals,
* build sequence for Phase 1B,
* and a launch-risk list.

## What To Do Today

If you are starting now, do these in order:

1. Audit Shopify settings, apps, customer structure, discounts, and policy pages.
2. Check whether Klaviyo is installed and whether SMS is active or even possible under the current account.
3. Make a short open-items list for Casa Crobu with the missing decisions.
4. Draft the implementation workflow walkthrough.
5. Present that as the Phase 1A milestone review and trigger the first $500 payment.

## What Not To Do First

Avoid starting with:

* final QR generation,
* welcome flow writing,
* sticker production,
* dashboard building,
* or launch QA.

Those belong in Phase 1B after the planning inputs are locked.
