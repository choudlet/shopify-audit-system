import { NextResponse } from "next/server";
import { buildInstallUrl, isValidShopDomain } from "@/lib/shopify-oauth";

export const runtime = "nodejs";

export function GET(request: Request) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const appUrl = process.env.SHOPIFY_APP_URL || url.origin;

  if (!isValidShopDomain(shop)) {
    return NextResponse.json(
      { ok: false, error: "Add ?shop=your-store.myshopify.com to start Shopify install." },
      { status: 400 },
    );
  }

  return NextResponse.redirect(buildInstallUrl(shop, appUrl));
}
