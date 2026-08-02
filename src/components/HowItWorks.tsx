import React, { useEffect, useRef, useState } from "react";
import { Database, BrainCircuit, Zap, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

// ── Stage visuals ─────────────────────────────────────────────────────────────
// Each stage carries a small, live graphic so the section reads visually
// rather than as three text blocks. Theme-aware; emerald accents work on both
// light and dark backgrounds.

// 01 · live telemetry streaming in
const DataVisual = () => (
  <div className="w-full">
    <svg viewBox="0 0 120 40" className="w-full h-14" fill="none" aria-hidden="true">
      {[10, 20, 30].map((y) => (
        <line
          key={y}
          x1="0"
          x2="120"
          y1={y}
          y2={y}
          stroke="rgba(16,185,129,0.12)"
          strokeWidth="0.5"
        />
      ))}
      <polyline
        points="0,28 12,22 24,26 36,14 48,20 60,10 72,18 84,8 96,16 108,6 120,12"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 4"
        style={{ animation: "hiw-dash 1.4s linear infinite" }}
      />
    </svg>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {["Voltage", "Current", "Temp", "Timestamps"].map((s) => (
        <span
          key={s}
          className="inline-flex items-center gap-1 rounded-md bg-[rgba(var(--fg-rgb),0.04)] border border-[rgba(var(--fg-rgb),0.08)] px-2 py-0.5 text-[9.5px] font-medium text-[var(--text-muted)]"
        >
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          {s}
        </span>
      ))}
    </div>
  </div>
);

// 02 · physics + AI core, pulsing
const CoreVisual = () => (
  <div className="w-full">
    <div className="relative h-14 flex items-center justify-center">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="absolute w-12 h-12 rounded-full border border-emerald-400/40"
          style={{
            animation: "hiw-ring 2.4s ease-out infinite",
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
      <div className="relative w-11 h-11 rounded-full bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-center">
        <BrainCircuit className="w-5 h-5 text-emerald-400" />
      </div>
    </div>
    <div className="mt-3">
      <div className="h-1.5 rounded-full bg-[rgba(var(--fg-rgb),0.08)] overflow-hidden relative">
        <div
          className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          style={{ animation: "hiw-shimmer 1.8s ease-in-out infinite" }}
        />
      </div>
      <p className="mt-2 text-[9.5px] font-mono uppercase tracking-wider text-[var(--text-faint)] text-center">
        Modeling degradation
      </p>
    </div>
  </div>
);

// 03 · decisions coming out
const ActionVisual = ({ show }: { show: boolean }) => {
  const actions = ["Keep running", "Move to lighter duty", "Replace now"];
  return (
    <div className="w-full space-y-1.5">
      {actions.map((a, i) => (
        <div
          key={a}
          className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-1.5 transition-all duration-500"
          style={{
            transitionDelay: `${300 + i * 180}ms`,
            opacity: show ? 1 : 0,
            transform: show ? "translateX(0)" : "translateX(12px)",
          }}
        >
          <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 flex-shrink-0">
            <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />
          </span>
          <span className="text-[11px] font-medium text-[var(--text-secondary)]">
            {a}
          </span>
        </div>
      ))}
    </div>
  );
};

const stages = [
  {
    num: "01",
    label: "CONNECT",
    icon: Database,
    title: "Your data, as it already is",
    desc: "Voltage, current, temperature, timestamps. No new hardware.",
    outcome: "No hardware changes",
  },
  {
    num: "02",
    label: "ANALYZE",
    icon: BrainCircuit,
    title: "Zylectra Physical AI Model",
    desc: "Models learn how each battery behaves, grounded in degradation physics.",
    outcome: "Understand battery behavior",
  },
  {
    num: "03",
    label: "ACT",
    icon: Zap,
    title: "Decisions you can act on",
    desc: "Know which batteries need attention and what to do next.",    
    outcome: "Take the right action",
  },
];

const Section4: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-28 bg-[var(--bg)] overflow-hidden"
    >
      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-emerald-500/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-16 md:mb-20 text-center">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.3em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            How it works
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-6 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            From battery data to
            <span className="text-emerald-400"> better battery decisions.</span>
          </h2>
     
          <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Three steps from the telemetry you already collect to action your
            team can take.
          </p>
        </header>

        {/* Pipeline */}
        <div ref={gridRef} className="relative">
          {/* Animated connector (desktop) */}
          <div className="hidden md:block absolute top-[35px] left-[16.66%] right-[16.66%] h-[2px] rounded-full hiw-line" />

          <div className="grid gap-8 md:gap-6 md:grid-cols-3">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.num}
                  className="relative flex flex-col items-center transition-all duration-700"
                  style={{
                    transitionDelay: `${index * 160}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(28px)",
                  }}
                >
                  {/* Node */}
                  <div className="relative mb-8">
                    <span
                      className="absolute inset-0 rounded-2xl border border-emerald-400/40"
                      style={{
                        animation: "hiw-ring 2.6s ease-out infinite",
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />
                    <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-[var(--bg)] border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.12)]">
                      <Icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
                      {stage.num}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="group w-full rounded-2xl border border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.03)] p-6 flex flex-col hover:border-emerald-500/30 hover:bg-[rgba(var(--fg-rgb),0.05)] transition-colors duration-300">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-500 mb-4">
                      {stage.label}
                    </span>

                    {/* Live visual */}
                    <div className="mb-6 min-h-[76px] flex items-center">
                      {index === 0 && <DataVisual />}
                      {index === 1 && <CoreVisual />}
                      {index === 2 && <ActionVisual show={visible} />}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-[var(--text)] mb-2 leading-snug">
                      {stage.title}
                    </h3>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 flex-grow">
                      {stage.desc}
                    </p>

                    <div className="flex items-center gap-2 pt-4 border-t border-[rgba(var(--fg-rgb),0.06)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span className="text-sm font-semibold text-emerald-400">
                        {stage.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-semibold text-[var(--text)] leading-relaxed">
            You don't need another system that tells you what happened.
            <span className="block text-emerald-400 mt-2">
              You need one that helps you decide what happens next.
            </span>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center text-center">
          <Link
            to="/poc"
            className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Start a PoC
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section4;
