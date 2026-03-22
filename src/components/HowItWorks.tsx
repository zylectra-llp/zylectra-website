import React from "react";
import { Database, Atom, Target, Search, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Database,
    title: "Non-Invasive Data Integration",
    desc: "Seamlessly ingest existing BMS telemetry, thermal logs, and ambient sensor data. Zero hardware modifications or downtime required for deployment.",
  },
  {
    num: "02",
    icon: Atom,
    title: "Physics-Informed Processing",
    desc: "Our 'Digital Twin' models embed electrochemical laws directly into the neural network, ensuring predictions stay physically grounded, even in extreme climates.",
  },
  {
    num: "03",
    icon: Target,
    title: "Predictive Failure Window",
    desc: "Move beyond real-time alerts. Forecast remaining useful life (RUL) and identify specific racks trending toward thermal instability months in advance.",
  },
  {
    num: "04",
    icon: Search,
    title: "Root Cause Intelligence",
    desc: "Automatically isolate degradation drivers. Distinguish between manufacturing defects and operational stress for audit-ready warranty defensibility.",
  },
];

const Section4 = () => {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <header className="mb-16 md:mb-24">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.3em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            The Zylectra Architecture
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight max-w-4xl">
            From Raw Telemetry to <span className="text-emerald-400">Actionable Intelligence.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            Standard monitoring is reactive. Zylectra integrates physics-informed AI into your existing stack to predict failures before they disrupt your infrastructure.
          </p>
        </header>

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

              <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                {title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 text-sm mb-6 font-medium italic">
            Compatible with all major BMS protocols and SCADA systems.
          </p>
          
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
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