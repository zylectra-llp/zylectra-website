import React, { useEffect, useRef, useState } from "react";

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
    @keyframes drawLine {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes gridPulse {
      0%, 100% { opacity: 0.03; }
      50%       { opacity: 0.07; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .font-syne    { font-family: 'Syne', sans-serif; }
    .font-mono-jb { font-family: 'JetBrains Mono', monospace; }

    .animate-fadeUp   { animation: fadeUp 0.7s ease both; }
    .animate-fadeIn   { animation: fadeIn 0.6s ease both; }
    .animate-floatY   { animation: floatY 4s ease-in-out infinite; }
    .delay-100  { animation-delay: 0.1s; }
    .delay-200  { animation-delay: 0.2s; }
    .delay-300  { animation-delay: 0.3s; }
    .delay-400  { animation-delay: 0.4s; }
    .delay-500  { animation-delay: 0.5s; }
    .delay-600  { animation-delay: 0.6s; }

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
      animation: ticker 28s linear infinite;
    }

    .timeline-line-animated {
      animation: drawLine 1.2s ease forwards;
      animation-delay: 0.4s;
      width: 0;
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
  "Physics-Informed Models", "SOH Trajectory Forecasting", "Failure Mode Classification",
  "Warranty Attribution Analysis", "Multimodal Root Cause Analysis", "Cell-Level Diagnostics",
  "Degradation Path Simulation", "Fleet Health Monitoring", "IEEE 1725 Compliance Insights",
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
      phase: "Discovery & Ingestion",
      tasks: [
        "Telemetry schema audit & CAN bus / BMS log mapping",
        "Define failure event taxonomy (thermal runaway, Li plating, SEI growth, etc.)",
        "Secure data pipeline setup (on-prem or cloud enclave)",
        "Baseline SOH benchmarking against OEM cell specs",
      ],
      deliverable: "Data Integration Report + Scoping Sign-off",
      color: "#3b82f6",
      icon: "01",
    },
    {
      week: "Week 2",
      phase: "Physics-Informed Modeling",
      tasks: [
        "Calibrate electrochemical degradation models (SPM/DFN) to your cell chemistry",
        "Layer Deep Learning over physics priors for failure probability curves",
        "Identify high-risk packs via anomaly trajectories (capacity fade, impedance rise)",
        "Multimodal fusion: voltage, temperature, current, vibration, mechanical stress",
      ],
      deliverable: "Live Model Inference Dashboard (read-only preview)",
      color: "#8b5cf6",
      icon: "02",
    },
    {
      week: "Week 3",
      phase: "Root Cause & Attribution",
      tasks: [
        "FMEA-aligned failure mode classification per IEC 62660 / UL 9540A",
        "Causal graph construction: OEM design fault vs. supplier cell defect vs. field misuse",
        "Warranty attribution scoring with legal-defensible evidence chains",
        "Sensitivity analysis which variables most drive failure in your fleet?",
      ],
      deliverable: "Root Cause Attribution Report (sample 5 failure events)",
      color: "#f59e0b",
      icon: "03",
    },
    {
      week: "Week 4",
      phase: "Readout & Deployment Roadmap",
      tasks: [
        "Executive findings presentation with quantified risk savings ($ at risk)",
        "Technical integration blueprint: REST API / MQTT / gRPC specs",
        "Pilot-to-production scaling plan and SLA definition",
        "Commercial proposal and IP/data governance framework",
      ],
      deliverable: "Full Pilot Report + Production Deployment Proposal",
      color: "#00e87a",
      icon: "04",
    },
  ];

  const metrics = [
    { value: 87, suffix: "%", label: "Failure Detection Accuracy", sub: "Before thermal event onset" },
    { value: 6, suffix: "–14wk", label: "Advance Warning", sub: "Ahead of field failure" },
    { value: 40, suffix: "%+", label: "Warranty Cost Reduction", sub: "Via causal attribution" },
    { value: 2, suffix: "–4wk", label: "Pilot to Production", sub: "Average integration time" },
  ];

  const included = [
    { icon: "⚡", title: "Failure Risk Prediction", desc: "Physics-informed probabilistic models trained on your cell chemistry, not generic open datasets." },
    { icon: "🔬", title: "SOH Trajectory Modeling", desc: "Capacity fade and impedance growth curves anchored to electrochemical first principles (SPM/DFN)." },
    { icon: "🧬", title: "Failure Mode Classification", desc: "FMEA-aligned taxonomy: Li plating, thermal runaway precursors, SEI growth, dendrite risk." },
    { icon: "⚖️", title: "Warranty Attribution", desc: "Multimodal causal chains that identify whether failure originates in cell supply, BMS design, or end-user behavior." },
    { icon: "📡", title: "Integration Architecture", desc: "Production-ready API specs (REST / MQTT / gRPC) compatible with existing MES and telematics stacks." },
    { icon: "📋", title: "Compliance Readiness", desc: "Findings mapped to IEC 62660, UL 9540A, and IEEE 1725 for regulatory audit trails." },
  ];

  const idealFor = [
    { tag: "Battery OEMs", text: "Validating new cell line reliability before mass production sign-off" },
    { tag: "EV Manufacturers", text: "Managing fleet SOH at scale and proactively preventing warranty events" },
    { tag: "Warranty Teams", text: "Building defensible attribution chains to reduce claim leakage and supplier disputes" },
    { tag: "R&D Labs", text: "Compressing degradation testing cycles with physics-model accelerated simulation" },
  ];

  return (
    <div className="min-h-screen font-syne" style={{ background: "var(--bg)", color: "#fff" }}>
      <GlobalStyles />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 md:px-16 pt-32 pb-28 overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        {/* Grid bg */}
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,232,122,0.08) 0%, transparent 70%)"
        }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="animate-fadeUp mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Enterprise Pilot Program</span>
          </div>

          <h1 className="animate-fadeUp delay-100 font-syne font-800 leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}>
            Predictive Battery Intelligence<br />
            <span className="shimmer-text">Live in Your Stack in 4 Weeks</span>
          </h1>

          <p className="animate-fadeUp delay-200 mx-auto leading-relaxed mb-10"
            style={{ maxWidth: 600, color: "rgba(255,255,255,0.55)", fontSize: 16 }}>
            Zylectra's pilot integrates directly with your BMS telemetry to deliver
            physics-informed failure prediction, electrochemical degradation modeling,
            and legally-defensible warranty attribution structured around how battery
            engineering teams actually work.
          </p>

          <div className="animate-fadeUp delay-300 flex flex-wrap justify-center gap-4">
            <a href="https://calendly.com/prabhsingh-zylectra/enterprise-pilot-zylectra" target="_blank" rel="noopener noreferrer">
              <button className="cta-btn">Book Enterprise Call →</button>
            </a>
            <a 
                href={"https://docs.google.com/document/d/1HZDhLWVd4D51JAzrpMZF4nhIH5RctNipeTLWq1fNO8A/edit?usp=sharing"}
                className="font-syne font-600 rounded-lg px-8 py-4 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: 14, background: "transparent", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--green-mid)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
              Download Pilot Brief
            </a>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── METRICS ─────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Pilot Outcomes</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="metric-card text-center">
                <div className="font-syne font-800 mb-1 green-glow"
                  style={{ fontSize: "2.4rem", color: "var(--green)" }}>
                  <Counter end={m.value} suffix={m.suffix} />
                </div>
                <div className="font-syne font-600 mb-1" style={{ fontSize: 13 }}>{m.label}</div>
                <div className="font-mono-jb" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Deliverables</div>
          <h2 className="font-syne font-700 mb-12" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.01em" }}>
            What the Pilot Includes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => (
              <div key={i} className="card-hover step-card rounded-2xl p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-syne font-600 mb-2" style={{ fontSize: 15 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDEAL FOR ───────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Target Customers</div>
          <h2 className="font-syne font-700 mb-12" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.01em" }}>
            Built For
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {idealFor.map((item, i) => (
              <div key={i} className="card-hover flex items-start gap-5 rounded-2xl p-6"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                <div className="mt-0.5 flex-shrink-0 rounded-lg px-3 py-1 font-mono-jb font-500"
                  style={{ background: "var(--green-dim)", color: "var(--green)", fontSize: 11, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                  {item.tag}
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24 relative overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,232,122,0.04) 0%, transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="section-label">Engagement Structure</div>
          <h2 className="font-syne font-700 mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.01em" }}>
            4-Week Pilot Timeline
          </h2>
          <p className="mb-16" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 480 }}>
            Structured around battery engineering workflows — from raw telemetry to boardroom-ready findings.
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
              >
                {/* Header row */}
                <div className="flex items-center gap-5 p-6">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono-jb font-500 text-sm transition-all duration-300"
                    style={{
                      border: `1px solid ${activeStep === i ? step.color + "66" : "rgba(255,255,255,0.08)"}`,
                      background: activeStep === i ? `${step.color}18` : "transparent",
                      color: activeStep === i ? step.color : "rgba(255,255,255,0.3)",
                    }}>
                    {step.icon}
                  </div>

                  {/* Week badge */}
                  <div className="flex-shrink-0 font-mono-jb text-xs px-3 py-1 rounded-full"
                    style={{
                      border: `1px solid ${step.color}44`,
                      background: `${step.color}10`,
                      color: step.color,
                      letterSpacing: "0.08em",
                    }}>
                    {step.week}
                  </div>

                  {/* Phase */}
                  <div className="flex-1">
                    <h3 className="font-syne font-600" style={{ fontSize: 16 }}>{step.phase}</h3>
                    <p className="font-mono-jb mt-0.5" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      Deliverable: {step.deliverable}
                    </p>
                  </div>

                  {/* Expand arrow */}
                  <div className="transition-transform duration-300 flex-shrink-0"
                    style={{ transform: activeStep === i ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.3)" }}>
                    ↓
                  </div>
                </div>

                {/* Expanded tasks */}
                {activeStep === i && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="pt-4" style={{ borderTop: `1px solid ${step.color}22` }}>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {step.tasks.map((task, j) => (
                          <div key={j} className="flex items-start gap-3 rounded-xl p-4"
                            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                              style={{ background: step.color }} />
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{task}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-3 rounded-xl p-4"
                        style={{ background: `${step.color}0c`, border: `1px solid ${step.color}30` }}>
                        <span className="font-mono-jb text-xs" style={{ color: step.color, letterSpacing: "0.1em" }}>DELIVERABLE</span>
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

      {/* ── PRE-REQUISITES ──────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label">Data Requirements</div>
          <h2 className="font-syne font-700 mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.01em" }}>
            Minimum Data Requirements for Statistical Validity
          </h2>
          <p className="mb-10" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 520 }}>
            Minimum requirements to generate statistically meaningful predictions within the 4-week window.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Telemetry Coverage", req: "≥ 90 days of pack-level V, I, T data at ≥ 1 Hz", note: "CAN bus, BMS logs, or fleet telematics API" },
              { label: "Fleet Size", req: "≥ 50 packs (lab) or ≥ 200 packs (field)", note: "Statistically sufficient for failure probability curves" },
              { label: "Failure Labels", req: "≥ 5 labeled failure or warranty events", note: "Any format: CRM tickets, field reports, teardown notes" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl p-6 card-hover"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                <div className="font-mono-jb mb-3 text-xs" style={{ color: "var(--green)", letterSpacing: "0.1em" }}>{r.label}</div>
                <div className="font-syne font-600 mb-2" style={{ fontSize: 14 }}>{r.req}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,232,122,0.06) 0%, transparent 70%)" }} />
        <div className="scanline-container absolute inset-0 pointer-events-none">
          <div className="scanline" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="pill"><span className="pill-dot" />Limited Engineering Capacity · Q2 2026</span>
          </div>
          <h2 className="font-syne font-800 mb-6"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Start Your Technical<br />
            <span style={{ color: "var(--green)" }}>Evaluation This Week</span>
          </h2>
          <p className="mb-10" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            Our engineering team will review your battery architecture, telemetry
            coverage, and use case before initiating the pilot, no sales handoff, direct
            access to the team building the models.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://calendly.com/prabhsingh-zylectra/enterprise-pilot-zylectra" target="_blank" rel="noopener noreferrer">
              <button className="cta-btn">Book Enterprise Call →</button>
            </a>
          </div>
          <p className="mt-6 font-mono-jb" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            NDA available before data sharing · On-prem deployment option available
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pilot;