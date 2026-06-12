# Casa Crobu Simple Messaging Tool Recommendation

Working recommendation for `Phase 1A` discovery.

## Decision

Recommend a simple form-triggered messaging setup for Phase `1`, not a full CRM or lifecycle marketing platform.

Best default:

* `SimpleTexting` for the market signup form, QR/text-to-join path, and immediate SMS autoresponder.
* `Shopify` remains the customer/order source of record, but should not be the first-message trigger.

Keep `Klaviyo` as a later upgrade path only if Casa Crobu needs more sophisticated segmentation, branching, and lifecycle reporting after the pilot proves opt-in volume, response, and revenue.

Do not recommend `Postscript` or `Attentive` for Phase `1` unless Casa Crobu decides SMS should become a standalone, high-volume revenue channel rather than one part of the market capture pilot.

## Why This Should Be Simple

Casa Crobu's immediate need is not advanced lifecycle automation. The job is:

1. Customer scans a QR code.
2. Customer submits a form.
3. The form records consent and market/source.
4. The customer receives a confirmation or welcome message with the offer.
5. Casa Crobu can send a few follow-up messages during the pilot.

That is closer to a form + autoresponder problem than a full email/SMS platform decision.

Current live planning numbers from Shopify discovery:

| Audience | Count |
|---|---:|
| Combined reachable audience, email or SMS subscribed | `1,304` |
| Email subscribed | `1,300` |
| SMS subscribed | `33` |
| Inferred SMS-only customers | `4` |

This means Phase `1` should not over-optimize around an expensive SMS/lifecycle platform before the pilot proves that market shoppers will opt in and respond. The stronger move is to get the booth capture loop live quickly, keep the costs low, and preserve the option to upgrade once there is evidence.

## Provider Comparison

| Provider | Best Use | Pros | Tradeoffs | Phase `1` Fit |
|---|---|---|---|---|
| `SimpleTexting` | Standalone opt-in form, QR/text-to-join, and SMS autoresponder | Built for simple SMS capture, auto-replies, keywords, opt-in forms, Zapier/Mailchimp integrations, no long contract | Separate from Shopify unless integrated; starts around a monthly plan rather than pure pay-as-you-go | Best fit |
| `Shopify Forms` + `Shopify Messaging` | Shopify-native form capture and simple campaigns | Keeps customers in Shopify, lowest platform sprawl, simple billing, 10,000 free emails/month, US SMS listed at `$0.012` per message | Does not cleanly solve the core issue if form submission cannot trigger the desired texting flow | Not primary |
| `Klaviyo` | Integrated email/SMS lifecycle marketing for Shopify | Strong Shopify fit, forms, flows, segmentation, email and SMS in one system, useful reporting | Cost rises above the free profile/send limits; setup needs care around consent and profile sync | Upgrade path |
| `Postscript` | SMS-first Shopify brands | Strong SMS tooling, keywords, subscriber acquisition, reply handling, Shopify data segmentation | Adds another platform while Casa Crobu's list is mostly email; starter plan has a `$49` monthly minimum spend | Later, if SMS proves important |
| `Attentive` | Larger brands needing managed SMS/email and advanced personalization | Strong list-growth tooling, support, compliance positioning, cross-channel personalization | Pricing is sales-led/custom; likely too heavy for this pilot | Not Phase `1` |
| `Twilio` / API-first messaging | Custom transactional or operational messaging | Flexible infrastructure | Too much custom compliance, consent, campaign, and reporting work for this project | Not recommended |

## Cost Notes

Klaviyo's free plan is not a realistic long-term fit for Casa Crobu if the Shopify integration syncs the reachable customer base. Klaviyo currently lists the free plan at up to `250` active profiles, `500` email sends/month, and `150` mobile message credits/month. Casa Crobu's live reachable Shopify audience is already about `1,304`, before new market capture.

Shopify Messaging is cheaper for simple sends. Shopify currently lists `10,000` free emails per month, then `$1` per `1,000` additional emails. Shopify's current US SMS price is `$0.012` per SMS message, with billing per message segment.

