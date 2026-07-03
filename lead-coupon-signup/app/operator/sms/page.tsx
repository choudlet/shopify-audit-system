"use client";

import { FormEvent, useState } from "react";
import styles from "./sms.module.css";

type SendResponse = {
  ok?: boolean;
  error?: string;
  messageSid?: string;
};

const initialState = {
  operator: "",
  password: "",
  phone: "",
  message: "",
};

export default function OperatorSmsPage() {
  const [form, setForm] = useState(initialState);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function updateField(field: keyof typeof initialState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("");
    setError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus("");
    setError("");

    try {
      const response = await fetch("/api/operator/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = (await response.json()) as SendResponse;

      if (!response.ok || !body.ok) {
        throw new Error(body.error || "Could not send the message.");
      }

      setStatus(body.messageSid ? `Sent. Twilio SID: ${body.messageSid}` : "Sent.");
      setForm((current) => ({ ...current, phone: "", message: "" }));
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send the message.");
    } finally {
      setIsSending(false);
    }
  }

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

          {error ? <p className={styles.error}>{error}</p> : null}
          {status ? <p className={styles.status}>{status}</p> : null}

          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Text"}
          </button>
        </form>
      </section>
    </main>
  );
}
