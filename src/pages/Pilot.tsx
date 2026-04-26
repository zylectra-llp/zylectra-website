import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

// ── Inline styles ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --green: #00e87a;
      --green-dim: #00e87a33;
      --green-mid: #00e87a99;
      --bg: #050508;
      --surface: #0c0c11;
      --border: rgba(255,255,255,0.07);
    }

    body { background: var(--bg); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scanline {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(400%); }
    }
    @keyframes pulse-green {
      0%, 100% { box-shadow: 0 0 0 0 var(--green-dim); }
      50%       { box-shadow: 0 0 0 8px transparent; }
    }
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes gridPulse {
      0%, 100% { opacity: 0.03; }
      50%       { opacity: 0.07; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .font-syne    { font-family: 'Syne', sans-serif; }
    .font-mono-jb { font-family: 'JetBrains Mono', monospace; }

    .animate-fadeUp { animation: fadeUp 0.7s ease both; }
    .animate-fadeIn { animation: fadeIn 0.6s ease both; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }

    .grid-bg {
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      animation: gridPulse 6s ease-in-out infinite;
    }

    .green-glow { text-shadow: 0 0 30px var(--green-mid); }

    .card-hover {
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      border-color: var(--green-mid) !important;
      box-shadow: 0 16px 48px rgba(0, 232, 122, 0.08);
    }

    .shimmer-text {
      background: linear-gradient(90deg, #fff 0%, var(--green) 40%, #fff 60%, rgba(255,255,255,0.4) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .ticker-wrap { overflow: hidden; }
    .ticker-inner {
      display: flex;
      white-space: nowrap;
      animation: ticker 32s linear infinite;
    }

    .step-card {
      position: relative;
      overflow: hidden;
    }
    .step-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--green), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .step-card:hover::before { opacity: 1; }

    .scanline-container { position: relative; overflow: hidden; }
    .scanline {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 40%;
      background: linear-gradient(to bottom, transparent, rgba(0,232,122,0.04), transparent);
      animation: scanline 3s ease-in-out infinite;
      pointer-events: none;
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
      font-family: 'JetBrains Mono', monospace;
    }
    .pill-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
      animation: pulse-green 2s ease-in-out infinite;
    }

    .cta-btn {
      position: relative;
      overflow: hidden;
      background: var(--green);
      color: #050508;
      font-family: 'Syne', sans-serif;
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
      background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%);
      transform: translateX(-100%);
      transition: transform 0.5s;
    }
    .cta-btn:hover::after { transform: translateX(100%); }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
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

    .form-input {
      width: 100%;
      background: rgba(255,255,255,0.025);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 16px;
      color: #fff;
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      transition: border-color 0.2s, background 0.2s;
    }
    .form-input::placeholder { color: rgba(255,255,255,0.3); }
    .form-input:focus {
      outline: none;
      border-color: var(--green-mid);
      background: rgba(255,255,255,0.04);
    }
    .form-textarea { min-height: 110px; resize: vertical; }

    @media (max-width: 768px) {
      .cta-btn {
        width: 100%;
        text-align: center;
        padding: 16px 24px;
      }
      .pilot-hero-btns {
        flex-direction: column;
        align-items: stretch;
      }
      .pilot-hero-btns a,
      .pilot-hero-btns button {
        width: 100%;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .pilot-section-pad {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
      }
    }
  `}</style>
);

// ── Animated counter ──────────────────────────────────────────────────────────
const Counter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({
  end, suffix = "", duration = 1800,
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ── Ticker ────────────────────────────────────────────────────────────────────
const tickerItems = [
  "Cell-level RUL",
  "Mechanism attribution",
  "SEI growth",
  "Lithium plating",
  "Loss of active material",
  "Loss of lithium inventory",
  "Audit trail",
  "Warranty defense",
  "Six-week pilot",
  "No new hardware",
];

const Ticker = () => (
  <div className="ticker-wrap py-3 border-y" style={{ borderColor: "var(--border)" }}>
    <div className="ticker-inner font-mono-jb" style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: "0.12em" }}>
      {[...tickerItems, ...tickerItems].map((t, i) => (
        <span key={i} className="mx-8">
          <span style={{ color: "var(--green)", marginRight: 8 }}>◆</span>{t.toUpperCase()}
        </span>
      ))}
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const Pilot: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Two endpoints, in order of preference:
  // 1. VITE_PILOT_SHEET_ENDPOINT  → Google Apps Script Web App URL
  //    (appends a row to your Google Sheet — see SETUP block at bottom of this file)
  // 2. VITE_PILOT_FORM_ENDPOINT   → email-relay fallback (FormSubmit by default)
  //    used only when the Sheets URL isn't set, so submissions don't get lost.
  const env = (import.meta as ImportMeta).env || {};
  const SHEET_ENDPOINT: string | undefined = env.VITE_PILOT_SHEET_ENDPOINT;
  const FALLBACK_ENDPOINT: string =
    env.VITE_PILOT_FORM_ENDPOINT || "https://formsubmit.co/ajax/info@zylectra.com";

  const timelineSteps = [
    {
      week: "Weeks 1–2",
      phase: "Setup and ingestion",
      tasks: [
        "NDA signed. Mutual, two pages. We send the template; you redline; both parties sign in a day.",
        "Data formats agreed. Whatever your BMS logs today, in whatever schema. Async sampling and gaps are fine.",
        "Telemetry transferred. On-prem enclave or cloud VPC, your call. Encrypted in transit and at rest.",
        "Slice confirmed large enough to validate against. Gaps flagged before they cost you time later.",
      ],
      deliverable: "Ingestion confirmed · scope sign-off",
      color: "#3b82f6",
      icon: "01",
    },
    {
      week: "Weeks 3–4",
      phase: "Co-training and first results",
      tasks: [
        "Our physics AI model tuned to your operating envelope; chemistry, duty cycle, ambient profile.",
        "First-look at cell-level RUL predictions and mechanism attribution per pack.",
        "Working session: walk through the most surprising results. Surprising results are usually the most valuable.",
        "Second-opinion review of the worst-performing 5% of cells, with written hypothesis on cause.",
      ],
      deliverable: "Read-only dashboard · surprising-cells writeup",
      color: "#8b5cf6",
      icon: "02",
    },
    {
      week: "Weeks 5–6",
      phase: "Validation and handover",
      tasks: [
        "Ground-truth comparison runs against your degradation events, capacity tests, and warranty returns.",
        "Confidence intervals nailed down. Numbers your CTO and board can defend.",
        "Integration spec your engineering team can use to wire the model into your existing data pipeline.",
        "Go or no-go decision, on both sides, by end of week six.",
      ],
      deliverable: "Validation report · integration spec · go / no-go",
      color: "#00e87a",
      icon: "03",
    },
    {
      week: "Week 7+",
      phase: "Optional · commercial engagement",
      tasks: [
        "Production deployment on live telemetry, model retraining on a rolling window.",
        "Audit trail layer activated for warranty defense and regulator-readiness.",
        "Cell-level dashboards for engineering, fleet-level for ops, risk-tier for finance.",
        "If either side wants to walk after the pilot, we walk clean. No clawback.",
      ],
      deliverable: "Commercial proposal · production rollout plan",
      color: "#facc15",
      icon: "04",
    },
  ];

  const metrics = [
    { value: 6, suffix: "wk", label: "Pilot length", sub: "From NDA to go / no-go" },
    { value: 4, suffix: "",   label: "Spots open", sub: "2026 design partner cohort" },
    { value: 96, suffix: "%", label: "LAM attribution", sub: "Validated on NASA cycling data" },
    { value: 0, suffix: "",   label: "New sensors", sub: "Telemetry you already collect" },
  ];

  const deliverables = [
    {
      icon: "📊",
      title: "A working dashboard",
      desc: "Cell-level RUL, mechanism attribution, and recommended actions for every pack you sent us telemetry on. Engineer view, fleet view, risk-tier view.",
    },
    {
      icon: "📝",
      title: "A validation report",
      desc: "Our predictions compared against ground-truth degradation in your fleet, with confidence intervals you can defend to a CTO or a board.",
    },
    {
      icon: "🔌",
      title: "An integration spec",
      desc: "Production-ready API specs (REST / MQTT / gRPC) your engineering team can use to wire the model into your existing BMS data pipeline.",
    },
    {
      icon: "🔍",
      title: "A second-opinion review",
      desc: "Of the worst-performing five percent of cells in the data, with a written hypothesis on why they're failing and what would buy them back.",
    },
    {
      icon: "🤝",
      title: "A go or no-go decision",
      desc: "On both sides, by week six. We don't sell licenses on hope. If the predictions don't hold up, we say so.",
    },
    {
      icon: "📜",
      title: "Audit-ready paper trail",
      desc: "Every prediction, every recommendation, every action logged. The kind of evidence chain that shortens warranty disputes and survives a regulatory audit.",
    },
  ];

  const dataNeeds = [
    {
      label: "Telemetry slice",
      req: "Voltage, current, temperature, timestamps from ≥ 50 packs over ≥ 6 months",
      note: "Async sampling is fine. Gaps are fine. We've handled worse.",
    },
    {
      label: "Ground-truth (any)",
      req: "Capacity tests, range degradation, swap counts, returned packs, warranty claims",
      note: "None of this is dealbreaker-missing. Each piece tightens the answer.",
    },
    {
      label: "One technical owner",
      req: "Roughly 4 hours / week of someone who knows your data",
      note: "Answers data-format questions, signs off on the validation report.",
    },
    {
      label: "A signed NDA",
      req: "Standard. Mutual. Two pages.",
      note: "We send the template. You redline. We sign in a day.",
    },
  ];

  const qualification = [
    "You operate, finance, manufacture, or insure lithium-ion batteries at scale. Five hundred packs and up.",
    "You have BMS telemetry already being logged, and you can share at least six months of it under NDA.",
    "Battery-related downtime, warranty exposure, or residual value risk is showing up on a P&L you care about.",
    "You have a technical lead who can own the engagement on your side for six weeks.",
    "You're willing to commit to a six-week timeline before a commercial conversation.",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fields = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      role: String(data.get("role") || ""),
      scale: String(data.get("scale") || ""),
      pain: String(data.get("pain") || ""),
      submittedAt: new Date().toISOString(),
      source: "pilot-page",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    // Build a URL-encoded body. urlencoded avoids a CORS preflight, which is what
    // lets us POST cross-origin to a Google Apps Script Web App without the script
    // having to send CORS headers.
    const body = new URLSearchParams();
    Object.entries(fields).forEach(([k, v]) => body.set(k, v));

    setFormStatus("sending");

    // Path 1 — Google Sheets via Apps Script Web App.
    // Apps Script doesn't return CORS headers, so we use mode: 'no-cors'. The
    // response is opaque (status 0) but the doPost runs and the row is appended.
    // We treat absence-of-network-error as success.
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
        // fall through to email-relay fallback so the application isn't lost
      }
    }

    // Path 2 — email relay fallback (FormSubmit by default). Used when the Sheets
    // endpoint isn't configured or the Sheets POST threw a network error.
    try {
      body.set("_subject", `Pilot application: ${fields.company || "New applicant"}`);
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

  /* ─────────────────────────────────────────────────────────────────────────
     SETUP — Google Sheet + Apps Script Web App
     ─────────────────────────────────────────────────────────────────────────
     1. Create a new Google Sheet. Add this header row in row 1:
          Submitted At | Name | Work email | Company | Role | Pack scale | Pain | Source | User agent

     2. Extensions → Apps Script. Replace the file contents with:

          function doPost(e) {
            const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
            const p = e.parameter || {};
            sheet.appendRow([
              p.submittedAt || new Date().toISOString(),
              p.name || '',
              p.email || '',
              p.company || '',
              p.role || '',
              p.scale || '',
              p.pain || '',
              p.source || '',
              p.userAgent || '',
            ]);
            return ContentService
              .createTextOutput(JSON.stringify({ ok: true }))
              .setMimeType(ContentService.MimeType.JSON);
          }

     3. Deploy → New deployment → Type: Web app
          Execute as:    Me (your Google account)
          Who has access: Anyone
        Click Deploy. Authorise. Copy the Web App URL (ends in /exec).

     4. In the project root, create or edit `.env.local`:
          VITE_PILOT_SHEET_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec

     5. Restart `npm run dev` so Vite picks up the new env var.

     6. Test the form. A new row should appear in the Sheet within a second.

     Notes:
       • If you ever change the Apps Script, redeploy as a NEW version
         (or rebind the existing deployment) — the URL changes per version.
       • The fallback FormSubmit endpoint also keeps working, so you'll
         never lose a submission if the Sheet endpoint goes down.
     ───────────────────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen font-syne" style={{ background: "var(--bg)", color: "#fff" }}>
      <GlobalStyles />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative px-6 md:px-16 pilot-section-pad pt-28 md:pt-32 pb-24 md:pb-28 overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="pilot-hero-heading"
      >
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,232,122,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="animate-fadeUp mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Pilot programme · 2026 cohort</span>
          </div>

          <h1
            id="pilot-hero-heading"
            className="animate-fadeUp delay-100 font-syne mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.12 }}
          >
            <span style={{ display: "block" }}>Six weeks. Your telemetry.</span>
            <span className="shimmer-text" style={{ display: "block", lineHeight: 1.12 }}>
              Cell-level answers.
            </span>
          </h1>

          <p
            className="animate-fadeUp delay-200 mx-auto leading-relaxed mb-10"
            style={{ maxWidth: 640, color: "rgba(255,255,255,0.6)", fontSize: "clamp(14px, 2vw, 16px)" }}
          >
            A structured engagement where we co-validate the model on your fleet, hand you a working dashboard,
            and give you the kind of cell-level diagnosis your BMS vendor can't. By the end of week six, you know
            whether this is worth a commercial contract. So do we.
          </p>

          <div className="animate-fadeUp delay-300 pilot-hero-btns flex flex-wrap justify-center gap-4">
            <a href="#apply" aria-label="Apply for the Zylectra pilot">
              <button type="button" className="cta-btn inline-flex items-center justify-center gap-2">
                Apply for the pilot
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </a>
            <a
              href="#timeline"
              aria-label="See how the six weeks run"
              className="font-syne rounded-lg px-8 py-4 transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 600,
                background: "transparent",
                cursor: "pointer",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--green-mid)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            >
              See how the six weeks run
            </a>
          </div>

          <p className="mt-8 font-mono-jb" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
            CURRENTLY ACCEPTING FOUR DESIGN PARTNERS · WE RESPOND WITHIN TWO WORKING DAYS
          </p>
        </div>
      </section>

      <Ticker />

      {/* ── METRICS ───────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-label="Pilot at a glance"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Pilot, at a glance</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="text-center"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  borderRadius: 16,
                  padding: "28px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="font-syne green-glow"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "var(--green)", whiteSpace: "nowrap", marginBottom: 8 }}
                >
                  <Counter end={m.value} suffix={m.suffix} />
                </div>
                <div className="font-syne" style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>
                  {m.label}
                </div>
                <div className="font-mono-jb" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="deliverables-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Deliverables</div>
          <h2
            id="deliverables-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            What you have at the end of week six
          </h2>
          <p className="mb-10 md:mb-12" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", maxWidth: 600 }}>
            Each one is a thing you can show your boss. The fifth is the strongest: it makes the offer mutual,
            and protects you from a vendor who won't let you say no.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="card-hover step-card rounded-2xl p-5 md:p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-syne mb-2" style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA ASK ──────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="data-need-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">What we need from you</div>
          <h2
            id="data-need-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            A pilot is only as good as the data we get to read.
          </h2>
          <p className="mb-10" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", maxWidth: 600 }}>
            The honest version of the ask. No surprise invoices. No hidden integration weeks.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {dataNeeds.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 md:p-6 card-hover"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="font-mono-jb mb-3 text-xs" style={{ color: "var(--green)", letterSpacing: "0.1em" }}>
                  {r.label}
                </div>
                <div className="font-syne mb-2" style={{ fontSize: 15, fontWeight: 600 }}>{r.req}</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────────── */}
      <section
        id="timeline"
        className="px-6 md:px-16 pilot-section-pad py-20 md:py-24 relative overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="timeline-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,232,122,0.04) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="section-label">The six weeks</div>
          <h2
            id="timeline-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Week by week, in plain language
          </h2>
          <p className="mb-10 md:mb-12" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", maxWidth: 600 }}>
            The shape, not the daily plan. Click any phase to see what we're doing inside it.
          </p>

          <div className="space-y-4">
            {timelineSteps.map((step, i) => (
              <div
                key={i}
                className="step-card rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  border: `1px solid ${activeStep === i ? step.color + "66" : "var(--border)"}`,
                  background: activeStep === i ? `${step.color}0a` : "var(--surface)",
                  boxShadow: activeStep === i ? `0 0 32px ${step.color}14` : "none",
                }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                role="button"
                aria-expanded={activeStep === i}
                aria-label={`${step.week}: ${step.phase}`}
              >
                <div className="flex items-center gap-3 md:gap-5 p-5 md:p-6">
                  <div
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-mono-jb transition-all duration-300"
                    style={{
                      border: `1px solid ${activeStep === i ? step.color + "66" : "rgba(255,255,255,0.08)"}`,
                      background: activeStep === i ? `${step.color}18` : "transparent",
                      color: activeStep === i ? step.color : "rgba(255,255,255,0.3)",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {step.icon}
                  </div>

                  <div
                    className="flex-shrink-0 font-mono-jb text-xs px-2.5 py-1 rounded-full hidden sm:block"
                    style={{
                      border: `1px solid ${step.color}44`,
                      background: `${step.color}10`,
                      color: step.color,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {step.week}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className="font-mono-jb text-xs mb-0.5 sm:hidden"
                      style={{ color: step.color, letterSpacing: "0.08em" }}
                    >
                      {step.week}
                    </div>
                    <h3 className="font-syne truncate" style={{ fontSize: "clamp(13px, 2vw, 16px)", fontWeight: 600 }}>
                      {step.phase}
                    </h3>
                    <p className="font-mono-jb mt-0.5 truncate" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      Out: {step.deliverable}
                    </p>
                  </div>

                  <div
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{
                      transform: activeStep === i ? "rotate(180deg)" : "rotate(0deg)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                    aria-hidden="true"
                  >
                    ↓
                  </div>
                </div>

                {activeStep === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 animate-fadeIn">
                    <div className="pt-4" style={{ borderTop: `1px solid ${step.color}22` }}>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {step.tasks.map((task, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-3 rounded-xl p-3 md:p-4"
                            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}
                          >
                            <div
                              className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                              style={{ background: step.color }}
                              aria-hidden="true"
                            />
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{task}</p>
                          </div>
                        ))}
                      </div>
                      <div
                        className="mt-4 flex items-start sm:items-center gap-3 rounded-xl p-3 md:p-4"
                        style={{ background: `${step.color}0c`, border: `1px solid ${step.color}30` }}
                      >
                        <span className="font-mono-jb text-xs flex-shrink-0" style={{ color: step.color, letterSpacing: "0.1em" }}>
                          DELIVERABLE
                        </span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{step.deliverable}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 font-mono-jb text-center" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            ↑ Click any phase to see what's inside
          </p>
        </div>
      </section>

      {/* ── QUALIFICATION ─────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="qual-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Who this is for</div>
          <h2
            id="qual-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            A pilot makes sense if you can say yes to most of these
          </h2>
          <p className="mb-10" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", maxWidth: 620 }}>
            We'll disqualify ourselves out of pilots that won't work, fast. The cost of a bad pilot is high
            on both sides.
          </p>

          <div className="space-y-3">
            {qualification.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl p-4 md:p-5"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ background: "rgba(0,232,122,0.1)", border: "1px solid rgba(0,232,122,0.25)" }}
                >
                  <Check className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
                </div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{q}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 italic" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
            If most of those land, the pilot is a fit. Apply below and we'll reply within two working days.
          </p>
        </div>
      </section>

      {/* ── APPLICATION FORM ──────────────────────────────────────────────────── */}
      <section
        id="apply"
        className="px-6 md:px-16 pilot-section-pad py-20 md:py-24 relative overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="apply-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,232,122,0.06) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-2xl mx-auto">
          <div className="section-label">Application</div>
          <h2
            id="apply-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Apply for the 2026 pilot cohort
          </h2>
          <p className="mb-8" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
            Four spots open. Six-week engagement. We respond within two working days.
          </p>

          {formStatus === "sent" ? (
            <div
              className="rounded-2xl p-6 md:p-8 text-center"
              style={{ border: "1px solid var(--green-mid)", background: "rgba(0,232,122,0.05)" }}
            >
              <div className="font-syne mb-2" style={{ fontSize: 18, fontWeight: 700, color: "var(--green)" }}>
                Application received.
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                Thanks. We'll reply within two working days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="form-input" name="name" required placeholder="Name" />
                <input className="form-input" name="email" type="email" required placeholder="Work email" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="form-input" name="company" required placeholder="Company" />
                <input className="form-input" name="role" required placeholder="Role" />
              </div>
              <input
                className="form-input"
                name="scale"
                placeholder="Roughly how many battery packs you operate / finance / make / insure"
              />
              <textarea
                className="form-input form-textarea"
                name="pain"
                required
                placeholder="One sentence on the specific pain you're trying to solve"
              />
              <button type="submit" className="cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 mt-2">
                {formStatus === "sending" ? "Submitting..." : "Send my application"}
                <ArrowRight className="w-4 h-4" />
              </button>
              {formStatus === "error" ? (
                <p className="pt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Something went wrong. Please try again, or email{" "}
                  <a href="mailto:info@zylectra.com" className="text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline">
                    info@zylectra.com
                  </a>
                  .
                </p>
              ) : null}
            </form>
          )}

          <p className="mt-6 font-mono-jb" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", lineHeight: 1.7 }}>
            We read every application. If you're a fit, you'll hear from our founder, Prabh, within two working days.
            If we're full or it's not a fit, we'll say so within five.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-24 md:py-28 text-center relative overflow-hidden"
        aria-labelledby="final-cta-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,232,122,0.06) 0%, transparent 70%)",
        }} />
        <div className="scanline-container absolute inset-0 pointer-events-none">
          <div className="scanline" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Limited capacity · 2026 cohort</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-syne mb-6"
            style={{ fontSize: "clamp(1.7rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            A battery's future <br />
            <span style={{ color: "var(--green)" }}>should be knowable.</span>
          </h2>

          <p className="mb-10" style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            Six weeks to find out whether your batteries are sending warnings nobody is reading.
            If the predictions don't hold up, you walk away. We don't sell licenses on hope.
          </p>

          <div className="pilot-hero-btns flex flex-wrap justify-center gap-4">
            <a href="#apply" aria-label="Apply for the Zylectra pilot">
              <button className="cta-btn">Apply for the pilot</button>
            </a>
          </div>

          <p className="mt-6 font-mono-jb" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            Six to twelve week pilot · No new hardware · NDA-protected · We respond within two working days
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pilot;
