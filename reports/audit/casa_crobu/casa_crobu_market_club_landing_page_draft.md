# Casa Crobu Market Club Landing Page Draft

Working draft for the market QR landing page.

## Goal

Turn a market QR scan into:

* clear context
* email signup
* optional SMS signup
* source tracking
* entry into the welcome flow

## Recommended Page Structure

## Block Outline

Use this as the simple page build order:

1. Logo or small brand mark
2. Headline
3. Short subhead
4. Offer line
5. Signup form
6. Short benefits list
7. SMS consent copy on the SMS step
8. Privacy Policy and Terms links
9. Success message / offer confirmation

### 1. Hero

Purpose:

* explain the club fast
* show the value of signing up
* make the next step obvious

Sample copy:

**Headline**

Join the Casa Crobu Market Club

**Subhead**

Get market specials, preorder drops, delivery updates, and first access to what we are bringing next.

**Offer line**

Sign up now to get our current market offer and future updates from Casa Crobu.

Suggested visual notes:

* keep this section clean and fast
* one food image is enough if you use one
* avoid making the page feel like a full shopping page

### 2. Signup Form

Recommended flow:

* step 1 = email required
* step 2 = phone optional with explicit SMS consent

Suggested labels:

* `Email address`
* `Phone number`

Primary button copy:

* `Join the Market Club`

Secondary SMS step button:

* `Add text updates`

Skip option on SMS step:

* `Skip for now`

Suggested helper text under email step:

Get the latest market specials, preorder drops, and Casa Crobu updates.

### 3. What They Get

Purpose:

* set expectations
* make the signup feel worth it

Sample copy:

When you join, you can get:

* market specials
* preorder and pickup updates
* delivery announcements
* seasonal product drops

Suggested section title:

Why join the Market Club?

### 4. SMS Consent Copy

Purpose:

* collect SMS correctly
* keep the opt-in explicit

Working placeholder copy:

By providing your phone number and opting in, you agree to receive recurring automated promotional and personalized marketing text messages from Casa Crobu. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to unsubscribe and HELP for help.

Footer links needed:

* Privacy Policy
* Terms of Service

## Ready-To-Build Copy Blocks

### Block 1: Eyebrow

Casa Crobu Market Club

### Block 2: Headline

Join the Casa Crobu Market Club

### Block 3: Subhead

Get market specials, preorder drops, delivery updates, and first access to what we are bringing next.

### Block 4: Offer Line

Sign up now to get our current market offer and future updates from Casa Crobu.

### Block 5: Email Step Helper Copy

Start with your email to join the club and get your welcome offer.

### Block 6: Benefits Section

Why join the Market Club?

* market specials
* preorder and pickup updates
* delivery announcements
* seasonal product drops

### Block 7: SMS Step Helper Copy

Want text updates too? Add your phone number for market reminders and special drops.

### Block 8: SMS Consent Copy

By providing your phone number and opting in, you agree to receive recurring automated promotional and personalized marketing text messages from Casa Crobu. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to unsubscribe and HELP for help.

### Block 9: Success Headline

You are in.

### Block 10: Success Body

Thanks for joining the Casa Crobu Market Club. Watch your inbox for your welcome message and offer details.

### Block 11: Success SMS Note

If you opted into text updates, keep an eye on your phone for market reminders and special drops.

## Success Step

Purpose:

* confirm the signup
* deliver the offer
* tell them what happens next

Sample copy:

**Headline**

You are in.

**Body**

Thanks for joining the Casa Crobu Market Club. Watch your inbox for your welcome message and offer details.

**Optional SMS version**

If you opted into text updates, keep an eye on your phone for market reminders and special drops.

## Hidden Tracking Fields

Recommended hidden fields:

* `cc_market_source`
* `cc_signup_asset`
* `cc_capture_season`

## Recommended Logic

* one shared landing page
* one main `Market Club` list
* one welcome flow
* channel branching based on consent
* market reporting handled through source properties, not separate lists

## Notes

* Keep the page short.
* The market scan should feel fast and low-friction.
* Email should be the required first step.
* SMS should be optional, not forced.
