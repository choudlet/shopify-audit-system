import assert from "node:assert/strict";
import test from "node:test";

import { MARKET_LOCATIONS } from "./market-locations.ts";
import { buildSmsAudienceQuery, getSmsAudience, SMS_AUDIENCE_OPTIONS } from "./sms-campaign.ts";

test("campaign audiences cover every configured market location", () => {
  const campaignLocations = SMS_AUDIENCE_OPTIONS.flatMap((audience) =>
    audience.location ? [audience.location] : [],
  );

  assert.deepEqual(campaignLocations, MARKET_LOCATIONS);
});

test("campaign audience ids are unique", () => {
  const ids = SMS_AUDIENCE_OPTIONS.map((audience) => audience.id);

  assert.equal(new Set(ids).size, ids.length);
});

test("every campaign query requires current Shopify SMS consent", () => {
  for (const audience of SMS_AUDIENCE_OPTIONS) {
    assert.match(buildSmsAudienceQuery(audience), /sms_subscription_status = 'SUBSCRIBED'/);
  }
});

test("not-redeemed audience excludes customers with the redemption tag", () => {
  const audience = getSmsAudience("not_redeemed");

  assert.ok(audience);
  assert.match(buildSmsAudienceQuery(audience), /customer_tags NOT CONTAINS 'market5_redeemed'/);
});

test("location audience uses its exact Shopify market tag", () => {
  const audience = getSmsAudience("location:longmont_farmer_s_market");

  assert.ok(audience);
  assert.match(buildSmsAudienceQuery(audience), /market_location_longmont_farmer_s_market/);
});

test("unknown audience is rejected", () => {
  assert.equal(getSmsAudience("location:not_real"), null);
  assert.equal(getSmsAudience(null), null);
});
