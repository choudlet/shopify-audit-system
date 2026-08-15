# Casa Crobu Market Club Handoff And Approval Sheet

**Date:** 2026-06-14  
**Purpose:** Confirm what we decided during discovery, show how the Market Club signup will work, and list what still needs Kelly's approval before launch prep begins.

This closes the discovery and build-finalization work. The next step would be launch activation: QR codes, staff training, SMS approval follow-through, final testing, and first-market rollout.

---

## 1. What We Have Decided

### Market Club Page

The Market Club signup will live on the Casa Crobu site here:

```text
https://casacrobu.com/pages/market-club
```

That page will show the signup form we built here:

```text
https://shopify-audit-system.vercel.app/
```

The Vercel page is the working form. The Casa Crobu page is where customers will see it on the live site.

### What The Form Will Collect

The form will collect:

- first name
- last name
- email
- phone number
- email opt-in
- SMS opt-in
- where the signup came from

For QR codes tied to a specific market, the market can be built into the link. For general links, the form will ask customers where they found Casa Crobu.

### Shopify Customer Records

Every signup will create or update a Shopify customer.

This matters because Casa Crobu keeps the customer record in Shopify, not in a separate form app. That gives Kelly and the team one place to find the customer later.

### Shopify Tags

The system will add tags that make the signups searchable in Shopify.

Core tags:

```text
market_club
welcome_offer_5_off
casa_crobu
source_custom_landing_page
```

Source tags:

```text
source_location_south_pearl_street_market
market_location_south_pearl_street_market
source_channel_product_sticker
source_channel_booth_code
source_channel_shopify_page
source_channel_instagram
campaign_summer_2026
```

Opt-in tags:

```text
email_opt_in
sms_opt_in
```

Those opt-in tags are only added when the customer gives that contact method and checks the matching box.

### SMS

We will use Twilio for SMS.

The live form sends the welcome SMS through Twilio after an SMS-opted-in customer joins.

### Email

Email capture is included.

The open question is how the first welcome email should be sent. My recommendation is to keep ongoing email management in Shopify, using Shopify customer tags and Shopify Email/Campaigns.

### Offer Redemption

The recommended redemption flow is simple:

1. Customer joins the Market Club.
2. Customer receives the welcome code by SMS when they opt in.
3. Customer shows the text at the booth.
4. Staff applies the welcome offer at checkout.

Staff instruction:

> If a customer shows MARKET5 from the Market Club text, apply $5 off their next lasagna or market order of $29 or more.

---

## 2. How The Flow Works

```text
Customer scans a QR code or visits the Market Club page
→ Customer fills out the form
→ Shopify customer is created or updated
→ Shopify tags are added
→ Customer receives the welcome offer by SMS and/or email
→ Customer shows the code at the booth
→ Staff applies the discount at checkout
```

### If The Customer Opts Into SMS

```text
Customer checks SMS box
→ phone number is saved on the Shopify customer
→ sms_opt_in tag is added
→ Twilio sends the welcome text after approval
```

### If The Customer Opts Into Email

```text
Customer checks email box
→ email is saved on the Shopify customer
→ email_opt_in tag is added
→ customer can receive the welcome email or later Shopify Email campaigns
```

### If The Link Includes A Market

```text
QR link includes location
→ customer does not have to choose a market
→ Shopify gets source and market location tags automatically
```

Example:

```text
https://casacrobu.com/pages/market-club?location=South%20Pearl%20Street%20Market&channel=booth_code&campaign=summer-2026
```

### If The Link Does Not Include A Market

```text
Customer sees a dropdown
→ customer chooses where they found Casa Crobu
→ Shopify gets source and market location tags from that choice
```

This is useful for the website, Instagram, and other general links.

### Launch Link Matrix

For launch, the customer-facing links should use Casa Crobu's page URL:

```text
https://casacrobu.com/pages/market-club
```

The source details are added after the `?`.

#### Generic Links

| Use | Link |
|---|---|
| Website page | `https://casacrobu.com/pages/market-club?channel=shopify_page&campaign=summer-2026` |
| Instagram / link in bio | `https://casacrobu.com/pages/market-club?channel=instagram&campaign=summer-2026` |

These links do not include a location, so customers will choose a location from the dropdown.

#### Booth Code Links

Use these for booth signage, counter signs, table tents, or checkout signs.

