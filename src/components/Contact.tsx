import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "ymail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com",
  "aol.com", "protonmail.com", "proton.me", "gmx.com", "mail.com",
  "yandex.com", "rediffmail.com", "zoho.com", "qq.com", "163.com",
]);

const DATA_ACCESS_OPTIONS = [
  "Telematics",
  "BMS",
  "CAN",
  "Other",
  "Not storing yet",
] as const;

type FieldErrors = Partial<Record<"name" | "organization" | "role" | "email" | "fleetSize" | "dataAccess", string>>;

const Contact: React.FC = () => {
  const reduce = useReducedMotion();
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const fleetSizeRef = useRef<HTMLSelectElement>(null);
  const dataAccessRef = useRef<HTMLInputElement>(null);
  const fieldRefs = {
    name: nameRef,
    email: emailRef,
    organization: organizationRef,
    role: roleRef,
    fleetSize: fleetSizeRef,
    dataAccess: dataAccessRef,
  };

  const env = (import.meta as ImportMeta).env || {};
  const SHEET_ENDPOINT: string | undefined =
    env.VITE_CONTACT_SHEET_ENDPOINT || env.VITE_PILOT_SHEET_ENDPOINT;
  const FALLBACK_ENDPOINT: string =
    env.VITE_CONTACT_FORM_ENDPOINT || "https://formsubmit.co/ajax/info@zylectra.com";

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (data: FormData): FieldErrors => {
    const next: FieldErrors = {};

    if (!String(data.get("name") || "").trim()) next.name = "Enter your name.";
    if (!String(data.get("organization") || "").trim()) next.organization = "Enter your organization.";
    if (!String(data.get("role") || "").trim()) next.role = "Tell us what best describes you.";
    if (!String(data.get("fleetSize") || "").trim()) next.fleetSize = "Select a fleet or portfolio size.";
    if (data.getAll("dataAccess").length === 0) next.dataAccess = "Select at least one option.";

    const email = String(data.get("email") || "").trim();
    if (!email) {
      next.email = "Enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    } else if (FREE_EMAIL_DOMAINS.has(email.split("@")[1].toLowerCase())) {
      next.email = "Use your work email, not a personal address (Gmail, Yahoo, etc.).";
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fieldErrors = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstInvalid = (["name", "email", "organization", "role", "fleetSize", "dataAccess"] as const).find(
        (f) => fieldErrors[f]
      );
      if (firstInvalid) fieldRefs[firstInvalid].current?.focus();
      return;
    }
    setErrors({});

    const fields = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("organization") || ""),
      role: String(data.get("role") || ""),
      fleetSize: String(data.get("fleetSize") || ""),
      dataAccess: data.getAll("dataAccess").join(", "),
      pain: String(data.get("message") || ""),
      submittedAt: new Date().toISOString(),
      source: "homepage-contact-section",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    const body = new URLSearchParams();
    Object.entries(fields).forEach(([k, v]) => body.set(k, v));

    setFormStatus("sending");

    if (SHEET_ENDPOINT) {
      try {
        await fetch(SHEET_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: body.toString(),
        });
        setFormStatus("sent");
        form.reset();
        return;
      } catch {
        // fall through to email-relay fallback so the message isn't lost
      }
    }

    try {
      body.set("_subject", `Contact form: ${fields.company || fields.name || "New message"}`);
      body.set("_template", "table");
      const res = await fetch(FALLBACK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Accept: "application/json",
        },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`submit_failed_${res.status}`);
      setFormStatus("sent");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl px-4 py-3 text-[15px] text-[var(--text)] bg-[rgba(var(--fg-rgb),0.02)] border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] focus:border-emerald-500/50 focus:bg-[rgba(var(--fg-rgb),0.03)] placeholder:text-[var(--text-faint)] ${
      hasError ? "border-red-400/60 bg-red-500/[0.04]" : "border-[var(--border)]"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-28">
      <div
        className="absolute -top-40 right-0 w-[520px] h-[520px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div {...enter(reduce)} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <h2
              className="font-bold text-[var(--text)] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.12 }}
            >
              Let's talk about <span className="text-emerald-400">your batteries.</span>
            </h2>
            <p
              className="mt-6 text-[var(--text-muted)] leading-relaxed"
              style={{ fontSize: "clamp(14.5px, 1.3vw, 17px)" }}
            >
              Tell us a bit about what you're working on. We read every message
              and reply within two working days.
            </p>

            <p className="mt-10 inline-flex items-center gap-2 text-[13px] text-[var(--text-faint)]">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              or write directly to{" "}
              <a href="mailto:prabhsingh@zylectra.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                prabhsingh@zylectra.com
              </a>
            </p>
          </motion.div>

        <motion.div
          {...enter(reduce, 0.1)}
          className="lg:col-span-7 rounded-3xl p-6 sm:p-10"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {formStatus === "sent" ? (
            <div className="max-w-lg py-6">
              <div className="text-emerald-400 font-semibold text-lg mb-2">
                Message received.
              </div>
              <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">
                Thanks for reaching out. We'll reply within two working days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    ref={nameRef}
                    className={inputClass(errors.name)}
                    name="name"
                    placeholder="Full name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    onChange={() => clearError("name")}
                  />
                  {errors.name ? <p className="mt-1.5 text-[12.5px] text-red-400">{errors.name}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    ref={emailRef}
                    className={inputClass(errors.email)}
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    onChange={() => clearError("email")}
                  />
                  {errors.email ? <p className="mt-1.5 text-[12.5px] text-red-400">{errors.email}</p> : null}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-org" className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                    Organization
                  </label>
                  <input
                    id="contact-org"
                    ref={organizationRef}
                    className={inputClass(errors.organization)}
                    name="organization"
                    placeholder="Company or fleet name"
                    autoComplete="organization"
                    aria-invalid={!!errors.organization}
                    onChange={() => clearError("organization")}
                  />
                  {errors.organization ? <p className="mt-1.5 text-[12.5px] text-red-400">{errors.organization}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-role" className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                    I am...
                  </label>
                  <select
                    id="contact-role"
                    ref={roleRef}
                    className={`${inputClass(errors.role)} appearance-none cursor-pointer`}
                    name="role"
                    defaultValue=""
                    aria-invalid={!!errors.role}
                    onChange={() => clearError("role")}
                  >
                    <option value="" disabled>Select one</option>
                    <option value="Fleet operator">Fleet operator</option>
                    <option value="Vehicle OEM">Vehicle OEM</option>
                    <option value="Battery OEM">Battery OEM</option>
                    <option value="Battery Swapping/BAAS">Battery Swapping / BAAS</option>
                    <option value="Financer/Leaser">Financer / Leaser</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.role ? <p className="mt-1.5 text-[12.5px] text-red-400">{errors.role}</p> : null}
                </div>
              </div>

              <div>
                <label htmlFor="contact-fleet-size" className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                  Fleet / portfolio size
                </label>
                <select
                  id="contact-fleet-size"
                  ref={fleetSizeRef}
                  className={`${inputClass(errors.fleetSize)} appearance-none cursor-pointer`}
                  name="fleetSize"
                  defaultValue=""
                  aria-invalid={!!errors.fleetSize}
                  onChange={() => clearError("fleetSize")}
                >
                  <option value="" disabled>Select a range</option>
                  <option value="<50 packs">Fewer than 50 packs</option>
                  <option value="50-500 packs">50-500 packs</option>
                  <option value="500-5,000 packs">500-5,000 packs</option>
                  <option value="5,000+ packs">5,000+ packs</option>
                </select>
                {errors.fleetSize ? <p className="mt-1.5 text-[12.5px] text-red-400">{errors.fleetSize}</p> : null}
              </div>

              <fieldset>
                <legend className="text-[13px] font-medium text-[var(--text-secondary)] mb-3">
                  What type of data access do you have?{" "}
                  <span className="text-[var(--text-faint)] font-normal">(select all that apply)</span>
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {DATA_ACCESS_OPTIONS.map((option, i) => (
                    <label
                      key={option}
                      className="group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[14px] text-[var(--text-secondary)] cursor-pointer transition-colors duration-200 has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/[0.06] has-[:checked]:text-[var(--text)] hover:border-emerald-500/30"
                      style={{ borderColor: errors.dataAccess ? "#f87171" : "var(--border)" }}
                    >
                      <input
                        ref={i === 0 ? dataAccessRef : undefined}
                        type="checkbox"
                        name="dataAccess"
                        value={option}
                        className="w-4 h-4 rounded accent-emerald-500"
                        onChange={() => clearError("dataAccess")}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {errors.dataAccess ? <p className="mt-1.5 text-[12.5px] text-red-400">{errors.dataAccess}</p> : null}
              </fieldset>

              <div>
                <label htmlFor="contact-message" className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                  Message <span className="text-[var(--text-faint)] font-normal">(optional)</span>
                </label>
                <textarea
                  id="contact-message"
                  className={`${inputClass()} min-h-[110px] resize-y`}
                  name="message"
                  placeholder="What are you working on?"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-2xl bg-emerald-400 px-8 py-3.5 text-black font-bold text-[15px] transition-all duration-300 hover:bg-emerald-300 disabled:opacity-70 disabled:cursor-wait"
              >
                {formStatus === "sending" ? "Sending..." : "Send message"}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              {formStatus === "error" ? (
                <p className="text-[14px] text-[var(--text-muted)]">
                  Something went wrong. Please try again, or email{" "}
                  <a href="mailto:info@zylectra.com" className="text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline">
                    info@zylectra.com
                  </a>
                  .
                </p>
              ) : null}
            </form>
          )}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
