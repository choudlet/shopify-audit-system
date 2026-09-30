"use client";

import { FormEvent, useState } from "react";
import { SMS_AUDIENCE_OPTIONS } from "@/lib/sms-campaign";
import styles from "./sms.module.css";

type SendMode = "campaign" | "single";

type FormState = {
  audienceId: string;
  message: string;
  mode: SendMode;
  operator: string;
  password: string;
  phone: string;
};

type ApiResponse = {
  audienceId?: string;
  audienceLabel?: string;
  eligibleCount?: number;
  error?: string;
  failedCount?: number;
  logged?: boolean;
  messageSid?: string;
  ok?: boolean;
  recipientCount?: number;
  sentCount?: number;
};

type AudiencePreview = {
  audienceId: string;
  audienceLabel: string;
  eligibleCount: number;
};

type BusyAction = "audience" | "campaign" | "single" | "test" | null;

const initialState: FormState = {
  audienceId: "all",
  message: "",
  mode: "campaign",
  operator: "",
  password: "",
  phone: "",
};

export default function OperatorSmsPage() {
  const [form, setForm] = useState(initialState);
  const [audiencePreview, setAudiencePreview] = useState<AudiencePreview | null>(null);
  const [busyAction, setBusyAction] = useState<BusyAction>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function updateField<Field extends keyof FormState>(field: Field, value: FormState[Field]) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("");
    setError("");

    if (field === "audienceId" || field === "password") {
      setAudiencePreview(null);
    }
  }

  async function loadAudience() {
    setBusyAction("audience");
    setStatus("");
    setError("");

    try {
      const response = await fetch("/api/operator/sms/audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audienceId: form.audienceId, password: form.password }),
      });
      const body = (await response.json()) as ApiResponse;

      if (
        !response.ok ||
        !body.ok ||
        typeof body.audienceId !== "string" ||
        typeof body.audienceLabel !== "string" ||
        typeof body.eligibleCount !== "number"
      ) {
        throw new Error(body.error || "Could not load this audience.");
      }

      setAudiencePreview({
        audienceId: body.audienceId,
        audienceLabel: body.audienceLabel,
        eligibleCount: body.eligibleCount,
      });
      setStatus("Audience loaded from Shopify.");
    } catch (loadError) {
      setAudiencePreview(null);
      setError(loadError instanceof Error ? loadError.message : "Could not load this audience.");
    } finally {
      setBusyAction(null);
    }
  }

  async function sendTest() {
    setBusyAction("test");
    setStatus("");
    setError("");

    try {
      const response = await fetch("/api/operator/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: form.message,
          operator: form.operator,
          password: form.password,
          phone: form.phone,
          test: true,
        }),
      });
      const body = (await response.json()) as ApiResponse;

      if (!response.ok || !body.ok) {
        throw new Error(body.error || "Could not send the test message.");
      }

      setStatus(body.messageSid ? `Test accepted by Twilio: ${body.messageSid}` : "Test accepted by Twilio.");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send the test message.");
    } finally {
      setBusyAction(null);
    }
  }

  async function sendSingleMessage() {
    setBusyAction("single");
    setStatus("");
    setError("");

    try {
      const response = await fetch("/api/operator/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: form.message,
          operator: form.operator,
          password: form.password,
          phone: form.phone,
        }),
      });
      const body = (await response.json()) as ApiResponse;

      if (!response.ok || !body.ok) {
        throw new Error(body.error || "Could not send the message.");
      }

      setStatus(body.messageSid ? `Accepted by Twilio: ${body.messageSid}` : "Accepted by Twilio.");
      setForm((current) => ({ ...current, message: "", phone: "" }));
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send the message.");
    } finally {
      setBusyAction(null);
    }
  }

  async function sendCampaign() {
    if (!audiencePreview || audiencePreview.audienceId !== form.audienceId) {
      setError("Load this audience from Shopify before sending.");
      return;
    }

    if (audiencePreview.eligibleCount === 0) {
      setError("This audience has no eligible SMS recipients.");
      return;
    }

    const confirmed = window.confirm(
      `Send this message to ${audiencePreview.eligibleCount} people in “${audiencePreview.audienceLabel}”?`,
    );

    if (!confirmed) {
      return;
    }

    setBusyAction("campaign");
    setStatus("");
    setError("");

    try {
      const response = await fetch("/api/operator/sms/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audienceId: form.audienceId,
          confirmed: true,
          expectedRecipientCount: audiencePreview.eligibleCount,
          message: form.message,
          operator: form.operator,
          password: form.password,
        }),
      });
      const body = (await response.json()) as ApiResponse;

      if (!response.ok || !body.ok) {
        if (response.status === 409) {
          setAudiencePreview(null);
        }

        throw new Error(body.error || "Could not send the campaign.");
      }

      const sentCount = body.sentCount || 0;
      const failedCount = body.failedCount || 0;
      const summary = `${sentCount} message${sentCount === 1 ? "" : "s"} accepted by Twilio${
        failedCount ? `; ${failedCount} failed` : ""
      }.`;

      setStatus(summary);
      setForm((current) => ({ ...current, message: "" }));

      const warnings = [];

      if (failedCount > 0) {
        warnings.push("Check Twilio for the failed recipients before deciding whether to retry them.");
      }

      if (body.logged === false) {
        warnings.push("The Google Sheet log failed. Do not resend the full campaign.");
      }

      if (warnings.length > 0) {
        setError(warnings.join(" "));
      }
    } catch (sendError) {
      if (sendError instanceof TypeError) {
        setError("Could not confirm the campaign result. Check Twilio before sending it again.");
      } else {
        setError(sendError instanceof Error ? sendError.message : "Could not send the campaign.");
      }
    } finally {
      setBusyAction(null);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.mode === "single") {
      await sendSingleMessage();
      return;
    }

    await sendCampaign();
  }

  const isBusy = busyAction !== null;

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.heading}>
          <p>Casa Crobu</p>
          <h1>Send SMS</h1>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <label>
            <span>Operator</span>
            <input
              value={form.operator}
              onChange={(event) => updateField("operator", event.target.value)}
              placeholder="Kelly"
              autoComplete="name"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Operator password"
              autoComplete="current-password"
              required
            />
          </label>

          <label>
            <span>Send type</span>
            <select
              value={form.mode}
              onChange={(event) => updateField("mode", event.target.value as SendMode)}
            >
              <option value="campaign">Shopify audience</option>
              <option value="single">One customer</option>
            </select>
          </label>

          {form.mode === "campaign" ? (
            <div className={styles.audienceSection}>
              <label>
                <span>Audience</span>
                <select
                  value={form.audienceId}
                  onChange={(event) => updateField("audienceId", event.target.value)}
                >
                  {SMS_AUDIENCE_OPTIONS.map((audience) => (
                    <option key={audience.id} value={audience.id}>
                      {audience.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={loadAudience}
                disabled={isBusy || !form.password}
              >
                {busyAction === "audience" ? "Loading..." : audiencePreview ? "Refresh audience" : "Load audience"}
              </button>

              {audiencePreview ? (
                <div className={styles.audiencePreview}>
                  <strong>{audiencePreview.eligibleCount}</strong>
                  <span>current SMS subscriber{audiencePreview.eligibleCount === 1 ? "" : "s"}</span>
                  <small>{audiencePreview.audienceLabel}</small>
                </div>
              ) : null}
            </div>
          ) : (
            <label>
              <span>Customer phone</span>
              <input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="(303) 555-1212"
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </label>
          )}

          <label>
            <span>Message</span>
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Hi from Casa Crobu..."
              maxLength={1000}
              required
            />
          </label>

          <div className={styles.meta}>
            <span>{form.message.length}/1000</span>
          </div>

          {form.mode === "campaign" ? (
            <div className={styles.testSection}>
              <label>
                <span>Test phone</span>
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="(303) 555-1212"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={sendTest}
                disabled={isBusy || !form.phone || !form.message || !form.password}
              >
                {busyAction === "test" ? "Sending test..." : "Send test"}
              </button>
            </div>
          ) : null}

          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
          {status ? (
            <p className={styles.status} role="status">
              {status}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={
              isBusy ||
              !form.message ||
              !form.password ||
              (form.mode === "campaign" && !audiencePreview)
            }
          >
            {busyAction === "campaign"
              ? "Sending campaign..."
              : busyAction === "single"
                ? "Sending..."
                : form.mode === "campaign"
                  ? "Review and send campaign"
                  : "Send text"}
          </button>
        </form>
      </section>
    </main>
  );
}
