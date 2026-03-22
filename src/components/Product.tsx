import React, { useEffect, useState } from "react";
import { Cpu, Activity } from "lucide-react";

// BESS Rack Visualization — High-fidelity Infrastructure Monitoring UI
const RackViz = () => {
  const modules = [
    { id: "M-01", health: 94, color: "rgba(16,185,129,0.9)", bgFill: "rgba(16,185,129,0.08)", status: "OK" },
    { id: "M-02", health: 61, color: "rgba(239,68,68,0.9)",  bgFill: "rgba(239,68,68,0.13)",  status: "CRIT" },
    { id: "M-03", health: 88, color: "rgba(16,185,129,0.9)", bgFill: "rgba(16,185,129,0.08)", status: "OK" },
    { id: "M-04", health: 79, color: "rgba(251,191,36,0.9)", bgFill: "rgba(251,191,36,0.08)", status: "WARN" },
  ];

  const rackX = 28;
  const rackY = 18;
  const rackW = 344;
  const rackH = 138;
  const moduleH = 26;
  const moduleGap = 6;
  const moduleStartY = rackY + 16;

  return (
    <svg viewBox="0 0 400 172" className="w-full h-auto mb-4 drop-shadow-2xl">
      <defs>
        <linearGradient id="rackBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.06)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0.01)" />
        </linearGradient>
        <filter id="glow-red">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Rack Chassis */}
      <rect x={rackX} y={rackY} width={rackW} height={rackH} rx="6" fill="url(#rackBodyGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      
      <text x={rackX + rackW / 2} y={rackY + 10} fill="rgba(255,255,255,0.22)" fontFamily="Space Mono, monospace" fontSize="7" fontWeight="600" letterSpacing="0.15em" textAnchor="middle">
        BESS RACK #04 — SYSTEM STATUS: LIVE
      </text>

      {modules.map((mod, i) => {
        const my = moduleStartY + i * (moduleH + moduleGap);
        const isCrit = mod.status === "CRIT";
        return (
          <g key={mod.id}>
            <rect x={rackX + 12} y={my} width={rackW - 24} height={moduleH} rx="3" fill="rgba(255,255,255,0.02)" stroke={isCrit ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.05)"} />
            <circle cx={rackX + 24} cy={my + moduleH / 2} r="3.5" fill={mod.color} filter={isCrit ? "url(#glow-red)" : ""}>
              {isCrit && <animate attributeName="opacity" values="1;0.15;1" dur="1.4s" repeatCount="indefinite" />}
            </circle>
            <text x={rackX + 36} y={my + moduleH / 2 + 4} fill={isCrit ? "#ef4444" : "white"} opacity={isCrit ? 1 : 0.4} fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700">{mod.id}</text>
            <rect x={rackX + 68} y={my + moduleH / 2 - 3} width={200} height="6" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x={rackX + 68} y={my + moduleH / 2 - 3} width={(mod.health / 100) * 200} height="6" rx="3" fill={mod.color} opacity="0.7" />
            <text x={rackX + 278} y={my + moduleH / 2 + 4} fill={mod.color} fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700">{mod.health}%</text>
          </g>
        );
      })}
    </svg>
  );
};

const SectionThree = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { val: "89.2%", label: "Capacity (SOH)", color: "text-amber-400" },
    { val: "±2.4%", label: "Rack Imbalance", color: "text-emerald-400" },
    { val: "Critical", label: "Fire Risk Score", color: "text-red-500" },
  ];

  const bars = [
    { label: "Calendar Aging", pct: 68, color: "bg-amber-500", val: "High" },
    { label: "HVAC Efficiency", pct: 92, color: "bg-emerald-500", val: "Opt." },
    { label: "Internal Short Risk", pct: 15, color: "bg-emerald-500", val: "Low" },
    { label: "Capacity Fade", pct: 12, color: "bg-cyan-400", val: "12.1%" },
  ];

  return (
    <section id="product" className="relative py-24 md:py-32 bg-[#050508] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - SEO Optimized */}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase mb-4">
            Industrial Asset Performance Management
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight mb-4">
            Two Engines. <span className="text-emerald-400">Zero Downtime.</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
            The first physics-informed BESS Intelligence Platform designed to eliminate the blind spots in standard battery management systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE — SEO REFINED COPY */}
          <div className="space-y-12 md:space-y-16">
            
            {/* Module 1: Prediction */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Cpu className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold">Predictive BESS Health Monitoring</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                Identify <span className="text-white">Capacity Fade</span> and Thermal Runaway risks months before they impact grid stability. We model the electrochemical physics of stationary storage to prevent catastrophic failure.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Calendar Aging Analysis", "HVAC-Correlated Risk", "String-Level Imbalance", "Fire Propagation Safety"].map((pill) => (
                  <span key={pill} className="px-3 py-1.5 text-[10px] font-bold bg-white/5 border border-white/10 text-gray-400 rounded-md uppercase tracking-wider">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Module 2: Attribution */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Activity className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold">Automated Root Cause Analysis (RCA)</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                Multi-signal diagnostics that separate manufacturing defects from operational stress. Secure <span className="text-white">defensible warranty claims</span> with engineering-grade explainability.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Cell-Level Attribution", "Warranty Risk Scoring", "Auxiliary System Correlation", "Explainable AI Outputs"].map((pill) => (
                  <span key={pill} className="px-3 py-1.5 text-[10px] font-bold bg-white/5 border border-white/10 text-gray-400 rounded-md uppercase tracking-wider">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — RACK MONITOR DASHBOARD */}
          <div className="sticky top-24 bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-6 flex justify-between items-center">
              <span>Rack-Level Degradation Profile</span>
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-emerald-500">SYSTEM: ONLINE</span>
              </div>
            </div>

            <RackViz />

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 my-6">
              {metrics.map(({ val, label, color }) => (
                <div key={label} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-colors">
                  <div className={`font-mono text-lg font-bold ${color}`}>{val}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Asset Risks */}
            <div className="space-y-4">
              {bars.map(({ label, pct, color, val }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                    <span>{label}</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
                  </div>
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