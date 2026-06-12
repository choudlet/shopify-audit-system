# Market Customer Capture Consulting Playbook

**Purpose:** Turn the Casa Crobu discovery process into a repeatable consulting offer for farmers-market vendors, food businesses, restaurants, pop-ups, and other Shopify merchants with significant in-person sales.

**Core business problem:** The business has regular in-person customers but does not consistently know who they are, how often they return, or how to reach them after the sale.

## The Reusable Offer

Sell a practical customer-retention setup, not a software installation.

The client-facing promise:

> I will help you create a simple way for in-person customers to join your list, receive a useful reason to return, and become customers you can recognize and stay in touch with.

The initial system should connect:

```text
Product or booth QR
  -> simple signup page
  -> customer added to the merchant's existing system
  -> welcome offer
  -> staff recognizes customer on return visit
  -> purchase is connected to the customer
  -> useful follow-up throughout the season
```

## Recommended Service Structure

### 1. Discovery Milestone

Use a paid discovery milestone before the main build. A useful starting structure is:

| Milestone | Example Price | Deliverable |
|---|---:|---|
| Discovery | `$500` | Review the current setup, evaluate practical options, build a working example, identify decisions, and recommend the build direction |
| Full project | `$2,500` total | Complete discovery, build the approved setup, test it, prepare the staff process, and launch it |

Discovery is not a sales proposal after the client has already agreed to the project. It is the first paid portion of the agreed work.

The discovery closeout meeting should:

1. Show what was reviewed and tested.
2. Demonstrate one complete customer journey.
3. Explain the recommended direction in business language.
4. Record the client's remaining choices.
5. Close the discovery milestone and move into the build.
6. Trigger the discovery invoice.

### 2. Build Milestone

The build should normally include:

* market or location-specific signup pages,
* QR codes for products and booth signage,
* one customer-wide list plus location-specific lists,
* a welcome offer,
* email follow-up,
* a staff lookup and redemption process,
* end-to-end testing,
* a simple summer or seasonal message calendar,
* and launch support.

Texting should be scoped separately when it adds meaningful provider cost or operating complexity.

## Discovery Workflow

### Step 1: Understand The Business Operation

Start with how the business already works:

* Where do customers purchase?
* What does a busy checkout look like?
* What does staff already do reliably?
* What would create unacceptable friction?
* What messages does the owner already send?
* Which existing marketing activity already performs well?
* What seasonal transition does the business need to prepare for?

For hospitality owners, explain decisions through customer experience, staff steps, cost, and expected usefulness. Avoid leading with software features.

### Step 2: Audit The Existing Tools

Before recommending another subscription, identify what the client already pays for and what it can do.

For Shopify merchants, inspect:

* Shopify plan and POS plan by location,
* customer records and existing marketing permissions,
* Shopify Forms,
* Shopify email and messaging history,
* discount behavior online and in POS,
* customer lookup at checkout,
* installed form, page-builder, and messaging apps,
* legal pages required for text-message permission,
* and recent email performance.

Important lesson: existing performance can change the recommendation. Casa Crobu's recent Shopify emails showed roughly `52-63%` open rates and strong Shopify-attributed purchasing. That makes growing the existing email audience more valuable than replacing the email system.

### Step 3: Build One Real Demo

Do not spend discovery producing only diagrams. Build enough of the actual workflow to answer the risky questions.

The minimum useful demo:

1. A customer joins through a market signup page.
2. The customer receives the intended list and location labels.
3. The offer is visible and understandable.
4. Staff can find the customer in POS.
5. Staff can apply the offer.
6. The customer remains connected to the completed order.

Screenshots are valuable backup material, but a live end-to-end walkthrough is the strongest discovery deliverable.

### Step 4: Convert Technical Findings Into Business Decisions

Do not present every technical path. Present the few choices the owner actually needs to make:

* Which locations go first?
* What is the signup offer?
* When does it expire?
* Is online use of the shared offer acceptable?
* Should launch use email only or include texting?
* What messages will customers receive throughout the season?
* Who supplies and approves message content?
* What is the launch date?

## Default Solution Pattern

For a lean Shopify merchant, start with:

* one direct Shopify page and Form per location,
* one shared customer label such as `market_club`,
* one location label such as `<location>_market_club`,
* one direct QR code per location,
* one memorable shared welcome offer,
* staff attaching the customer before applying the offer,
* and email as the first follow-up channel.

Avoid unnecessary complexity during the first launch:

* Do not add UTM parameters unless session-level traffic reporting is genuinely needed.
* Do not create a Shopify Campaign for every page.
* Do not duplicate products to enforce a market-only offer.
* Do not upgrade every location to POS Pro solely for discount automation.
* Do not add a third-party form app until the native form fails an important requirement.
* Do not add texting solely because it is available.

## Email And Texting Decision

Separate three different capabilities:

| Capability | What It Means |
|---|---|
| Collect a phone number and permission to text | The signup page records that the customer is willing to receive texts |
| Send occasional text campaigns | The business can send timely reminders to customers who agreed |
| Text-to-join and automatic welcome texts | Customers can text a word to join and receive an immediate automated response |

For Shopify:

* Shopify Forms can collect a phone number and text-message permission after the required setup.
* The Form cannot send a welcome text by itself.
* Shopify Messaging can send text campaigns but does not currently provide the same automatic new-subscriber welcome-text path as specialized providers.
* Text-to-join and richer automatic texting generally require another paid service.

