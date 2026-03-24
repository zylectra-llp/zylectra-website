import React, { useEffect, useRef, useState } from "react";
import { Database, Atom, Target, Search, ArrowRight } from "lucide-react";

// ── Animated Pipeline Visualization ─────────────────────────────────────────

const PipelineViz: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % 4);
    }, 1800);
    return () => clearInterval(intervalRef.current);
  }, []);

  const nodes = [
    {
      icon: "⬡",
      label: "Raw Telemetry",
      sublabel: "V · I · T · SoC",
      col: "#34d399",
    },
    {
      icon: "⚛",
      label: "Physics Engine",
      sublabel: "Electrochemical model",
      col: "#818cf8",
    },
    {
      icon: "◎",
      label: "PINN Forecast",
      sublabel: "RUL · SOH · Fade rate",
      col: "#34d399",
    },
    {
      icon: "⬡",
      label: "RCA Attribution",
      sublabel: "Who · What · Why",
      col: "#facc15",
    },
  ];

  // Data packets — animated dots traveling along the pipeline
  const packets = [0, 1, 2, 3].map(i => ({
    id: i,
    delay: `${i * 0.6}s`,
  }));

  const mobileProgress = nodes.length > 1 ? activeStep / (nodes.length - 1) : 1;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden mb-16 md:mb-24"
      style={{
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Top label */}
      <div
        className="flex items-center gap-2 px-5 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em" }}>
          ZYLECTRA INTELLIGENCE PIPELINE · LIVE
        </span>
      </div>

      <div className="px-4 md:px-8 py-8 md:py-10">
        {/* Pipeline row */}
        <div className="relative">
          {/* Desktop/tablet: horizontal pipeline */}
          <div className="relative hidden md:flex items-center justify-between">
            {/* Connector lines + animated packets */}
            <div className="absolute inset-0 flex items-center px-[10%] pointer-events-none">
              <div className="relative w-full" style={{ height: 2 }}>
                {/* Static line */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                {/* Active segment highlight */}
                <div
                  className="absolute top-0 bottom-0 rounded-full transition-all duration-500"
                  style={{
                    left: `${(activeStep / 3) * 100}%`,
                    width: activeStep < 3 ? "33.33%" : "0%",
                    background: "linear-gradient(90deg, rgba(52,211,153,0.6), rgba(52,211,153,0.1))",
                  }}
                />
                {/* Traveling packets */}
                {packets.map(p => (
                  <div
                    key={p.id}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#34d399",
                      boxShadow: "0 0 6px #34d399",
                      animation: `travel-packet 2.4s linear infinite`,
                      animationDelay: p.delay,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Node cards */}
            {nodes.map((node, i) => {
              const isActive = activeStep === i;
              const isPast = i < activeStep;
              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center gap-2 cursor-default z-10"
                  style={{ width: "22%" }}
                  onMouseEnter={() => {
                    clearInterval(intervalRef.current);
                    setActiveStep(i);
                  }}
                  onMouseLeave={() => {
                    intervalRef.current = setInterval(() => setActiveStep(s => (s + 1) % 4), 1800);
                  }}
                >
                  {/* Node circle */}
                  <div
                    className="flex items-center justify-center rounded-2xl transition-all duration-400"
                    style={{
                      width: 52,
                      height: 52,
                      background: isActive
                        ? `${node.col}18`
                        : isPast
                        ? "rgba(52,211,153,0.06)"
                        : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${isActive ? node.col : isPast ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: isActive ? `0 0 20px ${node.col}30` : "none",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <span style={{ fontSize: 20, color: isActive ? node.col : isPast ? "#34d399" : "rgba(255,255,255,0.3)" }}>
                      {isPast ? "✓" : i === 1 ? "⚛" : i === 2 ? "◉" : "⬡"}
                    </span>
                  </div>

                  {/* Step number */}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: isActive ? node.col : "rgba(255,255,255,0.2)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    PHASE {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Label */}
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                        transition: "color 0.35s ease",
                        lineHeight: 1.3,
                      }}
                    >
                      {node.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "monospace",
                        fontSize: 9,
                        color: isActive ? node.col : "rgba(255,255,255,0.2)",
                        marginTop: 2,
                        transition: "color 0.35s ease",
                      }}
                    >
                      {node.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="relative md:hidden flex flex-col items-center gap-10 py-2">
            {/* Connector line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px rounded-full"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            {/* Active segment highlight */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-4 w-px rounded-full transition-all duration-500"
              style={{
                height: `${Math.max(0, Math.min(100, mobileProgress * 100))}%`,
                background: "linear-gradient(180deg, rgba(52,211,153,0.6), rgba(52,211,153,0.1))",
              }}
            />

            {/* Node buttons */}
            {nodes.map((node, i) => {
              const isActive = activeStep === i;
              const isPast = i < activeStep;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    clearInterval(intervalRef.current);
                    setActiveStep(i);
                    intervalRef.current = setInterval(() => setActiveStep(s => (s + 1) % 4), 1800);
                  }}
                  className="relative flex flex-col items-center gap-2 text-center z-10 focus:outline-none"
                  style={{ maxWidth: 260 }}
                >
                  {/* Node circle */}
                  <div
                    className="flex items-center justify-center rounded-2xl transition-all duration-400"
                    style={{
                      width: 52,
                      height: 52,
                      background: isActive
                        ? `${node.col}18`
                        : isPast
                        ? "rgba(52,211,153,0.06)"
                        : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${isActive ? node.col : isPast ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: isActive ? `0 0 20px ${node.col}30` : "none",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <span style={{ fontSize: 20, color: isActive ? node.col : isPast ? "#34d399" : "rgba(255,255,255,0.3)" }}>
                      {isPast ? "✓" : i === 1 ? "⚛" : i === 2 ? "◉" : "⬡"}
                    </span>
                  </div>

                  {/* Step number */}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: isActive ? node.col : "rgba(255,255,255,0.2)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    PHASE {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Label */}
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                        transition: "color 0.35s ease",
                        lineHeight: 1.3,
                      }}
                    >
                      {node.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "monospace",
                        fontSize: 9,
                        color: isActive ? node.col : "rgba(255,255,255,0.2)",
                        marginTop: 2,
                        transition: "color 0.35s ease",
                      }}
                    >
                      {node.sublabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active step detail bar */}
        <div
          className="mt-8 rounded-xl px-5 py-3 transition-all duration-300 text-white/90 leading-relaxed"
          style={{
            background: `${nodes[activeStep].col}0d`,
            border: `1px solid ${nodes[activeStep].col}28`,
          }}
        >
          {[
            "Battery telemetry ingested non-invasively; BMS logs, charge/discharge cycles, temperature profiles. No hardware changes, no downtime.",
            "Electrochemical degradation models calibrated to your chemistry (LFP, NMC, LTO). Physics constraints applied before any ML inference.",
            "Physics-Informed Neural Network outputs RUL forecast, SOH trajectory, and uncertainty band, months before any threshold alarm fires.",
            "Multi-modal causal chain identifies what degraded, why it degraded, and which party; cell, charger, thermal management, or operating protocol is responsible.",
          ][activeStep]}
          <span
            className="ml-2 text-xs font-semibold"
            style={{ color: nodes[activeStep].col }}
          >
            Phase {activeStep + 1} of 4
          </span>
        </div>
      </div>

      <style>{`
        @keyframes travel-packet {
          0%   { left: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ── Steps ────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: Database,
    title: "Non-Invasive Data Integration",
    desc: "Ingest BMS, thermal, charger, and sensor data. No hardware changes, no downtime. Compatible with all major protocols.",
  },
  {
    num: "02",
    icon: Atom,
    title: "Physics-Informed Processing",
    desc: "Electrochemical digital twin models apply physics-based laws as hard constraints so predictions generalize beyond the training data.",
  },
  {
    num: "03",
    icon: Target,
    title: "Health & Life Forecasting",
    desc: "Forecast remaining useful life, quantify degradation rate, and model the exact cost of operating condition drift, before it's irreversible.",
  },
  {
    num: "04",
    icon: Search,
    title: "Root Cause Attribution",
    desc: "Pinpoint degradation causes across every party that can cause or claim, a failure. Audit-ready evidence chains included.",
  },
];

// ── Section ──────────────────────────────────────────────────────────────────

const Section4 = () => {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.3em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            The Zylectra Architecture
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight max-w-4xl">
            From Raw Telemetry to{" "}
            <span className="text-emerald-400">Actionable Intelligence.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            Standard monitoring is reactive. Zylectra integrates physics-informed AI
            into your existing stack to predict failures before they happen regardless
            of chemistry, form factor, or application.
          </p>
        </header>

        {/* Pipeline Visualization */}
        <PipelineViz />

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div
              key={num}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/[0.05] hover:border-emerald-500/30"
            >
              <div className="font-mono text-[10px] tracking-widest text-emerald-500 mb-6 flex justify-between items-center">
                <span>PHASE {num}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="mb-6 p-3 bg-emerald-500/10 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Icon size={24} className="text-emerald-400" />
              </div>

              <h3 className="text-lg font-bold text-white mb-4 leading-snug">{title}</h3>

              <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-gray-300 text-sm mb-6 font-medium italic">
            Compatible with all major BMS protocols and SCADA systems.
          </p>
          <button
            onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Explore the Interactive Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section4;