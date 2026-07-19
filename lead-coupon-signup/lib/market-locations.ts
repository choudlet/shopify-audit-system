export const MARKET_LOCATIONS = [
  "Belleview Station DTC",
  "Boulder Farmers Market",
  "Central Park",
  "City Park",
  "Festival Park",
  "Gluten Free Market",
  "Golden",
  "Harvey Park",
  "Highlands",
  "Lafayette",
  "Longmont Farmer's Market",
  "Louisville",
  "Parker",
  "South Pearl Street Market",
  "Thornton",
  "Westminster",
] as const;

export type MarketLocation = (typeof MARKET_LOCATIONS)[number];

export function isMarketLocation(location: string): location is MarketLocation {
  return MARKET_LOCATIONS.some((marketLocation) => marketLocation === location);
}
