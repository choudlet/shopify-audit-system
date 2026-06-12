# Casa Crobu Kelly Update Draft

Hi Kelly,

This week I’m focusing on turning the discovery work into a concrete first-pass prototype of the market capture system so we can confirm the right setup before I move into the full build.

Right now I’m focusing on:

* the `Market Club` signup flow
* the landing page / QR experience for market traffic
* how email and SMS consent should be captured
* how source tracking should work by market
* how the welcome flow should branch based on consent and email vs. SMS preference

So far, a few important findings are:

* Casa Crobu is on a standard Shopify storefront, which is good news for the build
* the current reachable subscriber audience is mostly email-based, while the existing SMS-consented audience is still small
* Shopify Email / Messaging is already being actively used for campaigns, so part of this discovery work is understanding what is already working well there versus what the new market capture system still needs to solve
* Klaviyo looks like the cleaner fit for the full email + SMS capture system, but the monthly software cost is a real consideration
* the current Google & YouTube connection is tied to `ciao@casacrobu.com`, and that account appears to need verification before any Google-side access or reconnection work is done

One question I still want to clarify is what feels like it is and is not working in the current Shopify Email setup, so I can separate “keep what is already working” from “build the missing layer.”

At a very rough software-cost level:

* Shopify native email is much cheaper at Casa Crobu's current size, because the first `10,000` emails per month are included and U.S. SMS is charged per message
* the Klaviyo recommendation currently being shown in setup is about `$70/month` for email or about `$85/month` for email + mobile

So part of this decision is not just feature set, but how much additional structure and flexibility is worth the extra recurring software cost.

Access / verification I may still need:

* I need access to your Google Analytics Instance to ensure data is flowing correctly into that system. I think this is set up and managed by Shopify. I need help with the following:
    * 

My goal for this week is to get the first-pass prototype and data-flow structure clear enough that I can show you exactly how the signup, tracking, and follow-up system will work before I move into the main build.

Thanks,

Christopher
