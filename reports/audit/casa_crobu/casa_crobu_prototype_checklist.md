# Casa Crobu Prototype Checklist

Use this as the working checklist for the first prototype pass.

## Goal

Build enough of the system to show:

* what the customer experience looks like
* how the data flows
* what gets stored where
* what triggers the follow-up

## Prototype 1: Landing Page Flow

Build a first-pass version of:

1. `Market Club` landing page
2. email step
3. optional SMS step
4. success state

Check:

* page can live on the Shopify site
* CTA and offer are easy to understand
* email-first flow feels fast on mobile
* SMS step is optional and compliant

## Prototype 2: Form + Data Capture

Set up a draft version of:

1. one main `Market Club` list
2. one test form
3. hidden/source fields

Check:

* email consent stores correctly
* SMS consent stores correctly
* source fields can be captured
* one shared flow works better than separate lists

Recommended tracking fields:

* `cc_market_source`
* `cc_signup_asset`
* `cc_capture_season`

## Prototype 3: Welcome Flow Logic

Map the first-pass welcome logic:

1. joins `Market Club`
2. branch for email consent
3. branch for SMS consent
4. success / offer delivery

Check:

* email-only path
* SMS-only path
* both-consented path

## Prototype 4: Source + QR Logic

Confirm the structure for:

1. one QR per market
2. one shared landing page
3. source carried through the URL/form

Check:

* no need for separate lists by market
* market attribution can live in source properties

## Prototype 5: Reporting Baseline

Confirm what the first reporting layer needs to show:

* signups by market
* email opt-ins
* SMS opt-ins
* welcome flow performance
* offer redemption

## What Success Looks Like

By the end of this pass, you should have:

* one draft landing page
* one draft form structure
* one draft data-flow model
* one draft welcome-flow structure
* one clear recommendation on platform/setup direction

## Keep It Light

This pass does not need:

* final design polish
* final copy everywhere
* full QA
* production-ready automations
* all edge cases solved

It only needs to be concrete enough for Kelly to react to.
