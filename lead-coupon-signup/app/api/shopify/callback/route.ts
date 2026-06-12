import { NextResponse } from "next/server";
import {
  exchangeCodeForToken,
  isValidShopDomain,
  verifyShopifyCallback,
  verifyState,
} from "@/lib/shopify-oauth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!isValidShopDomain(shop) || !code) {
    return html("Invalid Shopify callback", "The callback is missing a valid shop or authorization code.", 400);
  }

  if (!verifyShopifyCallback(url.searchParams) || !verifyState(state, shop)) {
    return html("Invalid Shopify callback", "Shopify callback verification failed.", 400);
  }

  try {
    const token = await exchangeCodeForToken(shop, code);

    return html(
      "Shopify token created",
      `
        <p>Copy this token into Vercel as <strong>SHOPIFY_ADMIN_ACCESS_TOKEN</strong>. You will only use this page during setup.</p>
        <label>SHOPIFY_SHOP_DOMAIN</label>
        <pre>${escapeHtml(shop)}</pre>
        <label>SHOPIFY_ADMIN_ACCESS_TOKEN</label>
        <pre>${escapeHtml(token.accessToken)}</pre>
        <label>Granted scopes</label>
        <pre>${escapeHtml(token.scope)}</pre>
      `,
    );
  } catch (error) {
    return html(
      "Token exchange failed",
      error instanceof Error ? escapeHtml(error.message) : "Shopify did not return an access token.",
      502,
    );
  }
}

function html(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <style>
          body {
            max-width: 760px;
            margin: 0 auto;
            padding: 48px 20px;
            background: #f8f1e2;
            color: #1d1210;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.5;
          }
          h1 { font-family: Georgia, "Times New Roman", serif; font-size: 36px; }
          label { display: block; margin-top: 22px; font-weight: 800; }
          pre {
            overflow: auto;
            padding: 14px;
            border: 1px solid #dfcfb5;
            border-radius: 10px;
            background: #fffaf3;
            white-space: pre-wrap;
            word-break: break-word;
          }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        ${body}
      </body>
    </html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
