# Casa Crobu Lead/Coupon Signup

Lightweight Next.js landing page for Casa Crobu market lead capture. The page collects customer contact details, posts only to the serverless `/api/lead` route, creates or updates a Shopify customer through the Admin GraphQL API, and then posts a clean notification payload to a Make webhook.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```bash
   SHOPIFY_SHOP_DOMAIN=casa-crobu.myshopify.com
   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxx
   MAKE_WEBHOOK_URL=https://hook.us1.make.com/xxx
   INTERNAL_NOTIFICATION_PHONE=+17205550123
   DEBUG_LEAD_SUBMISSIONS=false
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` and submit a test lead.

## Shopify setup

1. In Shopify Admin, create a custom app for Casa Crobu.
2. Add Admin API scopes `read_customers` and `write_customers`.
3. Install the app and copy the Admin API access token.
4. Add `SHOPIFY_SHOP_DOMAIN` and `SHOPIFY_ADMIN_ACCESS_TOKEN` to Vercel project environment variables.

## Make webhook setup

1. Create a Make scenario with a custom webhook trigger.
2. Copy the webhook URL into `MAKE_WEBHOOK_URL`.
3. Configure Make to send the internal SMS notification. Use `INTERNAL_NOTIFICATION_PHONE` in Vercel if the scenario expects the recipient in the payload.
4. The app sends this payload after Shopify succeeds:

   ```json
   {
     "event": "lead_form_submitted",
     "firstName": "Maria",
     "lastName": "Rossi",
     "email": "maria@example.com",
     "phone": "+15551234567",
     "market": "South Pearl Street",
     "message": "Favorite dish or pickup note",
     "smsOptIn": true,
     "emailOptIn": true,
     "shopifyCustomerId": "gid://shopify/Customer/123",
     "internalNotificationPhone": "+17205550123",
     "submittedAt": "2026-06-11T00:00:00.000Z"
   }
   ```

## Deploy to Vercel

1. Import the repo into Vercel.
2. Set the Vercel root directory to `lead-coupon-signup`.
3. Set the environment variables above for Production and Preview.
4. Deploy.
5. Submit a test lead and confirm:
   - A Shopify customer is created or updated.
   - Tags include `website-lead`, `coupon-signup`, `casa-crobu`, `source-custom-landing-page`, and `market-{market}` when a market is provided.
   - The customer note includes submitted fields and timestamp.
   - The Make scenario receives the webhook payload.

## Shopify linking and embedding

- The simplest launch path is to link to the Vercel landing page from Shopify navigation, market QR codes, booth signage, and receipt or follow-up content.
- For an embedded feel, add a Shopify page section or custom Liquid block with a prominent button or iframe pointing to the Vercel URL. Keep the form hosted on Vercel so Admin API tokens and webhook secrets remain server-side only.
- Use `?market=South%20Pearl%20Street` or `?location=South%20Pearl%20Street` on QR/signage links to add a market-specific Shopify tag and note without showing a market field on the form. If no `market` or `location` parameter is present, the form shows a market/location dropdown.

## Launch link conventions

Use URL parameters to create source-specific links without changing the form.

### Product sticker

Use this on product packaging, lid stickers, bag inserts, or take-home materials:

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street&channel=product_sticker&campaign=summer-2026
```

Expected tags:

```text
source_location_south_pearl_street
source_channel_product_sticker
campaign_summer_2026
```

### Generic website or Instagram link

Use this when the link is not tied to one specific market. The form will show a location dropdown:

```text
https://shopify-audit-system.vercel.app?channel=instagram&campaign=summer-2026
```

Expected tags after the customer selects a location:

```text
source_channel_instagram
campaign_summer_2026
source_location_{selected_location}
```

### Booth code

Use this on booth signage, counter signs, table tents, or market checkout signs:

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street&channel=booth_code&campaign=summer-2026
```

Expected tags:

```text
source_location_south_pearl_street
source_channel_booth_code
campaign_summer_2026
```