SimpleTexting's current pricing starts around `$39/month` for `500` credits when billed yearly, with auto-replies, opt-in forms, pop-ups, unlimited contacts, Zapier integration, and incoming SMS replies included. This is more expensive than Shopify's per-message SMS cost, but it solves the hard requirement directly: form submission or new subscription can trigger an SMS autoresponder.

Postscript's public pricing is SMS-specific and starts with a `$49` monthly minimum spend on the starter plan, plus per-message and carrier fees. That can make sense once SMS volume and ROI are proven, but it is unnecessary complexity before Casa Crobu has built the list.

Attentive's public materials position pricing around message volume, subscriber list size, channels, and premium AI tools, with demo-based pricing rather than a simple public rate card. That points to a heavier sales/support motion than this phase needs.

## Recommended Phase `1` Build Path

Use `SimpleTexting` as the pilot messaging tool:

* one market signup form or keyword,
* QR code points to the form or tap-to-text path,
* phone required for SMS consent,
* email optional or collected for later Shopify/customer matching,
* explicit SMS consent language,
* market/source captured through a hidden field, form variant, keyword, list, or URL convention,
* one immediate welcome/offer SMS autoresponder,
* one or two scheduled follow-up messages during the pilot,
* periodic export or Zapier sync back to Shopify so the customer record is not stranded outside the store.

Recommended setup sequence:

1. Confirm SimpleTexting plan, number type, carrier registration timing, and whether the pilot should use a form, keyword, or both.
2. Configure consent language, privacy/terms links, STOP/HELP language, and "consent is not a condition of purchase" language.
3. Build the market club signup form or keyword path.
4. Add market-specific QR URLs or market-specific keywords/lists for source tracking.
5. Build the immediate welcome/offer SMS autoresponder.
6. Build any delayed follow-up texts needed for the pilot.
7. QA opt-in, auto-reply timing, unsubscribe behavior, source tracking, discount code, reporting, and contact export/sync back to Shopify.

## Klaviyo Upgrade Trigger

Revisit `Klaviyo` after the pilot if one or more of these become true:

* market capture volume is high enough that better segmentation will clearly pay for itself,
* weekly campaigns need branching by market, product interest, purchase history, and delivery intent,
* fall delivery conversion requires more advanced flows than Shopify Messaging can comfortably support,
* Casa Crobu wants a cleaner long-term CRM-style marketing layer outside basic Shopify campaigns,
* reporting in Shopify is not enough to evaluate source, campaign, and revenue performance.

This preserves the most important business behavior now: market shoppers become known, consented, source-tagged customers. It also keeps the future Klaviyo migration clean because the pilot can establish the exact fields, segments, and campaign logic worth moving.

## Recommendation To Kelly

Use `SimpleTexting` for Phase `1`.

The first milestone should be proving the market capture loop: QR scans, consented SMS signups, market/source tracking, first offer delivery, and early response. Shopify remains important as the commerce record, but it should not be the workflow trigger if Shopify Forms cannot go straight into a texting flow.

Do not add Klaviyo or a dedicated SMS-only provider until the pilot shows enough capture volume and revenue signal to justify the platform cost.

## Sources Checked

* Klaviyo pricing: `https://www.klaviyo.com/pricing`
* Klaviyo SMS consent collection: `https://help.klaviyo.com/hc/en-us/articles/360035056972`
* Klaviyo Shopify App Store listing: `https://apps.shopify.com/klaviyo-email-marketing`
* Shopify Messaging overview: `https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging`
* Shopify Messaging email pricing: `https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging/email/pricing`
* Shopify Messaging SMS pricing: `https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging/sms/pricing`
* Shopify Messaging App Store listing: `https://apps.shopify.com/shopify-messaging`
* SimpleTexting pricing/features: `https://simpletexting.com/pricing/`
* Postscript pricing: `https://postscript.io/pricing`
* Postscript Shopify App Store listing: `https://apps.shopify.com/postscript-sms-marketing`
* Attentive pricing: `https://www.attentive.com/pricing`
* Attentive Shopify App Store listing: `https://apps.shopify.com/attentive`
