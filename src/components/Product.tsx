import React, { useEffect, useState } from "react";
import { Cpu, Activity } from "lucide-react";

const BatteryViz = () => (
  <svg viewBox="0 0 400 160" className="w-full h-[160px] mb-4">
    <defs>
      <linearGradient id="battGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
        <stop offset="100%" stopColor="rgba(0,229,255,0.05)" />
      </linearGradient>
    </defs>

    {/* Battery Body */}
    <rect
      x="8"
      y="20"
      width="340"
      height="110"
      rx="8"
      fill="none"
      stroke="rgba(255,255,255,0.12)"
      strokeWidth="1.5"
    />

    {/* Battery Cap */}
    <rect
      x="348"
      y="50"
      width="18"
      height="50"
      rx="4"
      fill="rgba(255,255,255,0.08)"
    />

    {/* Fill */}
    <rect
      x="12"
      y="24"
      width="226"
      height="102"
      rx="5"
      fill="url(#battGrad)"
    />

    {/* Internal Dividers */}
    {[82, 164].map((x) => (
      <line
        key={x}
        x1={x}
        y1="24"
        x2={x}
        y2="126"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
      />
    ))}

    {/* Warning Cell */}
    <rect
      x="12"
      y="24"
      width="68"
      height="102"
      rx="5"
      fill="rgba(255,171,0,0.1)"
    />

    {/* Percentage */}
    <text
      x="195"
      y="75"
      fill="rgba(0,229,255,0.95)"
      fontFamily="Space Mono, monospace"
      fontSize="26"
      fontWeight="700"
      textAnchor="middle"
    >
      68%
    </text>

    <text
      x="195"
      y="95"
      fill="rgba(255,255,255,0.35)"
      fontFamily="Space Mono, monospace"
      fontSize="9"
      textAnchor="middle"
    >
      STATE OF CHARGE
    </text>

    {/* Warning Symbol */}
    <text
      x="46"
      y="72"
      fill="rgba(255,171,0,0.9)"
      fontFamily="Space Mono, monospace"
      fontSize="14"
      textAnchor="middle"
    >
      ⚠
    </text>

    <text
      x="46"
      y="88"
      fill="rgba(255,171,0,0.6)"
      fontFamily="Space Mono, monospace"
      fontSize="7"
      textAnchor="middle"
    >
      CELL 1
    </text>

    {/* Pulsing Ring */}
    <circle
      cx="46"
      cy="75"
      r="22"
      fill="none"
      stroke="rgba(255,171,0,0.25)"
      strokeWidth="1"
    >
      <animate
        attributeName="r"
        values="18;28;18"
        dur="2.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.6;0;0.6"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const SectionThree = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { val: "81.4%", label: "State of Health", color: "text-amber-400" },
    { val: "38°C", label: "Peak Temp", color: "text-red-400" },
    { val: "Normal", label: "Impedance", color: "text-emerald-400" },
  ];

  const bars = [
    { label: "SEI Growth", pct: 72, color: "bg-amber-500", val: "High" },
    { label: "Li Plating", pct: 28, color: "bg-emerald-500", val: "Low" },
    { label: "Thermal Risk", pct: 45, color: "bg-amber-400", val: "Med" },
    { label: "Capacity Fade", pct: 60, color: "bg-gradient-to-r from-cyan-400 to-amber-400", val: "18.6%" },
  ];

  return (
    <section
      id="product"
      className="relative py-32 bg-gradient-to-br from-[#060b16] via-[#050810] to-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-xs font-mono tracking-[0.25em] text-gray-400 mb-6">
            PRODUCT
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold leading-[1.15] tracking-tight">
            Two AI Engines.
            <br />
            <span className="block mt-3 bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
              One Platform.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-14">
            
            {/* Module 1 */}
            <div>
              <div className="text-xs font-mono tracking-widest text-cyan-400 mb-3">
                PREDICTION LAYER —
              </div>

              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-cyan-400" />
                Failure Prediction Engine
              </h3>

              <p className="text-gray-300 leading-relaxed mb-6">
                Advanced physics-aware AI that understands how batteries actually degrade
                identifying early warning signals weeks before failure happens.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Degradation Trajectory Modeling",
                  "Failure Window Forecasting",
                  "SOH & RUL Estimation",
                  "Thermal Runaway Risk Signals",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Module 2 */}
            <div>
              <div className="text-xs font-mono tracking-widest text-amber-400 mb-3">
                ATTRIBUTION LAYER —
              </div>

              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Activity className="w-6 h-6 text-amber-400" />
                Root Cause Analysis Engine
              </h3>

              <p className="text-gray-300 leading-relaxed mb-6">
                Multi-signal intelligence that pinpoints why a battery is failing
                separating manufacturing defects, operational stress, and environmental exposure,
                enabling defensible warrant and engineering decisions.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Cell-Level Causal Attribution",
                  "Manufacturing vs Usage Separation",
                  "Warranty Risk Quantification",
                  "Engineering-Grade Explainability",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — ENGINEERED PANEL */}
          <div className="sticky top-20 bg-[#0f172a] border border-white/10 rounded-xl p-6">
            {/* Header */}
            <div className="font-mono text-[0.68rem] tracking-[0.12em] text-gray-500 uppercase mb-4">
              Sample Model Output : Cell-Level Degradation Profile
            </div>

            <BatteryViz />

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 my-4">
              {metrics.map(({ val, label, color }) => (
                <div
                  key={label}
                  className="bg-[#111827] border border-white/10 rounded-md p-3"
                >
                  <div className={`font-mono text-base font-bold ${color}`}>
                    {val}
                  </div>
                  <div className="text-[0.7rem] text-gray-500 mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Bars */}
            <div>
              {bars.map(({ label, pct, color, val }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 mb-3"
                >
                  <span className="font-mono text-[0.68rem] text-gray-500 w-[90px] shrink-0">
                    {label}
                  </span>

                  <div className="flex-1 bg-white/5 rounded-sm h-[7px] overflow-hidden">
                    <div
                      className={`h-full ${color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <span className="font-mono text-[0.68rem] text-gray-500 w-[38px] text-right">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;