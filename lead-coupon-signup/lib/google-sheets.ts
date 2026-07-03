import { createSign } from "crypto";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

export type InboundSmsLog = {
  receivedAt: string;
  fromPhone: string;
  body: string;
  optOutType: string;
  action: string;
  messageSid: string;
  customerFound: boolean | null;
  shopifyCustomerId: string;
  syncStatus: string;
  error: string;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export async function appendInboundSmsLog(log: InboundSmsLog): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SMS_LOG_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SMS_LOG_SHEET_NAME || "Inbound SMS";

  if (!spreadsheetId) {
    return;
  }

  const accessToken = await getGoogleAccessToken();
  const range = `${quoteSheetName(sheetName)}!A:J`;
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range,
    )}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [
            log.receivedAt,
            log.fromPhone,
            log.body,
            log.optOutType,
            log.action,
            log.messageSid,
            log.customerFound === null ? "" : String(log.customerFound),
            log.shopifyCustomerId,
            log.syncStatus,
            log.error,
          ],
        ],
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets append failed: ${response.status} ${errorText}`);
  }
}

async function getGoogleAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets service account env vars are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwt(
    {
      alg: "RS256",
      typ: "JWT",
    },
    {
      iss: clientEmail,
      scope: GOOGLE_SHEETS_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    },
    privateKey,
  );

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const result = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !result.access_token) {
    throw new Error(
      `Google token request failed: ${result.error_description || result.error || response.statusText}`,
    );
  }

  return result.access_token;
}

function signJwt(header: Record<string, unknown>, payload: Record<string, unknown>, privateKey: string): string {
  const unsignedToken = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
}

function base64UrlJson(value: Record<string, unknown>): string {
  return base64Url(Buffer.from(JSON.stringify(value)));
}

function base64Url(value: Buffer): string {
  return value.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function normalizePrivateKey(value: string | undefined): string {
  return value?.replace(/\\n/g, "\n") || "";
}

function quoteSheetName(sheetName: string): string {
  return `'${sheetName.replace(/'/g, "''")}'`;
}