Recommended default:

> Launch automatic email first, collect phone numbers when appropriate, and add paid texting only after the owner defines how it will be used.

## Offer Design Lessons

The first offer should support the immediate business goal.

For a seasonal market business:

1. Reward a return market visit first.
2. Build recognition and repeat behavior.
3. Later, offer a reason to try delivery or online ordering.

A practical initial offer:

* percentage off an order,
* minimum purchase threshold,
* one use per customer,
* easy for staff to explain,
* and easy to test in POS.

Important operational constraint: a shared Shopify discount code may also work online. If the offer must be strictly in-person, staff may need to verify eligibility and apply a custom POS discount instead.

## Existing-Customer Test

Always test what happens when someone already in the merchant's customer database submits the signup form.

Verify:

* whether Shopify updates the existing customer or creates a duplicate,
* whether the shared and location labels are added,
* whether email and text-message permission choices are recorded correctly,
* what happens when submitted email and phone data conflict with existing records,
* and whether staff can still find the customer quickly.

This should be a standard pre-launch test in every project.

## Seasonal Engagement Planning

Capturing customer information is not enough. The service should help the owner decide why customers will remain interested.

Useful message categories for food and market businesses:

| Message | Suggested Use |
|---|---|
| Weekly location and schedule | Give customers a practical reason to open the message |
| Featured dish or seasonal special | Create anticipation |
| Preorder deadline | Convert interest into a planned purchase |
| Location change, cancellation, or sellout notice | Make the list operationally useful |
| Serving idea or behind-the-scenes story | Build affinity without always discounting |
| End-of-season delivery offer | Continue the relationship after market season |

Recommended starting rhythm:

* one useful weekly email,
* texts only for timely messages worth interrupting someone for,
* and a later seasonal offer that moves engaged customers into the next sales channel.

## Meeting And Communication Lessons

### Match The Owner's Language

For hospitality and food-business owners:

Say:

* regular customers,
* customer list,
* staff lookup,
* weekly special,
* return visit,
* what it costs,
* what the customer receives,
* and what staff needs to do.

Avoid unless necessary:

* attribution,
* segmentation,
* activation,
* source of truth,
* integration,
* vendor validation,
* and platform architecture.

### Make The Demo The Center

The strongest meeting structure:

1. Briefly explain what was reviewed.
2. Walk through the customer experience.
3. Walk through the staff checkout experience.
4. Show what is already working.
5. Explain the recommended first build.
6. Discuss email versus texting.
7. Agree on the seasonal communication plan.
8. Capture final decisions.
9. Close the milestone and state the next work.

### Do Not Re-Sell An Agreed Project

Once the client has agreed to the project, milestone meetings should not sound like another pitch.

Use:

> Here is the work completed, here is what I learned, here is the working example, and here are the choices I need to finish the next portion.

Do not use:

> Should we approve this project?

## How This Becomes A Repeatable Business

### Ideal Client Profile

Look for businesses that:

* have substantial in-person sales,
* use Shopify or another customer-capable POS,
* have many anonymous transactions,
* already have regular customers,
* sell seasonally or through recurring markets/events,
* have an underused email or text list,
* and want to increase repeat purchases or move customers into another channel.

Strong examples:

* farmers-market food vendors,
* bakeries and prepared-food businesses,
* restaurant groups with pop-ups,
* breweries and tasting rooms,
* specialty retail market vendors,
* food trucks,
* and seasonal hospitality businesses.

### Productized Offer

Potential positioning:

> Customer Capture and Return Visit Setup

Deliverables:

* current-system review,
* one working signup and return-purchase demo,
* location-specific QR/signup plan,
* welcome-offer recommendation,
* customer-list organization,
* staff redemption workflow,
* email/texting recommendation,
* seasonal message plan,
* implementation,
* and launch testing.

### Additional Services

Offer these only when the core system is working:

* paid texting setup and management,
* monthly message planning and execution,
* seasonal delivery-conversion campaigns,
* deeper reporting,
* staff training,
* custom landing-page design,
* unique customer coupons,
* and more advanced customer automation.

## Standard Discovery Closeout Checklist

Before invoicing discovery and moving into the build, confirm:

* current tools and plan limitations are documented,
* one end-to-end demo has been completed,
* the owner understands the customer and staff experience,
* the initial offer is selected,
* the first locations are selected,
* email versus texting at launch is decided or explicitly deferred,
* content ownership and expected message rhythm are discussed,
* legal-policy requirements are assigned,
* the remaining build tasks are clear,
* and the client understands that discovery is complete.

## Lessons To Carry Forward

1. Native tools are often sufficient to prove the business idea.
2. Do not recommend another monthly subscription until the client can describe how they will use it.
3. Existing marketing performance is a strategic asset, not background information.
4. A staff-controlled process can be better than expensive automation during an early pilot.
5. Location-specific pages and simple customer labels can replace complicated tracking.
6. The demo should prove the riskiest operational steps, especially checkout.
7. The owner needs decisions framed around customers, staff, cost, and timing.
8. Discovery is valuable paid work when it produces a tested direction and removes build uncertainty.
9. A good closeout meeting documents decisions and naturally triggers the next milestone.
10. The best long-term offering combines setup with an ongoing reason for the client to communicate with customers.
