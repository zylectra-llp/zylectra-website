import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, LayoutDashboard, Sparkles, CheckCircle2, FileText } from "lucide-react";

// ── Inline styles (shared visual language with Contact.tsx) ─────────────────
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
    @keyframes gridPulse {
      0%, 100% { opacity: 0.03; }
      50%       { opacity: 0.07; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulse-green {
      0%, 100% { box-shadow: 0 0 0 0 var(--green-dim); }
      50%       { box-shadow: 0 0 0 8px transparent; }
    }

    .animate-fadeUp { animation: fadeUp 0.7s ease both; }
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
      display: inline-flex;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 48px rgba(0, 232, 122, 0.4);
    }

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

    .card-hover {
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      border-color: var(--green-mid) !important;
      box-shadow: 0 16px 48px rgba(0, 232, 122, 0.08);
    }

    @keyframes iconPulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.08); }
    }
    @keyframes iconSparkle {
      0%   { transform: rotate(0deg) scale(1); }
      50%  { transform: rotate(12deg) scale(1.12); }
      100% { transform: rotate(0deg) scale(1); }
    }
    @keyframes iconPop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.18); }
      100% { transform: scale(1); }
    }
    @keyframes iconFold {
      0%   { transform: rotate(0deg); }
      50%  { transform: rotate(-8deg); }
      100% { transform: rotate(0deg); }
    }
    .deliv-card:hover .icon-dashboard { animation: iconPulse 1s ease-in-out infinite; }
    .deliv-card:hover .icon-sparkles { animation: iconSparkle 0.7s ease; }
    .deliv-card:hover .icon-check { animation: iconPop 0.5s ease; }
    .deliv-card:hover .icon-document { animation: iconFold 0.5s ease; }
    .chip {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(var(--fg-rgb),0.03);
      color: rgba(var(--fg-rgb),0.55);
      font-size: 11.5px;
      padding: 5px 11px;
      line-height: 1.3;
    }

    @media (max-width: 768px) {
      .cta-btn { width: 100%; text-align: center; padding: 16px 24px; justify-content: center; }
    }
    @media (max-width: 480px) {
      .poc-section-pad { padding-left: 1.25rem; padding-right: 1.25rem; }
    }
  `}</style>
);

// ── Data ──────────────────────────────────────────────────────────────────
const audiences = [
  { value: "fleet", label: "Fleet operator" },
  { value: "manufacturer", label: "Battery manufacturer" },
  { value: "baas", label: "BAAS operator" },
] as const;

type AudienceValue = (typeof audiences)[number]["value"];

const outcomesByAudience: Record<AudienceValue, { title: string; body: string }[]> = {
  fleet: [
    {
      title: "Reduce unexpected vehicle downtime",
      body:
        "See degradation trends weeks before a battery trips a fault code, so a swap is planned instead of an emergency.",
    },
    {
      title: "Get more usable life out of every pack",
      body:
        "Battery packs typically run 30–40% of total vehicle cost. Small gains in usable life are the single biggest lever on your fleet's total cost of ownership.",
    },
    {
      title: "Defend warranty and insurance claims with evidence",
      body:
        "EV warranty claims run 30–50% higher than combustion vehicles industry-wide. A documented degradation mechanism, not a guess, is often the difference between a covered claim and a denied one.",
    },
    {
      title: "Fewer surprise swaps, more uptime",
      body:
        "Plan replacements and duty-cycle changes around real data instead of finding out a pack failed when a vehicle is already stranded.",
    },
  ],
  manufacturer: [
    {
      title: "Reduce warranty costs",
      body:
        "Tell which failures are true defects versus normal wear, backed by evidence, so fewer claims get paid out on a guess.",
    },
    {
      title: "Validate batteries in real-world use",
      body:
        "See how packs actually degrade in the field against the assumptions your design and testing were built on.",
    },
    {
      title: "Detect production issues earlier",
      body:
        "Spot a batch or supplier degrading faster than the rest while it's still a handful of packs, not after it's a recall.",
    },
    {
      title: "Improve future battery designs",
      body:
        "Feed real field degradation data back into your next design cycle instead of relying on lab conditions alone.",
    },
  ],
  baas: [
    {
      title: "Increase battery utilization",
      body:
        "Keep more of your deployed fleet earning by catching underperforming packs before they drag down utilization.",
    },
    {
      title: "Reduce emergency swaps",
      body:
        "Know which packs need replacing before they fail mid-contract, so swaps are scheduled, not emergencies.",
    },
    {
      title: "Get more earning life from every battery",
      body:
        "Small gains in usable life compound across a whole deployed fleet, directly improving unit economics.",
    },
    {
      title: "Protect battery asset value",
      body:
        "Back your residual value and depreciation assumptions with documented degradation data instead of estimates.",
    },
  ],
};

const timeline = [
  {
    step: "01",
    week: "Week 1",
    title: "Data connect and mapping",
    body:
      "We connect to the battery data you already have and prepare it for analysis.",
  },
  {
    step: "02",
    week: "Weeks 2–6",
    title: "Analysis on your historical data",
    body:
      "Physics-informed model runs against your fleet's existing telemetry, cell by cell, identifying degradation trends and the mechanisms driving them.",
  },
  {
    step: "03",
    week: "Final week",
    title: "Results readout",
    body:
      "A working dashboard, a written findings summary, and an honest call on whether this is worth moving into a live pilot.",
  },
];

const assistantChips = [
  "Which batteries need attention?",
  "Why is Battery #24 degrading faster?",
  "Summarize fleet health",
  "What should I do next?",
];

const deliverables = [
  {
    icon: LayoutDashboard,
    iconClass: "icon-dashboard",
    title: "Interactive AI Dashboard",
    body:
      "Explore every battery in one place: health, degradation trends, anomalies, remaining useful life, risk ranking, and recommended actions.",
    footer: "Live Dashboard",
  },
  {
    icon: Sparkles,
    iconClass: "icon-sparkles",
    title: "Zylectra AI Model",
    body:
      "Ask questions about your batteries in plain English and get answers grounded in your own battery data.",
    footer: "Conversational AI",
    chips: assistantChips,
  },
  {
    icon: CheckCircle2,
    iconClass: "icon-check",
    title: "Recommended Actions",
    body:
      "Prioritized recommendations that help you decide which batteries to keep running, monitor closely, or replace.",
    footer: "Decision Support",
  },
  {
    icon: FileText,
    iconClass: "icon-document",
    title: "Executive Findings Report",
    body:
      "A shareable report summarizing key findings, operational opportunities, business impact, and our recommendation for next steps.",
    footer: "Management Summary",
  },
];

const needRequired = [
  "Voltage (V)",
  "Current (I)",
  "Temperature (T)",
  "Timestamps",
];

const needNotRequired = [
  "OCV + degradation curve per pack model",
  "Dedicated monitoring hardware",
  "Service records with confirmed field failures",
  "Cell lot / batch information",
  "Rated capacity spec sheets",
];

// ── Page ──────────────────────────────────────────────────────────────────
const PoC: React.FC = () => {
  const [audience, setAudience] = useState<AudienceValue>("fleet");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <GlobalStyles />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative px-6 md:px-16 poc-section-pad pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="poc-hero-heading"
      >
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,232,122,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="animate-fadeUp mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Proof of concept</span>
          </div>

          <h1
            id="poc-hero-heading"
            className="animate-fadeUp delay-100 mb-5"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.14 }}
          >
            See which <span className="shimmer-text">batteries are costing you money.</span>
          </h1>

          <p
            className="animate-fadeUp delay-200 mx-auto leading-relaxed mb-10"
            style={{ maxWidth: 600, color: "rgba(var(--fg-rgb),0.6)", fontSize: "clamp(14px, 2vw, 16px)" }}
          >
            We analyze the battery data you already have and show you which batteries need
            attention, why, and what to do next, in just 4–8 weeks.
          </p>

          <div className="animate-fadeUp delay-300 flex flex-wrap justify-center gap-4">
            <Link to="/contact" aria-label="Talk to us about a PoC">
              <button type="button" className="cta-btn items-center justify-center gap-2">
                Talk to us about a PoC
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ──────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 poc-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="outcomes-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">What you get</div>
          <h2
            id="outcomes-heading"
            className="mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Better battery decisions that improve operations.
          </h2>
          <p className="mb-6" style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.45)", maxWidth: 620 }}>
            Select your business to see the outcomes most relevant to you.
          </p>

          <div className="mb-10 md:mb-12 flex flex-wrap gap-2">
            {audiences.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setAudience(a.value)}
                className="rounded-full transition-colors"
                style={{
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  border: `1px solid ${audience === a.value ? "var(--green)" : "var(--border)"}`,
                  background: audience === a.value ? "rgba(0,232,122,0.1)" : "transparent",
                  color: audience === a.value ? "var(--green)" : "rgba(var(--fg-rgb),0.6)",
                }}
              >
                {a.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {outcomesByAudience[audience].map((o, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl p-5 md:p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <h3 className="mb-2" style={{ fontSize: 15.5, fontWeight: 600 }}>{o.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(var(--fg-rgb),0.55)", lineHeight: 1.7 }}>{o.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6" style={{ fontSize: 11.5, color: "rgba(var(--fg-rgb),0.35)", lineHeight: 1.6 }}>
            Industry benchmarks (pack cost share, warranty claim rates), not Zylectra-specific
            results. Your PoC produces numbers specific to your fleet.
          </p>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 poc-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="timeline-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Timeline</div>
          <h2
            id="timeline-heading"
            className="mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            4–8 weeks, on data you already have
          </h2>
          <p className="mb-10 md:mb-12" style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.45)", maxWidth: 620 }}>
            A PoC runs on historical data, not a live workflow integration. That's what keeps it
            short. A pilot, on live telemetry, comes after, if the PoC shows something worth acting on.
          </p>

          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 md:p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
                    style={{
                      border: "1px solid var(--green-mid)",
                      background: "rgba(0,232,122,0.08)",
                      color: "var(--green)",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {t.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1" style={{ fontSize: 11, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                      {t.week}
                    </div>
                    <h3 className="mb-1.5" style={{ fontSize: "clamp(14px, 2vw, 16px)", fontWeight: 600 }}>
                      {t.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: "rgba(var(--fg-rgb),0.55)", lineHeight: 1.7 }}>
                      {t.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 poc-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="deliverables-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Deliverables</div>
          <h2
            id="deliverables-heading"
            className="mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            What you'll receive at the end of the PoC.
          </h2>
          <p className="mb-10 md:mb-12" style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.45)", maxWidth: 640 }}>
            Everything is generated from your own battery data, helping you understand your
            batteries and make better operational decisions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="deliv-card card-hover rounded-2xl p-5 md:p-6 flex flex-col"
                  style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                >
                  <div
                    className={`${d.iconClass} mb-4 flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center`}
                    style={{ border: "1px solid var(--green-mid)", background: "rgba(0,232,122,0.08)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--green)" }} />
                  </div>

                  <h3 className="mb-2" style={{ fontSize: 15.5, fontWeight: 600 }}>{d.title}</h3>
                  <p className="mb-4" style={{ fontSize: 13.5, color: "rgba(var(--fg-rgb),0.55)", lineHeight: 1.7 }}>
                    {d.body}
                  </p>

                  {d.chips && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {d.chips.map((c, ci) => (
                        <span key={ci} className="chip">{c}</span>
                      ))}
                    </div>
                  )}

                  <div
                    className="mt-auto pt-3"
                    style={{ borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--green)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}
                  >
                    {d.footer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DATA REQUIREMENTS ────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 poc-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="data-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">What we need from you</div>
          <h2
            id="data-heading"
            className="mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Three raw signals. That's the ask.
          </h2>
          <p className="mb-10 md:mb-12" style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.45)", maxWidth: 640 }}>
            Our model is built to work directly on raw telemetry, so we don't need the
            spec-sheet paperwork other approaches ask for. If you have OCV curves or service
            records, they help, but they're optional, not a blocker to starting.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5 md:p-6"
              style={{ border: "1px solid var(--green-mid)", background: "rgba(0,232,122,0.04)" }}
            >
              <div className="mb-4" style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Required
              </div>
              <div className="space-y-3">
                {needRequired.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ background: "rgba(0,232,122,0.12)", border: "1px solid rgba(0,232,122,0.3)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "var(--green)" }} />
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4" style={{ fontSize: 12.5, color: "rgba(var(--fg-rgb),0.4)", lineHeight: 1.6 }}>
                Whatever your BMS already logs. Async sampling and gaps are fine.
              </p>
            </div>

            <div
              className="rounded-2xl p-5 md:p-6"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="mb-4" style={{ fontSize: 12, fontWeight: 700, color: "rgba(var(--fg-rgb),0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Not required
              </div>
              <div className="space-y-3">
                {needNotRequired.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ background: "rgba(var(--fg-rgb),0.06)", border: "1px solid var(--border)" }}
                    >
                      <X className="w-3 h-3" style={{ color: "rgba(var(--fg-rgb),0.4)" }} />
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(var(--fg-rgb),0.55)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4" style={{ fontSize: 12.5, color: "rgba(var(--fg-rgb),0.4)", lineHeight: 1.6 }}>
                Nice to have if you already have it. Never a reason to say no to a PoC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 poc-section-pad py-20 md:py-24 text-center relative overflow-hidden"
        aria-labelledby="final-cta-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,232,122,0.06) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-2xl mx-auto">
          <h2
            id="final-cta-heading"
            className="mb-6"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Ready to find out what your <br />
            <span style={{ color: "var(--green)" }}>batteries are telling you?</span>
          </h2>

          <p className="mb-10" style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "rgba(var(--fg-rgb),0.55)", lineHeight: 1.8 }}>
            4–8 weeks on data you already have. No new hardware, no commitment beyond
            finding out what your batteries are telling you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" aria-label="Talk to us about a PoC">
              <button className="cta-btn">Talk to us about a PoC</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoC;
