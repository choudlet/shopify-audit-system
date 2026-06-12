# Casa Crobu Klaviyo Profile Estimate

Quick estimate based on the cleaned historical Shopify order data already processed in this project.

## Order-Level Counts

* total orders: `36,031`
* orders with an email: `6,036`
* unique known emails: `3,364`

## Useful Email / Consent Proxies

* unique emails with `Accepts Marketing = yes`: `506`
* unique known emails with a phone present: `215`

## Channel Context

* unique known emails seen on `POS` orders: `1,981`
* unique known emails seen on `web` orders: `1,508`

## What This Suggests

* Casa Crobu's full historical known-customer base is already well above Klaviyo's free-plan `250 active profile` limit.
* If the Shopify integration syncs the full historical customer base, Klaviyo plan cost will matter quickly.
* The number that may matter most for practical launch is not just all known emails, but how many profiles are actually marketable and worth keeping active.

## Live Shopify Verification

Observed during Shopify discovery on `May 25, 2026`:

* Shopify segment count: `1,304` customers
* Share of customer base shown by Shopify: `10.66%`
* Segment URL:
  `https://admin.shopify.com/store/casacrobu2/customers/segments/561397629167`

Segment logic shown in Shopify:

* `email_subscription_status = 'SUBSCRIBED'`
* `OR sms_subscription_status = 'SUBSCRIBED'`

What this means:

* `1,304` is a stronger live-store planning number than the historical export proxy for launchable audience size.
* This count includes customers reachable by either email or SMS, not just email.
* Casa Crobu is still well above Klaviyo's free-plan `250 active profile` limit.

Additional live Shopify counts:

* email subscribed: `1,300`
* SMS subscribed: `33`

Important interpretation:

* `33` is not `SMS only`
* `33` is the total number of customers with `sms_subscription_status = 'SUBSCRIBED'`

Based on the current counts:

* combined reachable audience (`email OR SMS`): `1,304`
* email subscribed: `1,300`
* SMS subscribed: `33`
* inferred overlap (`email AND SMS`): `29`
* inferred email only: `1,271`
* inferred SMS only: `4`

What this suggests:

* Casa Crobu's current reachable audience is overwhelmingly email-based.
* The current SMS-consented base is very small.
* Phase `1` can still include SMS capture, but existing list value is mostly in email.

## Caveat

These counts come from the cleaned order export already used in the Casa Crobu audit work. Klaviyo's own `active profile` logic may not match these numbers exactly.
