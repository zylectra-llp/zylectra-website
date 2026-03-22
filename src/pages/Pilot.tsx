import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// ── Inline keyframes via a style tag ──────────────────────────────────────────
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
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
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
    @keyframes drawLine {
      from { width: 0; }
      to   { width: 100%; }
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

    .metric-card {
      border: 1px solid var(--border);
      background: var(--surface);
      border-radius: 16px;
      padding: 28px 24px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .metric-card:hover {
      border-color: var(--green-dim);
      box-shadow: 0 0 32px rgba(0,232,122,0.06);
    }

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

    /* ── Responsive ── */
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
      .metric-card {
        padding: 20px 16px;
      }
      .timeline-header {
        flex-wrap: wrap;
        gap: 12px;
      }
      .timeline-phase {
        width: 100%;
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
  "Physics-Informed BESS Models", "Calendar Aging Forecasting", "Rack-Level SOH Trajectories",
  "Thermal Runaway Risk Scoring", "PCS vs Battery Attribution", "String-Level Diagnostics",
  "HVAC-Correlated Degradation", "Warranty Evidence Chains", "IEC 62933 Compliance Insights",
  "Data Center Uptime Protection",
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

  const timelineSteps = [
    {
      week: "Week 1",
      phase: "Discovery & Data Ingestion",
      tasks: [
        "BMS telemetry schema audit: MODBUS, CAN, MQTT, or REST log mapping",
        "Define BESS failure taxonomy: calendar aging, thermal runaway, string imbalance, electrolyte depletion",
        "Secure data pipeline setup on-prem enclave or cloud VPC, NDA before any data moves",
        "Commissioning-baseline SOH benchmarking against OEM rack and module specs",
      ],
      deliverable: "Data Integration Report + Scoping Sign-off",
      color: "#3b82f6",
      icon: "01",
    },
    {
      week: "Week 2",
      phase: "Physics-Informed Modeling",
      tasks: [
        "Calibrate electrochemical degradation models to your LFP / NMC / LTO chemistry",
        "Layer deep learning over physics priors for failure probability curves, no black-box predictions",
        "Identify high-risk racks via anomaly trajectories: capacity fade, impedance rise, RTE decline",
        "Multimodal fusion: BMS voltage/current, HVAC telemetry, PCS event logs, thermal sensors",
      ],
      deliverable: "Live Model Inference Dashboard (read-only preview)",
      color: "#8b5cf6",
      icon: "02",
    },
    {
      week: "Week 3",
      phase: "Root Cause & Attribution",
      tasks: [
        "FMEA-aligned failure mode classification per IEC 62933 / UL 9540A",
        "Causal graph: HVAC/thermal management fault vs. PCS overcharge vs. cell manufacturing variance",
        "Warranty attribution scoring; identify which party bears liability with defensible evidence chains",
        "Sensitivity analysis: which variables are driving degradation fastest in your specific pack?",
      ],
      deliverable: "Root Cause Attribution Report (sample 5 failure events)",
      color: "#f59e0b",
      icon: "03",
    },
    {
      week: "Week 4",
      phase: "Readout & Deployment Roadmap",
      tasks: [
        "Executive findings presentation with quantified uptime risk and $ replacement cost at stake",
        "Technical integration blueprint: REST API / MQTT / gRPC specs for production BMS stack",
        "Pilot-to-production scaling plan: from single site to multi-site monitoring",
        "Commercial proposal and IP/data governance framework",
      ],
      deliverable: "Full Pilot Report + Production Deployment Proposal",
      color: "#00e87a",
      icon: "04",
    },
  ];

  const metrics = [
    { value: 91, suffix: "%", label: "Failure Detection Accuracy", sub: "Before thermal event onset" },
    { value: 4,  suffix: "–8M", label: "Advance Warning", sub: "Months Ahead of BESS field failure" },
    { value: 40, suffix: "%+", label: "Warranty Cost Reduction", sub: "Via causal attribution" },
    { value: 2,  suffix: "–4wk", label: "Pilot to Production", sub: "Average integration time" },
  ];

  const included = [
    {
      icon: "⚡",
      title: "Failure Risk & SLA Forecasting",
      desc: "Physics-informed probabilistic models trained on your BESS chemistry and operating profile. Know which rack threatens uptime SLAs — months before any BMS threshold is reached.",
    },
    {
      icon: "📈",
      title: "Asset Life & ROI Modelling",
      desc: "Rack-level capacity fade and impedance growth curves anchored to electrochemical first principles. Every month of life added or protected is quantified directly against your project IRR.",
    },
    {
      icon: "🌡️",
      title: "HVAC / OpEx Optimisation",
      desc: "Arrhenius-calibrated thermal aging models that show exactly how many months of asset life each degree above setpoint is costing you — and the ROI of restoring it. Often the fastest-payback action that costs nothing to implement.",
    },
    {
      icon: "⚖️",
      title: "4-Party Warranty Attribution",
      desc: "Multimodal causal chains that separate cell manufacturer defects, PCS overcharge events, HVAC management failures, and EPC/integrator variance — with audit-ready evidence chains for each party.",
    },
    {
      icon: "📡",
      title: "Integration Architecture",
      desc: "Production-ready API specs (REST / MQTT / gRPC) compatible with existing SCADA, DCIM, and BMS stacks. No hardware changes required.",
    },
    {
      icon: "📋",
      title: "Compliance Readiness",
      desc: "Findings mapped to IEC 62933, UL 9540A, and NFPA 855 for regulatory audit trails and insurance documentation.",
    },
  ];

  const idealFor = [
    {
      tag: "Data Center Operators",
      text: "Protecting contractual uptime SLAs by predicting BESS failure before it cascades into critical backup load exposure — where the cost of downtime dwarfs the cost of the battery.",
    },
    {
      tag: "C&I BESS Asset Owners",
      text: "Maximising IRR on a $500K–$5M, 10–15 year capital asset by identifying the specific interventions — HVAC setpoint tuning, charge protocol adjustment — that reduce degradation fastest.",
    },
    {
      tag: "Warranty & Finance Teams",
      text: "Building defensible attribution chains across all four parties — cell OEM, PCS vendor, EPC/integrator, and facilities team — to reduce warranty claim leakage and resolve disputes with engineering-grade evidence.",
    },
    {
      tag: "EPC & System Integrators",
      text: "Commissioning BESS deployments with a physics baseline from day one, so degradation trajectories are tracked against spec from installation — and you have evidence when field performance diverges.",
    },
  ];

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
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,232,122,0.08) 0%, transparent 70%)"
        }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="animate-fadeUp mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Enterprise Pilot Program</span>
          </div>

          <h1
            id="pilot-hero-heading"
            className="animate-fadeUp delay-100 font-syne mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.12 }}
          >
            <span style={{ display: "block" }}>BESS Intelligence.</span>
            <span className="shimmer-text" style={{ display: "block", lineHeight: 1.12 }}>Live in Your Stack in 4 Weeks.</span>
          </h1>

          <p
            className="animate-fadeUp delay-200 mx-auto leading-relaxed mb-10"
            style={{ maxWidth: 600, color: "rgba(255,255,255,0.55)", fontSize: "clamp(14px, 2vw, 16px)" }}
          >
            Physics-informed failure prediction and warranty attribution,
            integrating directly with your BMS and SCADA, no hardware changes required.
          </p>

          <div className="animate-fadeUp delay-300 pilot-hero-btns flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/prabhsingh-zylectra/enterprise-pilot-zylectra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book an enterprise call with Zylectra"
            >
              <button type="button" className="cta-btn inline-flex items-center justify-center gap-2">
                Book Enterprise Call
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </a>
            <a
              href="https://docs.google.com/document/d/1HZDhLWVd4D51JAzrpMZF4nhIH5RctNipeTLWq1fNO8A/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download the Zylectra BESS pilot brief"
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
              Download Pilot Brief
            </a>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── METRICS ───────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-label="Pilot outcome metrics"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Pilot Outcomes</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="metric-card text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  className="font-syne green-glow"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "var(--green)", whiteSpace: "nowrap", height: "2.8rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}
                >
                  <Counter end={m.value} suffix={m.suffix} />
                </div>
                <div className="font-syne" style={{ fontSize: 12, fontWeight: 600, marginBottom: "6px", lineHeight: 1.3 }}>
                  {m.label}
                </div>
                <div className="font-mono-jb" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="included-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Deliverables</div>
          <h2
            id="included-heading"
            className="font-syne mb-10 md:mb-12"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            What the Pilot Includes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => (
              <div
                key={i}
                className="card-hover step-card rounded-2xl p-5 md:p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-syne mb-2" style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDEAL FOR ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="ideal-for-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Target Customers</div>
          <h2
            id="ideal-for-heading"
            className="font-syne mb-10 md:mb-12"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Built For
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {idealFor.map((item, i) => (
              <div
                key={i}
                className="card-hover flex items-start gap-4 md:gap-5 rounded-2xl p-5 md:p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div
                  className="mt-0.5 flex-shrink-0 rounded-lg px-3 py-1 font-mono-jb"
                  style={{
                    background: "var(--green-dim)",
                    color: "var(--green)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.tag}
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-20 md:py-24 relative overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="timeline-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,232,122,0.04) 0%, transparent 70%)"
        }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="section-label">Engagement Structure</div>
          <h2
            id="timeline-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            4-Week Pilot Timeline
          </h2>
          <p className="mb-12 md:mb-16" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 480 }}>
            Structured around BESS engineering workflows — from raw BMS telemetry to boardroom-ready findings.
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
                {/* Header row */}
                <div className="timeline-header flex items-center gap-3 md:gap-5 p-5 md:p-6">
                  <div
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-mono-jb text-sm transition-all duration-300"
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

                  <div className="flex-1 min-w-0 timeline-phase">
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
                      Deliverable: {step.deliverable}
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

                {/* Expanded tasks */}
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
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{task}</p>
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
            ↑ Click any phase to expand tasks and deliverables
          </p>
        </div>
      </section>

      {/* ── PRE-REQUISITES ────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-16 md:py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-labelledby="data-req-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Data Requirements</div>
          <h2
            id="data-req-heading"
            className="font-syne mb-3"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Minimum Data Requirements
          </h2>
          <p className="mb-8 md:mb-10" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 520 }}>
            What we need to generate statistically valid predictions within the 4-week window.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: "Telemetry Coverage",
                req: "≥ 90 days of rack-level V, I, T data at ≥ 1-min resolution",
                note: "BMS logs, SCADA historian, MODBUS/MQTT, or telematics API",
              },
              {
                label: "Fleet / Site Size",
                req: "≥ 1 site (lab) or ≥ 3 sites (field deployment)",
                note: "Per-rack granularity preferred; string-level accepted as minimum",
              },
              {
                label: "Incident Records",
                req: "≥ 3 labeled degradation or fault events",
                note: "Any format: CMMS tickets, field inspection notes, OEM warranty claims",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 md:p-6 card-hover"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="font-mono-jb mb-3 text-xs" style={{ color: "var(--green)", letterSpacing: "0.1em" }}>
                  {r.label}
                </div>
                <div className="font-syne mb-2" style={{ fontSize: 14, fontWeight: 600 }}>{r.req}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pilot-section-pad py-24 md:py-28 text-center relative overflow-hidden"
        aria-labelledby="final-cta-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,232,122,0.06) 0%, transparent 70%)"
        }} />
        <div className="scanline-container absolute inset-0 pointer-events-none">
          <div className="scanline" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Limited Pilot Capacity · Q2 2026</span>
          </div>

          <h2
            id="final-cta-heading"
            className="font-syne mb-6"
            style={{ fontSize: "clamp(1.7rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Start Your BESS Technical<br />
            <span style={{ color: "var(--green)" }}>Evaluation This Week</span>
          </h2>

          <p className="mb-10" style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            Our engineering team reviews your BESS architecture, telemetry coverage,
            and failure history before the pilot begins — no sales handoff, direct access
            to the team building the models.
          </p>

          <div className="pilot-hero-btns flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/prabhsingh-zylectra/enterprise-pilot-zylectra-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book an enterprise call with Zylectra BESS team"
            >
              <button className="cta-btn">Book Enterprise Call</button>
            </a>
          </div>

          <p className="mt-6 font-mono-jb" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            NDA available before data sharing · On-prem deployment option available · No hardware changes required
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pilot;