| Location | Link |
|---|---|
| Belleview Station DTC | `https://casacrobu.com/pages/market-club?location=Belleview%20Station%20DTC&channel=booth_code&campaign=summer-2026` |
| Boulder Farmers Market | `https://casacrobu.com/pages/market-club?location=Boulder%20Farmers%20Market&channel=booth_code&campaign=summer-2026` |
| Central Park | `https://casacrobu.com/pages/market-club?location=Central%20Park&channel=booth_code&campaign=summer-2026` |
| City Park | `https://casacrobu.com/pages/market-club?location=City%20Park&channel=booth_code&campaign=summer-2026` |
| Festival Park | `https://casacrobu.com/pages/market-club?location=Festival%20Park&channel=booth_code&campaign=summer-2026` |
| Gluten Free Market | `https://casacrobu.com/pages/market-club?location=Gluten%20Free%20Market&channel=booth_code&campaign=summer-2026` |
| Golden | `https://casacrobu.com/pages/market-club?location=Golden&channel=booth_code&campaign=summer-2026` |
| Harvey Park | `https://casacrobu.com/pages/market-club?location=Harvey%20Park&channel=booth_code&campaign=summer-2026` |
| Highlands | `https://casacrobu.com/pages/market-club?location=Highlands&channel=booth_code&campaign=summer-2026` |
| Lafayette | `https://casacrobu.com/pages/market-club?location=Lafayette&channel=booth_code&campaign=summer-2026` |
| Longmont Farmer's Market | `https://casacrobu.com/pages/market-club?location=Longmont%20Farmer%27s%20Market&channel=booth_code&campaign=summer-2026` |
| Louisville | `https://casacrobu.com/pages/market-club?location=Louisville&channel=booth_code&campaign=summer-2026` |
| Parker | `https://casacrobu.com/pages/market-club?location=Parker&channel=booth_code&campaign=summer-2026` |
| South Pearl Street Market | `https://casacrobu.com/pages/market-club?location=South%20Pearl%20Street%20Market&channel=booth_code&campaign=summer-2026` |
| Thornton | `https://casacrobu.com/pages/market-club?location=Thornton&channel=booth_code&campaign=summer-2026` |
| Westminster | `https://casacrobu.com/pages/market-club?location=Westminster&channel=booth_code&campaign=summer-2026` |

#### Product Sticker Links

Use these for product stickers, packaging, lid stickers, bag inserts, or take-home materials.

| Location | Link |
|---|---|
| Belleview Station DTC | `https://casacrobu.com/pages/market-club?location=Belleview%20Station%20DTC&channel=product_sticker&campaign=summer-2026` |
| Boulder Farmers Market | `https://casacrobu.com/pages/market-club?location=Boulder%20Farmers%20Market&channel=product_sticker&campaign=summer-2026` |
| Central Park | `https://casacrobu.com/pages/market-club?location=Central%20Park&channel=product_sticker&campaign=summer-2026` |
| City Park | `https://casacrobu.com/pages/market-club?location=City%20Park&channel=product_sticker&campaign=summer-2026` |
| Festival Park | `https://casacrobu.com/pages/market-club?location=Festival%20Park&channel=product_sticker&campaign=summer-2026` |
| Gluten Free Market | `https://casacrobu.com/pages/market-club?location=Gluten%20Free%20Market&channel=product_sticker&campaign=summer-2026` |
| Golden | `https://casacrobu.com/pages/market-club?location=Golden&channel=product_sticker&campaign=summer-2026` |
| Harvey Park | `https://casacrobu.com/pages/market-club?location=Harvey%20Park&channel=product_sticker&campaign=summer-2026` |
| Highlands | `https://casacrobu.com/pages/market-club?location=Highlands&channel=product_sticker&campaign=summer-2026` |
| Lafayette | `https://casacrobu.com/pages/market-club?location=Lafayette&channel=product_sticker&campaign=summer-2026` |
| Longmont Farmer's Market | `https://casacrobu.com/pages/market-club?location=Longmont%20Farmer%27s%20Market&channel=product_sticker&campaign=summer-2026` |
| Louisville | `https://casacrobu.com/pages/market-club?location=Louisville&channel=product_sticker&campaign=summer-2026` |
| Parker | `https://casacrobu.com/pages/market-club?location=Parker&channel=product_sticker&campaign=summer-2026` |
| South Pearl Street Market | `https://casacrobu.com/pages/market-club?location=South%20Pearl%20Street%20Market&channel=product_sticker&campaign=summer-2026` |
| Thornton | `https://casacrobu.com/pages/market-club?location=Thornton&channel=product_sticker&campaign=summer-2026` |
| Westminster | `https://casacrobu.com/pages/market-club?location=Westminster&channel=product_sticker&campaign=summer-2026` |

---

## 3. Copy To Approve

### Top Bar

```text
Catch us at the market - $5 off your next $29+ order
```

### Offer Badge

```text
Market Club - welcome offer
```

### Headline

```text
Join the Market Club. Get $5 off.
```

### Supporting Copy

```text
Join the Casa Crobu Market Club for weekly market stops, seasonal specials, preorder reminders, and $5 off your next lasagna or market order of $29 or more. From lasagna and eggplant parmigiana to Sardinian favorites, we will help you find what is fresh, ready, and waiting at the booth.
```

### Benefits

```text
Weekly market stops and booth updates
Seasonal specials and preorder reminders
Your $5 off code by text
```

### Form Heading

```text
Claim your $5 off
```

### Form Helper Text

