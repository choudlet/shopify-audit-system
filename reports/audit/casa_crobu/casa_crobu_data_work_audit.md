# Casa Crobu Data Work Audit

Short working checklist for figuring out the real data work before Phase 1B build starts.

## Goal

Figure out:

* what customer and consent data already exists,
* what needs cleanup,
* what needs to migrate,
* what new fields/tags/tracking need to be created,
* and what reporting setup is required for launch.

## Why This Matters

The big historical issue is still the same:

* most POS demand is anonymous
* market capture is not structured yet
* follow-up is hard unless customer identity and consent are clean

## Main Questions

1. What usable customer data already exists in Shopify?
2. What email and SMS consent data is already usable?
3. What current tags, segments, and marketing lists already exist?
4. What data is stuck in Shopify Email or old apps and needs migration?
5. What new tracking fields do we need for market capture?
6. What reporting baseline do we need before launch?

## Step 1: Audit Existing Customer Data

In Shopify, check:

* total customer count
* customers with email
* customers with phone
* customers subscribed to email marketing
* customers subscribed to SMS marketing
* existing customer tags
* existing customer segments
* whether duplicates look like a problem

## Step 2: Audit Existing Marketing Data

Check:

* Shopify Email / Messaging campaigns
* current email templates or automations
* any signup forms or popups
* whether old apps hold subscriber data
* whether there are existing lists or segments worth keeping

## Step 3: Define The Launch Data Model

Before build, decide the minimum data captured on every market signup:

* `email`
* `phone`
* `email consent`
* `sms consent`
* `market source`
* `qr source`
* `offer`
* `signup date`
* `capture season`

## Step 4: Define Where Each Data Type Lives

Recommended default:

* `Shopify` = customer and order source of record
* `Klaviyo` = email/SMS consent, flows, and engagement

This means you should decide:

* which tags/properties live in Shopify
* which properties live in Klaviyo
* which fields need to sync both ways

## Step 5: Define Tracking For Markets

Decide how each market signup will be identified.

Minimum tracking:

* one QR path per market
* one source value per market
* one source value per signup asset if needed

Suggested naming pattern:

* `cc_market_source`
* `cc_signup_asset`
* `cc_capture_season`

## Step 6: Define Reporting Baseline

Before launch, decide what you want to measure from day one:

* new signups by market
* email vs SMS opt-in count
* welcome flow performance
* offer redemption
* first online order from market signups
* unsubscribe rate
* POS orders by pilot market

## Step 7: Identify Cleanup / Migration Work

Make a short list of:

* old apps to remove
* old capture tools to retire
* old campaigns/templates to recreate
* old tags/segments that need cleanup
* any duplicate tracking or duplicate subscriber capture

## Output You Want From This Audit

By the end of this discovery pass, you want:

* a current-state data summary
* a consent and segmentation summary
* a migration list
* a tagging / property plan
* a launch reporting plan
* a short list of missing client decisions

## Good Next Steps

1. Audit Shopify customers and customer segments.
2. Audit Shopify Email / Messaging and note what needs migration.
3. Define the minimum capture fields and naming structure.
4. Decide what lives in Shopify vs Klaviyo.
5. Make the reporting baseline list.
