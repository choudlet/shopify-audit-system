export type LeadPayload = {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  market?: string;
  location?: string;
  source?: string;
  channel?: string;
  campaign?: string;
  message?: string;
  smsOptIn?: boolean;
  emailOptIn?: boolean;
};

export type NormalizedLeadPayload = Required<Pick<LeadPayload, "firstName">> &
  Omit<LeadPayload, "firstName"> & {
    submittedAt: string;
  };

type ValidationFailure = {
  ok: false;
  errors: Partial<Record<keyof LeadPayload | "contact", string>>;
};

type ValidationSuccess = {
  ok: true;
  data: NormalizedLeadPayload;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadPayload(payload: unknown): ValidationFailure | ValidationSuccess {
  const input = isRecord(payload) ? payload : {};
  const firstName = cleanText(input.firstName);
  const lastName = cleanText(input.lastName);
  const email = cleanEmail(input.email);
  const phone = normalizePhone(input.phone);
  const market = cleanText(input.market);
  const location = cleanText(input.location);
  const source = cleanText(input.source);
  const channel = cleanText(input.channel);
  const campaign = cleanText(input.campaign);
  const message = cleanText(input.message, 1000);
  const smsOptIn = input.smsOptIn === true;
  const emailOptIn = input.emailOptIn === true;
  const errors: ValidationFailure["errors"] = {};

  if (!firstName) {
    errors.firstName = "First name is required.";
  }

  if (email && !emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phone && phone.length < 10) {
    errors.phone = "Enter a valid mobile number.";
  }

  if (!email && !phone) {
    errors.contact = "Enter either an email address or a mobile number.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      phone,
      market,
      location,
      source,
      channel,
      campaign,
      message,
      smsOptIn,
      emailOptIn,
      submittedAt: new Date().toISOString(),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function cleanText(value: unknown, maxLength = 120): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function cleanEmail(value: unknown): string {
  return cleanText(value, 254).toLowerCase();
}

function normalizePhone(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const raw = value.trim();
  const digits = raw.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  if (raw.startsWith("+") && digits.length >= 10) {
    return `+${digits}`;
  }

  return digits;
}

export function prefixedTag(prefix: string, value?: string): string | null {
  if (!value) {
    return null;
  }

  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 50);

  return slug ? `${prefix}_${slug}` : null;
}
