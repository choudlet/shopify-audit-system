# Casa Crobu Google Analytics Audit

Short working version of the GA audit.

## Goal

Confirm whether Google Analytics 4 is connected and usable for launch reporting.

## Check

* Is `Google & YouTube` installed?
* Is a `GA4` property connected?
* Is there a Google pixel in `Settings > Customer events`?
* Is there any duplicate or custom tracking setup?
* Can Kelly grant `Analyst` access to the GA4 property?

## Good

* `GA4` is connected
* traffic and purchase tracking appear to be working
* no duplicate tracking is obvious

## Needs Setup

* no `GA4` connection found
* no Google pixel found
* unclear whether tracking is working

## Needs Cleanup

* duplicate Google tracking
* old custom tracking still installed
* unclear ownership of the Google account/property

## Notes

* Default ask is `GA4 Analyst` access.
* Only ask for higher access if setup changes are needed.
* `Google & YouTube` appears connected in Shopify, but the connected Google account `ciao@casacrobu.com` needs to be verified.
* Do not disconnect the current Google account casually because it could sever Merchant Center, Google Ads, and product sync connections.

## Kelly Needs To Do

1. Confirm who owns and can log into `ciao@casacrobu.com` as a Google account.
2. Verify or recover access to that Google account if possible.
3. Open Shopify `Google & YouTube` and complete the account verification step if that account should remain the connected Google owner.
4. Confirm whether `ciao@casacrobu.com` should stay the Google owner account or whether a different Google account should own the connection long term.
5. Once the correct Google account is confirmed, grant `GA4 Analyst` access if reporting validation is needed.

## Next Steps

1. Confirm where GA4 is connected in Shopify.
2. Check `Customer events` for Google or custom pixels.
3. Resolve the Google account verification issue for `ciao@casacrobu.com`.
4. Ask Kelly for `GA4 Analyst` access if reporting validation is needed.
