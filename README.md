# Shopify Audit Engine: The "Market-to-Web" Bridge
**Strategic Growth Roadmap for Casa Crobu | Summer 2026**

This system turns anonymous farmers market POS activity into a measurable digital growth engine. The story is not "we found free money." The story is sharper: market demand is proven, but most customer relationships are not being captured, nurtured, or converted online yet.

---

## Phase 0 Audit Results

We analyzed **36,031 historical orders** and **$1.59M in order-level revenue** across Shopify POS, web, and draft-order channels.

* **The Anonymous Order Gap:** **83.25%** of all orders (**29,995**) have no email attached.
    * This is an order-level count, not a guaranteed unique-person count.
* **The POS Shadow Gap:** **29,621 POS orders** have no email attached, which is **91.62%** of POS orders.
* **The Ghost Lead Asset:** **1,827 known customers** have an email in Shopify from POS activity but have **never** bought online.
* **The Hybrid Gap:** Only **154 known customers** have crossed both ways: POS and web.
* **The Seasonal Drop-off:** In 2025, off-season revenue was about **60% lower** than market-season revenue, even with web growth.

---

## The Corrected LTV Multiplier

Customer LTV is calculated at the order level to avoid double-counting multi-item Shopify exports.

* **Ghost (POS-Only) LTV:** **$51.63** average total spend.
* **Digital Native (Web-Only) LTV:** **$244.20** average total spend.
* **Hybrid (Market + Web) LTV:** **$384.76** average total spend.
* **The Impact:** A known customer who crosses the bridge is about **7.5x more valuable** than a POS-only Ghost.

### Existing Ghost Upside

If **10%** of the 1,827 existing Ghosts become Hybrid customers, the order-level upside is about **$60,900 in incremental revenue**. Full migration of the current Ghost segment implies about **$609,000 in incremental LTV upside**.

---

## Additional Findings Worth Presenting

* **Channel economics:** POS drives **32,330 orders** at **$36.16 AOV** with only **8.38% email capture**. Web drives **3,607 orders** at **$113.68 AOV** with **90.05% email capture**.
* **Market opportunity:** South Pearl Street, Boulder, Highlands, Cherry Creek Holiday, and Fort Collins have the largest capture upside versus City Park's stronger email capture rate.
* **Hybrid timing:** Among customers who start at POS and later buy online, the median time to web purchase is **156 days**. This means the follow-up engine has to work for months, not just one post-market email.
* **Gateway product:** Classic Lasagna Bolognese Small is the strongest first POS product among market-to-web Hybrids.
* **Bundle opportunity:** Bolognese Small most often pairs with Funghi & Salsiccia, Eggplant Parmigiana, La Pizzetta, Polpette al Sugo, and Pesto.

---

## Strategic Pillars for Summer 2026

### 1. Active Market Capture

Move from passive POS recognition to active opt-in capture:

* **Fast prompt:** "Text PASTA to 720-XXX-XXXX" or a QR/tap-to-text card at checkout.
* **Physical tether:** Lid stickers and booth signage with the same CTA.
* **Staff habit:** One line at checkout: "Want the market menu and preorder drops? Text PASTA."
* **Compliance guardrail:** SMS opt-in copy must include required disclosure language, privacy policy, terms, STOP/HELP instructions, and "consent is not a condition of purchase."

### 2. Ghost Activation

Target the **1,827 POS-only known customers** with a low-friction online first order:

* Segment by recency, favorite market, and first product.
* Lead with the Bolognese gateway product and proven bundle offers.
* Use a simple online-first incentive that does not train everyone to wait for discounts.

### 3. VIP Market Pass

Invite the best web-only customers into the market experience:

* Pull high-value digital natives and repeat web customers.
* Give them a founder-market moment, market-only item, or early pickup perk.
* Track redemption through a unique QR/discount code.

### 4. Market Operating Dashboard

Run each market like a growth channel:

* Orders, revenue, AOV, and product mix by location.
* Email/SMS opt-ins per market and per staff member.
* Market-to-web conversion rate.
* Ghost activation rate.
* Repeat purchase rate and days to second purchase.

---

## 30/60/90-Day Roadmap

1. **Days 1-14: Instrument the engine.** Fix customer segmentation, configure Klaviyo email/SMS lists and disclosures, create market QR/keyword links, define staff tracking, and build the first dashboard.
2. **Days 15-30: Launch the first campaign set.** Deploy lid stickers, booth signage, market staff scripts, Ghost reactivation, VIP Market Pass, and post-purchase flows.
3. **Days 31-60: Optimize by market.** Compare capture rate, AOV, product mix, and online conversion by location. Move budget, inventory, and staff coaching toward the highest-leverage markets.
4. **Days 61-90: Turn it into a system.** Add forecasting, recurring drops, loyalty/VIP segmentation, and a weekly operating review.

---

## Core KPIs & Targets

* Increase POS email/SMS capture from **8.38%** to **15-20%** during the pilot.
* Convert **10%** of existing Ghosts into online buyers, worth about **$60,900 incremental order-level upside**.
* Capture **1,500-3,000 new market contacts** from anonymous POS demand.
* Shorten market-to-web conversion time from a **156-day median** by adding immediate post-market follow-up.

---

## Tech Stack

* **Analytics:** Python (Pandas), Shopify order exports, future Shopify Reports/API.
* **Marketing:** Klaviyo email + SMS, Shopify Forms/POS customer capture.
* **Tracking:** Unique market/staff QR links, UTM parameters, discount codes, and weekly dashboards.
* **Presentation:** [Visual Pitch Deck](reports/pitch_deck.html)

---

## Casa Crobu Lead/Coupon Landing Page

The standalone Next.js landing page lives in [`lead-coupon-signup`](lead-coupon-signup). See [`lead-coupon-signup/README.md`](lead-coupon-signup/README.md) for local setup, Shopify custom app setup, Make webhook setup, Vercel deployment, and Shopify linking notes.
