# Casa Crobu App Audit

Short working version of the Shopify app audit.

## Goal

Figure out which apps should stay, which can be removed, and which need one last check before uninstalling.

## Keep

* `LayoutHub` - confirmed active on live pages like `/pages/market-schedule`
* `Messaging` - Shopify email/messaging is active
* `Pickeasy` - active pickup/delivery workflow
* `Spoke Dispatch` - likely operational
* `Recharge Subscriptions` - likely operational
* `Feesly: Surcharge & Fees (POS)` - likely operational

## Likely Remove

* `SendWILL Email Popups` - no real usage found, overlaps with future Klaviyo capture
* `GemPages Builder` - looks disabled / not live
* `EComposer Builder` - appears unused

## Verify Then Remove

* `PageFly Page Builder` - looks unused, but app embed is active
* `Instafeed` - check if it is live on the storefront
* `BEE Logo showcase` - check if it is live on the storefront

## Notes

* `Klaviyo` is not installed yet.
* `LayoutHub` is the only page builder confirmed active so far.
* Do not remove any page builder until you confirm it does not own a live page, section, or embed.

## Next Steps

1. Disable the `PageFly` embed and test the storefront.
2. Confirm `GemPages` and `EComposer` have no published pages.
3. Check whether `Instafeed` and `BEE Logo showcase` are visible on the live site.
4. Make the final uninstall list.
