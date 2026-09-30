export type OperatorSmsAuthentication =
  | { ok: true }
  | { ok: false; status: 401 | 503; error: string };

export function authenticateOperatorSms(
  password: unknown,
  configuredPassword = process.env.OPERATOR_SMS_PASSWORD,
): OperatorSmsAuthentication {
  if (!configuredPassword) {
    return { ok: false, status: 503, error: "Operator SMS is not configured." };
  }

  if (typeof password !== "string" || password !== configuredPassword) {
    return { ok: false, status: 401, error: "Invalid operator password." };
  }

  return { ok: true };
}

export function cleanOperatorSmsText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}
