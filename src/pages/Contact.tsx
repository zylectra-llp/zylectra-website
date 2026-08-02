import React, { useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "ymail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com",
  "aol.com", "protonmail.com", "proton.me", "gmx.com", "mail.com",
  "yandex.com", "rediffmail.com", "zoho.com", "qq.com", "163.com",
]);

type FieldErrors = Partial<Record<"name" | "organization" | "role" | "email", string>>;

// ── Inline styles (shared visual language with the rest of the site) ────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --green: #00e87a;
      --green-dim: #00e87a33;
      --green-mid: #00e87a99;
    }

    body { background: var(--bg); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes gridPulse {
      0%, 100% { opacity: 0.03; }
      50%       { opacity: 0.07; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .animate-fadeUp { animation: fadeUp 0.7s ease both; }
    .animate-fadeIn { animation: fadeIn 0.6s ease both; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }

    .grid-bg {
      background-image:
        linear-gradient(rgba(var(--fg-rgb),0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(var(--fg-rgb),0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      animation: gridPulse 6s ease-in-out infinite;
    }

    .green-glow { text-shadow: 0 0 30px var(--green-mid); }

    .shimmer-text {
      background: linear-gradient(90deg, var(--text) 0%, var(--green) 40%, var(--text) 60%, rgba(var(--fg-rgb),0.4) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid var(--green-dim);
      background: rgba(0,232,122,0.06);
      color: var(--green);
      border-radius: 999px;
      padding: 4px 14px;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .pill-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
      animation: pulse-green 2s ease-in-out infinite;
    }
    @keyframes pulse-green {
      0%, 100% { box-shadow: 0 0 0 0 var(--green-dim); }
      50%       { box-shadow: 0 0 0 8px transparent; }
    }

    .cta-btn {
      position: relative;
      overflow: hidden;
      background: var(--green);
      color: #050508;
      font-weight: 700;
      letter-spacing: 0.04em;
      border: none;
      border-radius: 8px;
      padding: 16px 40px;
      cursor: pointer;
      font-size: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
      white-space: nowrap;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 48px rgba(0, 232, 122, 0.4);
    }
    .cta-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent 20%, rgba(var(--fg-rgb),0.25) 50%, transparent 80%);
      transform: translateX(-100%);
      transition: transform 0.5s;
    }
    .cta-btn:hover::after { transform: translateX(100%); }

    .section-label {
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--green);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-label::after {
      content: '';
      flex: 1;
      max-width: 48px;
      height: 1px;
      background: var(--green-mid);
    }

    .form-input, .form-select {
      width: 100%;
      background: rgba(var(--fg-rgb),0.025);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 16px;
      color: var(--text);
      font-size: 14px;
      transition: border-color 0.2s, background 0.2s;
      appearance: none;
    }
    .form-input::placeholder { color: rgba(var(--fg-rgb),0.3); }
    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: var(--green-mid);
      background: rgba(var(--fg-rgb),0.04);
    }
    .form-input.has-error, .form-select.has-error {
      border-color: #f87171;
      background: rgba(248,113,113,0.06);
    }
    .field-error {
      font-size: 12px;
      color: #f87171;
      text-align: left;
      margin-top: -4px;
    }
    .form-textarea { min-height: 110px; resize: vertical; }
    .form-select {
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%2300e87a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      padding-right: 42px;
    }
    .form-select option { background: var(--bg); color: var(--text); }

    .contact-card {
      position: relative;
      overflow: hidden;
    }
    .contact-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--green), transparent);
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      .cta-btn { width: 100%; text-align: center; padding: 16px 24px; }
    }
    @media (max-width: 480px) {
      .contact-section-pad { padding-left: 1.25rem; padding-right: 1.25rem; }
    }
  `}</style>
);

// ── Main Page ─────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fieldRefs = { name: nameRef, organization: organizationRef, role: roleRef, email: emailRef };

  // Same Google Sheet the pilot page wrote to. VITE_CONTACT_SHEET_ENDPOINT can
  // override it later; VITE_PILOT_SHEET_ENDPOINT is the existing deployment.
  const env = (import.meta as ImportMeta).env || {};
  const SHEET_ENDPOINT: string | undefined =
    env.VITE_CONTACT_SHEET_ENDPOINT || env.VITE_PILOT_SHEET_ENDPOINT;
  const FALLBACK_ENDPOINT: string =
    env.VITE_CONTACT_FORM_ENDPOINT || "https://formsubmit.co/ajax/info@zylectra.com";

  const clearError = (field: keyof FieldErrors) => {
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (data: FormData): FieldErrors => {
    const next: FieldErrors = {};

    if (!String(data.get("name") || "").trim()) next.name = "Enter your name.";
    if (!String(data.get("organization") || "").trim()) next.organization = "Enter your organization.";
    if (!String(data.get("role") || "").trim()) next.role = "Tell us what best describes you.";

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
      const firstInvalid = (["name", "organization", "role", "email"] as const).find(f => fieldErrors[f]);
      if (firstInvalid) fieldRefs[firstInvalid].current?.focus();
      return;
    }
    setErrors({});

    const fields = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("organization") || ""),
      role: String(data.get("role") || ""),
      scale: "",
      pain: String(data.get("message") || ""),
      submittedAt: new Date().toISOString(),
      source: "contact-page",
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

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <GlobalStyles />

      {/* ── HERO + FORM ──────────────────────────────────────────────────── */}
      <section
        className="relative px-6 md:px-16 contact-section-pad pt-28 md:pt-32 pb-24 md:pb-28 overflow-hidden"
        aria-labelledby="contact-heading"
      >
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,232,122,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="animate-fadeUp mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Get in touch</span>
          </div>

          <h1
            id="contact-heading"
            className="animate-fadeUp delay-100 mb-5"
            style={{ fontSize: "clamp(1.7rem, 6vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.14 }}
          >
            Let's talk about <span className="shimmer-text">your batteries.</span>
          </h1>

          <p
            className="animate-fadeUp delay-200 mx-auto leading-relaxed mb-12"
            style={{ maxWidth: 520, color: "rgba(var(--fg-rgb),0.6)", fontSize: "clamp(14px, 2vw, 16px)" }}
          >
            Tell us a bit about what you're working on. We read every message and reply within two working days.
          </p>

          {formStatus === "sent" ? (
            <div
              className="animate-fadeUp rounded-2xl p-8 md:p-10 text-left"
              style={{ border: "1px solid var(--green-mid)", background: "rgba(0,232,122,0.05)" }}
            >
              <div className="mb-2" style={{ fontSize: 18, fontWeight: 700, color: "var(--green)" }}>
                Message received.
              </div>
              <p style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.6)" }}>
                Thanks for reaching out. We'll reply within two working days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="animate-fadeUp delay-300 contact-card rounded-2xl p-6 md:p-9 text-left space-y-3"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <input
                    ref={nameRef}
                    className={`form-input${errors.name ? " has-error" : ""}`}
                    name="name"
                    placeholder="Name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    onChange={() => clearError("name")}
                  />
                  {errors.name ? <p className="field-error mt-1.5">{errors.name}</p> : null}
                </div>
                <div>
                  <input
                    ref={organizationRef}
                    className={`form-input${errors.organization ? " has-error" : ""}`}
                    name="organization"
                    placeholder="Organization"
                    autoComplete="organization"
                    aria-invalid={!!errors.organization}
                    onChange={() => clearError("organization")}
                  />
                  {errors.organization ? <p className="field-error mt-1.5">{errors.organization}</p> : null}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <select
                    ref={roleRef}
                    className={`form-select${errors.role ? " has-error" : ""}`}
                    name="role"
                    defaultValue=""
                    aria-label="I am"
                    aria-invalid={!!errors.role}
                    onChange={() => clearError("role")}
                  >
                    <option value="" disabled>I am...</option>
                    <option value="Fleet operator">Fleet operator</option>
                    <option value="Battery OEM">Battery OEM</option>
                    <option value="Battery Swapping/BAAS">Battery Swapping / BAAS</option>
                  </select>
                  {errors.role ? <p className="field-error mt-1.5">{errors.role}</p> : null}
                </div>
                <div>
                  <input
                    ref={emailRef}
                    className={`form-input${errors.email ? " has-error" : ""}`}
                    name="email"
                    type="email"
                    placeholder="Work email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    onChange={() => clearError("email")}
                  />
                  {errors.email ? <p className="field-error mt-1.5">{errors.email}</p> : null}
                </div>
              </div>

              <textarea
                className="form-input form-textarea"
                name="message"
                placeholder="Message (optional)"
              />

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="cta-btn w-full inline-flex items-center justify-center gap-2 mt-2"
                style={formStatus === "sending" ? { opacity: 0.7, cursor: "wait" } : undefined}
              >
                {formStatus === "sending" ? "Sending..." : "Send message"}
                <ArrowRight className="w-4 h-4" />
              </button>

              {formStatus === "error" ? (
                <p className="pt-2 text-sm" style={{ color: "rgba(var(--fg-rgb),0.65)" }}>
                  Something went wrong. Please try again, or email{" "}
                  <a href="mailto:info@zylectra.com" className="text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline">
                    info@zylectra.com
                  </a>
                  .
                </p>
              ) : null}
            </form>
          )}

          <p
            className="mt-8 inline-flex items-center gap-2 justify-center"
            style={{ fontSize: 12, color: "rgba(var(--fg-rgb),0.4)", letterSpacing: "0.06em" }}
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            or write directly to{" "}
            <a href="mailto:prabhsingh@zylectra.com" style={{ color: "var(--green)" }}>prabhsingh@zylectra.com</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
