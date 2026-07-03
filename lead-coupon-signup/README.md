# Casa Crobu Lead/Coupon Signup

Lightweight Next.js landing page for Casa Crobu market lead capture. The page collects customer contact details, posts only to the serverless `/api/lead` route, creates or updates a Shopify customer through the Admin GraphQL API, tags the customer for Shopify-native email flows, and sends the welcome SMS through Twilio when SMS opt-in is present.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```bash
   SHOPIFY_SHOP_DOMAIN=casa-crobu.myshopify.com
   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxx
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_MESSAGING_SERVICE_SID=MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_FROM_PHONE=+17205550123
   TWILIO_INBOUND_WEBHOOK_URL=https://your-vercel-app.vercel.app/api/twilio/inbound
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

## Twilio SMS setup

1. In Twilio, buy or choose a sending number and complete any required U.S. A2P 10DLC or toll-free verification for Casa Crobu.
2. Prefer a Twilio Messaging Service for production sending.
3. Add these Vercel env vars:

   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_MESSAGING_SERVICE_SID=MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. If you are not using a Messaging Service, set `TWILIO_FROM_PHONE` instead.
5. Submit a test lead with `smsOptIn=true` and confirm the welcome SMS arrives.

## Twilio inbound opt-out setup

The app includes a public Twilio webhook at `/api/twilio/inbound`. Twilio can call this route when customers reply to the toll-free number. The route validates Twilio's request signature with `TWILIO_AUTH_TOKEN`, then syncs recognized SMS preference replies back to Shopify.

1. In Twilio, open **Messaging > Services** and select the Casa Crobu Messaging Service.
2. Go to the service's **Integration** or **Incoming Messages** settings.
3. Set the incoming message webhook to:

   ```text
   https://your-vercel-app.vercel.app/api/twilio/inbound
   ```

4. Add the same full URL to Vercel as:

   ```bash
   TWILIO_INBOUND_WEBHOOK_URL=https://your-vercel-app.vercel.app/api/twilio/inbound
   ```

5. Redeploy after setting the env var.
6. Test with a Shopify customer that has the same phone number:
   - Reply `STOP`; Shopify should remove `sms_opt_in`, add `sms_opt_out`, and append a customer note.
   - Reply `START` or `UNSTOP`; Shopify should remove `sms_opt_out`, add `sms_opt_in`, and append a customer note.
   - Reply `HELP`; Shopify should append a customer note without changing opt-in tags.

## Deploy to Vercel

1. Import the repo into Vercel.
2. Set the Vercel root directory to `lead-coupon-signup`.
3. Set the environment variables above for Production and Preview.
4. Deploy.
5. Submit a test lead and confirm:
   - A Shopify customer is created or updated.
   - Tags include `market_club`, `welcome_offer_5_off_20`, `casa_crobu`, `source_custom_landing_page`, and location/source/campaign tags when provided.
   - Email-opted-in customers receive `email_opt_in` for Shopify-native email flows.
   - SMS-opted-in customers receive `sms_opt_in`, the Twilio welcome SMS, and `welcome_sms_sent` after Twilio accepts the send.
   - The customer note includes submitted fields and timestamp.

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
market_location_south_pearl_street
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
market_location_{selected_location}
```

### Booth code

Use this on booth signage, counter signs, table tents, or market checkout signs:

```text
https://shopify-audit-system.vercel.app?location=South%20Pearl%20Street&channel=booth_code&campaign=summer-2026
```

Expected tags:

```text
source_location_south_pearl_street
market_location_south_pearl_street
source_channel_booth_code
campaign_summer_2026
```
