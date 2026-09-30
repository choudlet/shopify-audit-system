import assert from "node:assert/strict";
import test from "node:test";

import { authenticateOperatorSms, cleanOperatorSmsText } from "./operator-sms.ts";

test("operator authentication reports missing configuration", () => {
  assert.deepEqual(authenticateOperatorSms("secret", ""), {
    ok: false,
    status: 503,
    error: "Operator SMS is not configured.",
  });
});

test("operator authentication rejects the wrong password", () => {
  assert.deepEqual(authenticateOperatorSms("wrong", "secret"), {
    ok: false,
    status: 401,
    error: "Invalid operator password.",
  });
});

test("operator authentication accepts the configured password", () => {
  assert.deepEqual(authenticateOperatorSms("secret", "secret"), { ok: true });
});

test("operator text cleaning preserves the existing route behavior", () => {
  assert.equal(cleanOperatorSmsText("  Market\n  update  ", 80), "Market update");
  assert.equal(cleanOperatorSmsText("123456", 4), "1234");
  assert.equal(cleanOperatorSmsText(null, 80), "");
});
