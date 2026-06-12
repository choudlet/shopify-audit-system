# Casa Crobu Market Signup Copy Approval Sheet

**Date:** 2026-06-12  
**Purpose:** Collect the customer-facing copy Casa Crobu should approve or edit before launching the market signup/coupon flow.

This is a working approval sheet, not legal advice. SMS and email consent language should be reviewed against Casa Crobu's current privacy policy, terms, messaging provider requirements, and any market-specific rules before launch.

---

## 1. Approval Checklist

| Area | Current recommendation | Casa Crobu approval |
|---|---|---|
| Offer | `5% off your next market order of $20 or more` | |
| Signup name | `Casa Crobu market list` | |
| Primary CTA | `Send my 5% off code` | |
| Email opt-in | Optional checkbox | |
| SMS opt-in | Optional checkbox with consent language | |
| Coupon code | Static code for MVP, sent by Make/SMS/email | |
| Coupon limits | One per customer; valid on one market order of $20+ | |
| Markets to list/use | Start generic; optionally create market-specific links later | |
| Sender voice | Warm, direct, simple, Italian market feel | |
| Legal links | Privacy policy and terms links to be confirmed | |

---

## 2. Landing Page Copy

### Top Bar

Current:

> Italian market pickup list - 5% off your next $20+ order

Alternative:

> Catch us at the market - 5% off your next $20+ order

Needs approval:

- Should this say `market pickup list`, `market list`, or another phrase?
- Should `$20+ order` be written as `$20 or more` for clarity?

### Logo / Brand

Current:

> Casa Crobu

Needs approval:

- Confirm use of the `CC` text mark for the standalone page.
- Confirm whether Casa Crobu has an official logo file to use instead.

### Offer Badge

Current:

> Market list - exclusive offer

Alternative:

> Market list - welcome offer

Needs approval:

- Is `exclusive offer` true enough, or should it be softened to `welcome offer`?

### Main Headline

Current:

> 5% off your next market order.

Alternative:

> Join the market list. Get 5% off.

Needs approval:

- Confirm whether the offer applies only at markets or also online.
- Confirm whether `next market order` is the right phrase customers will understand.

### Supporting Paragraph

Current:

> Join the Casa Crobu market list to hear where we will be each week and unlock 5% off any market order over $20. Lasagna, eggplant parmigiana, Sardinian specialties, straight from our casa to yours.

Alternative:

> Join the Casa Crobu market list for weekly market locations, seasonal specials, and 5% off your next market order of $20 or more.

Needs approval:

- Confirm the product examples.
- Confirm whether `straight from our casa to yours` fits the brand voice.
- Confirm whether `over $20` should become `$20 or more`.

### Benefit Bullets

Current:

1. Weekly heads-up on where to find us
2. First dibs on seasonal lasagna
3. Instant 5% off code by email or text

Alternative:

1. Weekly market locations
2. Seasonal specials and preorder notes
3. Your 5% off code by email or text

Needs approval:

- Are seasonal lasagna and preorder drops real enough to promise now?
- Should the third bullet say `by email or text` only if the customer opts into those channels?

---

## 3. Form Copy

### Form Heading

Current:

> Claim your 5% off

Alternative:

> Get your market code

Needs approval:

- Is `Claim your 5% off` clear and on-brand?

### Helper Text

Current:

> Sign up below and we will send your code.

Alternative:

> Tell us where to send your code and weekly market updates.

Needs approval:

- Should the form emphasize the code first, or the ongoing market updates?

### Field Labels And Placeholders

| Field | Label | Placeholder | Approval notes |
|---|---|---|---|
| First name | `First name` | `Maria` | Required |
| Last name | `Last name` | `Rossi` | Optional |
| Email | `Email` | `you@example.com` | Required if no phone |
| Mobile number | `Mobile number` | `(555) 123-4567` | Required if no email |
| Market/location | `Market or location` | `South Pearl Street` | Optional |
| Notes | `Notes` | `Favorite dish, pickup note, or question` | Optional |

Needs approval:

- Should `Mobile number` be `Phone number`?
- Should `Market or location` use actual market names in a dropdown later?
- Should `Notes` stay on the MVP form, or should the form be shorter?

### Submit Button

Current:

> Send my 5% off code

Alternatives:

> Join the market list

> Get my code

Needs approval:

- Confirm the button should lead with the coupon rather than the list.

### Fine Print

Current:

> Offer valid on a single market order of $20 or more. One per customer. We will never share your info.

Alternative:

> Offer valid on one market order of $20 or more. One use per customer. Casa Crobu will not sell or share your information.

Needs approval:

- Confirm coupon limits.
- Confirm whether `single market order` or `one market order` is clearer.
- Confirm privacy phrasing.

---

## 4. Consent Copy

### SMS Opt-In Checkbox

Current MVP:

> Text me market updates and my 5% off code. Msg & data rates may apply. Reply STOP to opt out.

More complete version:

> Text me my 5% off code and occasional Casa Crobu market updates. By checking this box, I agree to receive recurring automated marketing text messages from Casa Crobu. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to unsubscribe and HELP for help.

Needs approval:

