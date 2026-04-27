import React from "react";
import { Database, Atom, LayoutDashboard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ── Three-stage animated pipeline ───────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: Database,
    title: "Load the telemetry your BMS already collects to Zylectra",
    desc: "Voltage, current, temperature, timestamps. Whatever your BMS logs today, in whatever format you log it. Batch uploads, API push, secure dump. All fine.",
    objection: "Kills: \"we'd need to retrofit.\"",
  },
  {
    num: "02",
    icon: Atom,
    title: "Our models read the data through the lens of electrochemistry",
    desc: "Our physics AI models don't just look for patterns. They check the data against the equations governing how lithium ions actually move. Where the data and the physics disagree, that's where degradation lives.",
    objection: "Kills: \"this is just another ML black box.\"",
  },
  {
    num: "03",
    icon: LayoutDashboard,
    title: "You get predictions, mechanisms, and actions on a dashboard your team can use",
    desc: "Cell-level views for the engineer. Fleet-level views for the operator. Risk-tier views for the underwriter. One source of truth, three lenses.",
    objection: "Kills: \"my team doesn't have time to learn another tool.\"",
  },
];

const Section4: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.3em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            How it works
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight max-w-4xl">
            Three steps. <span className="text-emerald-400">No new hardware. No lab tests.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            From the telemetry your BMS already collects to a cell-level diagnosis you can defend in a room with your CFO. You do step one. We do steps two and three.
          </p>
        </header>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ num, icon: Icon, title, desc, objection }) => (
            <div
              key={num}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/[0.05] hover:border-emerald-500/30 flex flex-col"
            >
              <div className="font-mono text-[10px] tracking-widest text-emerald-500 mb-6 flex justify-between items-center">
                <span>STEP {num}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="mb-6 p-3 bg-emerald-500/10 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Icon size={24} className="text-emerald-400" />
              </div>

              <h3 className="text-lg font-bold text-white mb-4 leading-snug">{title}</h3>

              <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors mb-6 flex-grow">
                {desc}
              </p>

              <div className="font-mono text-[10px] tracking-widest uppercase text-emerald-400/70 pt-4 border-t border-white/5">
                {objection}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-gray-300 text-sm mb-6 font-medium italic">
            Six to twelve week pilot. NDA-protected. We respond within two working days.
          </p>
          <Link
            to="/pilot"
            className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Request a pilot
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section4;
