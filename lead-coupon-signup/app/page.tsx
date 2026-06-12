"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";
import { validateLeadPayload, type LeadPayload } from "@/lib/validation";

type FieldErrors = Partial<Record<keyof LeadPayload | "contact", string>>;

const initialForm: LeadPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  market: "",
  message: "",
  smsOptIn: false,
  emailOptIn: false,
};

export default function Home() {
  const [form, setForm] = useState<LeadPayload>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const firstName = useMemo(() => form.firstName.trim() || "friend", [form.firstName]);

  function updateField<K extends keyof LeadPayload>(field: K, value: LeadPayload[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, contact: undefined }));
    setSubmitError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateLeadPayload(form);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !body.ok) {
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.ribbon}>Catch us at the market - 5% off your next $20+ order</div>

      <header className={styles.header}>
        <a className={styles.brand} href="https://casacrobu.com" aria-label="Casa Crobu home">
          <img
            className={styles.logoImage}
            src="https://casacrobu.com/cdn/shop/files/websitelogotransparent_e3945784-8899-4a2b-9751-c1b9ea06206a_360x.gif?v=1614774856"
            alt=""
          />
          <span>Casa Crobu</span>
        </a>
        <a className={styles.siteLink} href="https://casacrobu.com">
          casacrobu.com <span aria-hidden="true">-&gt;</span>
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <div className={styles.pill}>
            <span aria-hidden="true">◇</span> Market list - welcome offer
          </div>
          <h1>
            Join the market list. <span>Get 5% off.</span>
          </h1>
          <p className={styles.intro}>
            Join the Casa Crobu Market Club to hear where we will be each week and unlock{" "}
            <strong>5% off any market order over $20.</strong> Lasagna, eggplant parmigiana, Sardinian
            specialties, and seasonal specialties straight from our casa to yours.
          </p>
          <ul className={styles.benefits}>
            <li>
              <span aria-hidden="true">⌖</span> Weekly market locations
            </li>
            <li>
              <span aria-hidden="true">▣</span> Seasonal specials and preorder notes
            </li>
            <li>
              <span aria-hidden="true">✓</span> Your 5% off code by email or text
            </li>
          </ul>
        </div>

        <div className={styles.formPanel}>
          {submitted ? (
            <div className={styles.success} role="status">
              <p className={styles.kicker}>You are on the list</p>
              <h2>Grazie, {firstName}.</h2>
              <p>
                We received your signup and will send the code to the contact info you provided. See
                you at the market.
              </p>
              <button className={styles.secondaryButton} type="button" onClick={() => setSubmitted(false)}>
                Add another signup
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.formHeading}>
                <p className={styles.kicker}>Market list</p>
                <h2>Claim your 5% off</h2>
                <p>Sign up below and we will send your code.</p>
              </div>

              <div className={styles.fieldGrid}>
                <label>
                  <span>First name</span>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={(event) => updateField("firstName", event.target.value)}
                    placeholder="Maria"
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  {errors.firstName ? <small>{errors.firstName}</small> : null}
                </label>

                <label>
                  <span>Last name</span>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={(event) => updateField("lastName", event.target.value)}
                    placeholder="Rossi"
                    autoComplete="family-name"
                  />
                </label>
              </div>

              <label>
                <span>Email</span>
                <input
                  name="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email || errors.contact)}
                />
                {errors.email ? <small>{errors.email}</small> : null}
              </label>

              <label>
                <span>Mobile number</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(errors.phone || errors.contact)}
                />
                {errors.phone ? <small>{errors.phone}</small> : null}
              </label>

              {errors.contact ? <p className={styles.inlineError}>{errors.contact}</p> : null}

              <label>
                <span>Market or location</span>
                <input
                  name="market"
                  value={form.market}
                  onChange={(event) => updateField("market", event.target.value)}
                  placeholder="South Pearl Street"
                  autoComplete="off"
                />
              </label>

              <label>
                <span>Notes</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Favorite dish, pickup note, or question"
                  rows={3}
                />
              </label>

              <div className={styles.checks}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.smsOptIn}
                    onChange={(event) => updateField("smsOptIn", event.target.checked)}
                  />
                  <span>
                    Text me my 5% off code and occasional Casa Crobu market updates. By checking
                    this box, I agree to receive recurring automated marketing text messages from
                    Casa Crobu. Consent is not a condition of purchase. Msg & data rates may apply.
                    Reply STOP to unsubscribe and HELP for help.
                  </span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={form.emailOptIn}
                    onChange={(event) => updateField("emailOptIn", event.target.checked)}
                  />
                  <span>Email me my 5% off code, weekly market locations, and occasional Casa Crobu updates.</span>
                </label>
              </div>

              {submitError ? <p className={styles.submitError}>{submitError}</p> : null}

              <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Join the market list"}
              </button>

              <p className={styles.finePrint}>
                Offer valid on one market order of $20 or more. One use per customer. Casa Crobu
                will not sell or share your information.
              </p>
            </form>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        © 2026 Casa Crobu · Authentic Italian, home delivered ·{" "}
        <a href="https://casacrobu.com">casacrobu.com</a>
      </footer>
    </main>
  );
}