- Confirm whether SMS is active on day one.
- Confirm required provider language once Make/Twilio/SimpleTexting/Klaviyo path is final.
- Confirm whether Casa Crobu has Terms and Privacy Policy URLs to link near this checkbox.

### Email Opt-In Checkbox

Current MVP:

> Email me market updates and my 5% off code.

Alternative:

> Email me my 5% off code, weekly market locations, and occasional Casa Crobu updates.

Needs approval:

- Confirm whether email updates are weekly, occasional, or seasonal.
- Confirm whether the email code is sent through Make, Shopify Email, Klaviyo, or manually at first.

---

## 5. Success State

Current:

> You are on the list
>
> Grazie, [first name].
>
> We received your signup and will send the code to the contact info you provided. See you at the market.

Alternative:

> You are on the list
>
> Grazie, [first name].
>
> Your code is on the way. We will also send market locations and seasonal updates based on your opt-ins.

Needs approval:

- Should the success copy promise immediate delivery?
- Should it mention both email and text, or stay generic?

---

## 6. Error And Validation Copy

Current:

| Scenario | Copy |
|---|---|
| Missing first name | `First name is required.` |
| Missing email and phone | `Enter either an email address or a mobile number.` |
| Invalid email | `Enter a valid email address.` |
| Invalid phone | `Enter a valid mobile number.` |
| API failure | `We could not submit the form right now. Please try again.` |

Needs approval:

- These are utilitarian. No brand review likely needed unless Casa Crobu wants warmer error copy.

---

## 7. Internal Notification Copy

This is the Make/SMS/internal alert payload after a customer submits the form.

Recommended internal SMS:

> New Casa Crobu market signup: [firstName] [lastName]. Email: [email]. Phone: [phone]. Market: [market]. Notes: [message]. Shopify: [shopifyCustomerId].

Shorter internal SMS:

> New market signup: [firstName]. Market: [market]. Contact: [email] [phone].

Needs approval:

- Who should receive internal notifications?
- Should every signup trigger an SMS, or only signups with notes/questions?
- Should internal notifications go to SMS, email, Slack, or just Make logs?

---

## 8. Coupon Delivery Copy

### SMS Code Message

Recommended:

> Grazie from Casa Crobu. Use code MARKET5 for 5% off your next market order of $20 or more. Show this text at the booth. Reply STOP to opt out.

Alternative:

> Welcome to the Casa Crobu market list. Your 5% off code is MARKET5. Valid on one market order of $20 or more.

Needs approval:

- Confirm code value: `MARKET5` or another code.
- Confirm whether customers show the text at the booth or enter a code online.
- Confirm whether the discount is manually honored at POS or created in Shopify.

### Email Code Message

Subject options:

1. `Your Casa Crobu market code`
2. `Grazie - here is your 5% off code`
3. `You are on the Casa Crobu market list`

Body:

> Hi [firstName],
>
> Grazie for joining the Casa Crobu market list. Use code MARKET5 for 5% off your next market order of $20 or more.
>
> We will send occasional market locations, seasonal specials, and preorder notes so you know where to find us next.
>
> See you at the market,
> Casa Crobu

Needs approval:

- Confirm subject line.
- Confirm sign-off.
- Confirm unsubscribe/footer handling based on sending tool.

---

## 9. QR / Booth / Staff Copy

### QR Sign Copy

Option A:

> Join the Casa Crobu market list
>
> Get 5% off your next $20+ market order.
>
> Scan to get your code.

Option B:

> Want the weekly market menu?
>
> Join the Casa Crobu list and get 5% off your next market order.

Needs approval:

- Confirm whether the QR promise should focus on the coupon, weekly market menu, or both.

### Staff Prompt

Option A:

> Want 5% off next time? Scan here and join our market list.

Option B:

> Want to know where we will be next week? Join the market list and get 5% off your next order.

Needs approval:

- Confirm what staff can comfortably say at checkout.
- Confirm whether the offer is for next time, same day, or either.

---

## 10. Decisions Needed Before Launch

1. Is the offer exactly `5% off one market order of $20 or more`?
2. What is the actual coupon code?
3. Is the coupon honored at POS, online, or both?
4. Is SMS live on day one, or email-only at first?
5. Which tool sends the code: Make, Shopify Email, Klaviyo, SimpleTexting, or manual follow-up?
6. What Privacy Policy and Terms links should be used for SMS compliance?
7. Which markets should appear in copy or prefilled links?
8. Who approves final copy?
9. Who receives internal signup notifications?
10. Is the Vercel landing page URL acceptable for QR/signage, or should it later be moved under `casacrobu.com`?

---

## 11. Recommended Meeting Ask

Use the meeting to get lightweight approval on these items:

1. Offer: `5% off one market order of $20 or more`
2. Signup name: `Casa Crobu market list`
3. Primary button: `Send my 5% off code`
4. Whether SMS is active immediately or deferred
5. Coupon code and redemption process
6. Privacy/terms links
7. Any phrases Casa Crobu does not want used

If those are approved, the MVP can launch with the Vercel page, Shopify customer creation, tags, customer notes, and Make notification flow.
