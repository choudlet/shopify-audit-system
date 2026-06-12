import crypto from "crypto";

const SHOPIFY_SCOPES = "read_customers,write_customers";
const STATE_MAX_AGE_MS = 10 * 60 * 1000;

type TokenResponse = {
  access_token?: string;
  scope?: string;
  error?: string;
  error_description?: string;
};

export function buildInstallUrl(shop: string, appUrl: string) {
  const clientId = process.env.SHOPIFY_CLIENT_ID;

  if (!clientId) {
    throw new Error("SHOPIFY_CLIENT_ID is not configured.");
  }

  const redirectUri = new URL("/api/shopify/callback", appUrl).toString();
  const authorizeUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("scope", SHOPIFY_SCOPES);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", signState(shop));

  return authorizeUrl.toString();
}

export async function exchangeCodeForToken(shop: string, code: string) {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Shopify OAuth environment variables are not configured.");
  }

  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const body = (await response.json()) as TokenResponse;

  if (!response.ok || !body.access_token) {
    throw new Error(body.error_description || body.error || `Shopify token exchange failed with ${response.status}.`);
  }

  return {
    accessToken: body.access_token,
    scope: body.scope || "",
  };
}

export function isValidShopDomain(shop: string | null): shop is string {
  return Boolean(shop && /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(shop));
}

export function verifyShopifyCallback(searchParams: URLSearchParams) {
  const hmac = searchParams.get("hmac");
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!hmac || !clientSecret) {
    return false;
  }

  const message = Array.from(searchParams.entries())
    .filter(([key]) => key !== "hmac" && key !== "signature")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const digest = crypto.createHmac("sha256", clientSecret).update(message).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(hmac, "utf8"));
}

export function verifyState(state: string | null, shop: string) {
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!state || !clientSecret) {
    return false;
  }

  const [encodedPayload, signature] = state.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = crypto.createHmac("sha256", clientSecret).update(encodedPayload).digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(expectedSignature, "utf8"), Buffer.from(signature, "utf8"))) {
    return false;
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
    shop?: string;
    issuedAt?: number;
  };

  return payload.shop === shop && typeof payload.issuedAt === "number" && Date.now() - payload.issuedAt < STATE_MAX_AGE_MS;
}

function signState(shop: string) {
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientSecret) {
    throw new Error("SHOPIFY_CLIENT_SECRET is not configured.");
  }

  const payload = Buffer.from(JSON.stringify({ shop, issuedAt: Date.now() })).toString("base64url");
  const signature = crypto.createHmac("sha256", clientSecret).update(payload).digest("hex");

  return `${payload}.${signature}`;
}
