# Casa Crobu Market Club Operator Guide

**Date:** 2026-06-14  
**Purpose:** Give Casa Crobu a practical guide for using and maintaining the Market Club signup system.

This guide covers the current lightweight system: a Vercel-hosted signup page, Shopify customer tags/notes, and direct Twilio SMS delivery.

---

## 1. What The System Does

When a customer submits the Market Club form:

1. The form validates the customer's name and contact information.
2. The app creates or updates a Shopify customer.
3. The app adds Shopify tags for audience, offer, source, location, campaign, and opt-ins.
4. The app writes a customer note with submitted fields and timestamp.
5. When a customer opts into SMS, the app sends the welcome message through Twilio.

---

## 2. Core Tags

Every Market Club signup receives:

```text
market_club
welcome_offer_5_off
casa_crobu
source_custom_landing_page
```

If the customer checks the email or SMS consent box, they also receive:

```text
email_opt_in
sms_opt_in
```

---

## 3. Link Parameters

Use URL parameters to track where signups came from.

| Parameter | Example | Creates tag |
|---|---|---|
| `location` | `South%20Pearl%20Street%20Market` | `source_location_south_pearl_street_market` |
| `channel` | `product_sticker` | `source_channel_product_sticker` |
| `campaign` | `summer-2026` | `campaign_summer_2026` |
| `embed` | `1` | Hides Vercel page chrome for Shopify iframe embeds |

If no `location` or `market` parameter is present, the form shows a location dropdown.

---

## 4. Recommended Launch Links

### Product Sticker

Use for product packaging, lid stickers, bag inserts, or take-home materials:

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street%20Market&channel=product_sticker&campaign=summer-2026
```

### Booth Code

Use for booth signage, counter signs, table tents, or market checkout signs:

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street%20Market&channel=booth_code&campaign=summer-2026
```

### Shopify Website Embed

Use inside the Shopify Market Club page iframe:

```text
https://shopify-audit-system.vercel.app?embed=1&channel=shopify_page&campaign=summer-2026
```

Because this link has no location parameter, customers will see the location dropdown.

### Instagram Or Link-In-Bio

Use:

```text
https://shopify-audit-system.vercel.app?channel=instagram&campaign=summer-2026
```

Because this link has no location parameter, customers will see the location dropdown.

---

## 5. Current Dropdown Locations

The generic form location dropdown currently includes:

- Belleview Station DTC
- Boulder Farmers Market
- Central Park
- City Park
- Festival Park
- Gluten Free Market
- Golden
- Harvey Park
- Highlands
- Lafayette
- Longmont Farmer's Market
- Louisville
- Parker
- South Pearl Street Market
- Thornton
- Westminster

To add, remove, or rename dropdown locations, update `MARKET_LOCATIONS` in:

```text
lead-coupon-signup/lib/market-locations.ts
```

Then redeploy the Vercel app.

---

## 6. How To Add A New Market QR Code

1. Choose the location name customers and staff will recognize.
2. Choose the channel:
   - `product_sticker`
   - `booth_code`
   - `instagram`
   - `shopify_page`
3. Build the URL with encoded spaces.
4. Generate a QR code from that URL.
5. Test the QR code before printing.
6. Submit one test lead and confirm the Shopify tags.

Example:

```text
https://shopify-audit-system.vercel.app?location=Boulder%20Farmers%20Market&channel=booth_code&campaign=summer-2026
```

Expected Shopify tags:

```text
market_club
welcome_offer_5_off
casa_crobu
source_custom_landing_page
source_location_boulder_farmers_market
source_channel_booth_code
campaign_summer_2026
```

---

## 7. How To Check Results In Shopify

1. Go to Shopify Admin.
2. Open **Customers**.
3. Search or filter by tag:
   - `market_club`
   - `welcome_offer_5_off`
   - `source_channel_booth_code`
   - `source_channel_product_sticker`
   - `source_location_south_pearl_street_market`
4. Open a customer profile to inspect tags and notes.

The customer note should include submitted fields, source location, source channel, campaign, opt-in choices, and timestamp.

---

## 8. How To Change The Offer

If the offer changes, update:

1. Landing page copy in `lead-coupon-signup/app/page.tsx`
2. Fine print in `lead-coupon-signup/app/page.tsx`
3. Shopify tag in `lead-coupon-signup/lib/shopify.ts`
4. SMS copy in `lead-coupon-signup/lib/twilio.ts` and any separate Shopify Email campaign copy
5. QR/signage copy

For example, if the offer changes from `$5 off $29+` to `$10 off $30+`, create a new offer tag instead of reusing the old one:

```text
welcome_offer_10_off_30
```

---

## 9. SMS Delivery And Reporting

The app sends the welcome SMS directly through Twilio when `smsOptIn` is true and a phone number is present. The app records `welcome_sms_sent` on the Shopify customer after Twilio accepts the message.

Use Shopify to review Market Club customers, offer/source/location tags, and discount redemption. Use Twilio's Messaging dashboard to review delivery and reply activity.

Recommended SMS:

```text
Benvenuto to the Casa Crobu Market Club. Use code MARKET5 for $5 off your next lasagna or purchase of $29 or more. To redeem at the booth, give the phone number you used to sign up. Reply STOP to opt out.
```

---

## 10. Safe Operating Rules

- Do not text customers unless they checked the SMS opt-in box.
- Do not email marketing updates unless they checked the email opt-in box or Casa Crobu has another valid consent basis.
- Test every new QR/link before printing.
- Keep old offer tags in Shopify for historical reporting.
- Use new campaign tags for new seasons or campaigns.