```text
Sign up below and we will send your code.
```

### Button

```text
Join the Market Club
```

### Fine Print

```text
Offer valid on one lasagna or one market order of $29 or more. One use per customer. Casa Crobu will not sell or share your information.
```

### Success Message

```text
You are in the Market Club

Grazie, [first name].

We received your signup and will send the code to the contact info you provided. See you at the market.
```

---

## 4. Consent Copy To Approve

### SMS Checkbox

```text
Text me my $5 off code and occasional Casa Crobu market updates. By checking this box, I agree to receive recurring automated marketing text messages from Casa Crobu. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to unsubscribe and HELP for help.
```

### Email Checkbox

```text
Email me weekly market locations and occasional Casa Crobu updates.
```

### Privacy And Terms Note

Casa Crobu should confirm the Privacy Policy and Terms links before launch.

Suggested note:

```text
By signing up, you agree to receive messages based on your selected opt-ins. View Casa Crobu's Privacy Policy and Terms.
```

If space allows near SMS consent:

```text
Consent is not a condition of purchase. Message frequency may vary. Message and data rates may apply. Reply STOP to unsubscribe and HELP for help.
```

---

## 5. Welcome Messages To Approve

### SMS Welcome Message

```text
Benvenuto to the Casa Crobu Market Club. Use code MARKET5 for $5 off your next lasagna or purchase of $29 or more. To redeem at the booth, give the phone number you used to sign up. Reply STOP to opt out.
```

### Email Subject

Recommended:

```text
Your Casa Crobu market code
```

Alternatives:

```text
Grazie - here is your $5 off code
You are in the Casa Crobu Market Club
```

### Email Body

```text
Hi [firstName],

Grazie for joining the Casa Crobu Market Club. Use code MARKET5 for $5 off your next lasagna or market order of $29 or more.

We will send occasional market locations, seasonal specials, and preorder notes so you know where to find us next.

See you at the market,
Casa Crobu
```

---

## 6. Offer To Approve

Recommended launch offer:

```text
MARKET5
$5 off one lasagna or one market order of $29 or more
One use per customer
```

Recommended redemption:

```text
Customer shows SMS or email at the booth. Staff applies the discount at checkout.
```

Open question:

- Should this also be configured as a Shopify/POS discount code, or should staff apply it manually for the first launch?

---

## 7. QR And Booth Copy To Approve

### Option A

```text
Join the Casa Crobu Market Club

Get $5 off your next $29+ market order.

Scan to get your code.
```

### Option B

```text
Want the weekly market menu?

Join the Casa Crobu Market Club and get $5 off your next market order of $29 or more.
```

### Staff Prompt

```text
Want $5 off next time? Scan here and join our Market Club.
```

---

## 8. Twilio Status And Cost Notes

Twilio is the SMS provider for this lightweight setup.

Where things stand:

- Twilio account is set up.
- Twilio welcome SMS is live for SMS-opted-in customers.
- The app records the welcome SMS on the Shopify customer after Twilio accepts it.

Cost model:

- Twilio is usage-based.
- Casa Crobu should expect phone number cost, outbound SMS usage, inbound SMS usage if customers reply, and any carrier or compliance fees shown in Twilio.
- This avoids paying for a heavier SMS platform before the Market Club proves signup volume and redemption.

Reference:

```text
https://www.twilio.com/en-us/sms/pricing/us
```

---

## 9. Open Approvals

Kelly should approve or revise:

1. Form copy.
2. SMS opt-in copy.
3. Email opt-in copy.
4. Welcome SMS text.
5. Welcome email subject and body.
6. Offer type and amount.
7. Coupon code: `MARKET5`.
8. Redemption method at checkout.
9. Privacy Policy URL.
10. Terms URL.
11. Whether the welcome email should be immediate or handled through Shopify Email/Campaigns.
12. Whether Casa Crobu wants to create `club@casacrobu.com` for Market Club replies and operations.
13. QR sign copy.
14. Initial demo markets for early July.

---

## 10. Next Steps

Recommended next phase:

1. Confirm the approvals above.
2. Finish Twilio toll-free verification.
3. Configure final Twilio production credentials.
4. Decide the welcome email path.
5. Generate QR code links for the demo markets.
6. Prepare QR/signage files for:
   - `channel=booth_code`
   - `channel=product_sticker`
7. Create staff training materials.
8. Record a short staff training video covering:
   - how to present the QR code,
   - what to say at checkout,
   - how the welcome offer works,
   - how staff should redeem the code,
   - what to do if a customer has an SMS/email question.
9. Confirm staff redemption instructions.
10. Run one full production test.
11. Launch at selected demo markets in early July.
12. Review signups by source, location, and channel after the first market weekend.

---

## 11. Approval Summary

My understanding is that the discovery and build-finalization work is now complete enough to hand off for approval.

The remaining work is launch activation: final approvals, QR codes, staff training, Twilio approval follow-through, production QA, and early July rollout.
