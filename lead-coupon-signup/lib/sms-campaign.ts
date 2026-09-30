export type SmsAudienceOption = {
  id: string;
  label: string;
  location: string | null;
  locationTag: string | null;
  redemption: "any" | "not_redeemed";
};

export const SMS_AUDIENCE_OPTIONS = [
  {
    id: "all",
    label: "All Market Club SMS subscribers",
    location: null,
    locationTag: null,
    redemption: "any",
  },
  {
    id: "not_redeemed",
    label: "MARKET5 not redeemed",
    location: null,
    locationTag: null,
    redemption: "not_redeemed",
  },
  {
    id: "location:belleview_station_dtc",
    label: "Belleview Station DTC",
    location: "Belleview Station DTC",
    locationTag: "market_location_belleview_station_dtc",
    redemption: "any",
  },
  {
    id: "location:boulder_farmers_market",
    label: "Boulder Farmers Market",
    location: "Boulder Farmers Market",
    locationTag: "market_location_boulder_farmers_market",
    redemption: "any",
  },
  {
    id: "location:central_park",
    label: "Central Park",
    location: "Central Park",
    locationTag: "market_location_central_park",
    redemption: "any",
  },
  {
    id: "location:city_park",
    label: "City Park",
    location: "City Park",
    locationTag: "market_location_city_park",
    redemption: "any",
  },
  {
    id: "location:festival_park",
    label: "Festival Park",
    location: "Festival Park",
    locationTag: "market_location_festival_park",
    redemption: "any",
  },
  {
    id: "location:gluten_free_market",
    label: "Gluten Free Market",
    location: "Gluten Free Market",
    locationTag: "market_location_gluten_free_market",
    redemption: "any",
  },
  {
    id: "location:golden",
    label: "Golden",
    location: "Golden",
    locationTag: "market_location_golden",
    redemption: "any",
  },
  {
    id: "location:harvey_park",
    label: "Harvey Park",
    location: "Harvey Park",
    locationTag: "market_location_harvey_park",
    redemption: "any",
  },
  {
    id: "location:highlands",
    label: "Highlands",
    location: "Highlands",
    locationTag: "market_location_highlands",
    redemption: "any",
  },
  {
    id: "location:lafayette",
    label: "Lafayette",
    location: "Lafayette",
    locationTag: "market_location_lafayette",
    redemption: "any",
  },
  {
    id: "location:longmont_farmer_s_market",
    label: "Longmont Farmer's Market",
    location: "Longmont Farmer's Market",
    locationTag: "market_location_longmont_farmer_s_market",
    redemption: "any",
  },
  {
    id: "location:louisville",
    label: "Louisville",
    location: "Louisville",
    locationTag: "market_location_louisville",
    redemption: "any",
  },
  {
    id: "location:parker",
    label: "Parker",
    location: "Parker",
    locationTag: "market_location_parker",
    redemption: "any",
  },
  {
    id: "location:south_pearl_street_market",
    label: "South Pearl Street Market",
    location: "South Pearl Street Market",
    locationTag: "market_location_south_pearl_street_market",
    redemption: "any",
  },
  {
    id: "location:thornton",
    label: "Thornton",
    location: "Thornton",
    locationTag: "market_location_thornton",
    redemption: "any",
  },
  {
    id: "location:westminster",
    label: "Westminster",
    location: "Westminster",
    locationTag: "market_location_westminster",
    redemption: "any",
  },
] as const satisfies readonly SmsAudienceOption[];

export function getSmsAudience(value: unknown): SmsAudienceOption | null {
  if (typeof value !== "string") {
    return null;
  }

  return SMS_AUDIENCE_OPTIONS.find((audience) => audience.id === value) || null;
}

export function buildSmsAudienceQuery(audience: SmsAudienceOption): string {
  const conditions = [
    "customer_tags CONTAINS 'market_club'",
    "sms_subscription_status = 'SUBSCRIBED'",
  ];

  if (audience.locationTag) {
    conditions.push(`customer_tags CONTAINS '${audience.locationTag}'`);
  }

  if (audience.redemption === "not_redeemed") {
    conditions.push("customer_tags NOT CONTAINS 'market5_redeemed'");
  }

  return conditions.join(" AND ");
}
