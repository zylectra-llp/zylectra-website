import React from "react";
import { XCircle, CheckCircle } from "lucide-react";

const SectionTwo = () => {
  const problems = [
    "Alerts fire only after damage is already irreversible",
    "No visibility into internal electrochemical state",
    "Degradation accumulates silently for months before any symptom",
    "When something fails, no one knows what caused it or who's responsible",
    "Unplanned failures are expensive in downtime, warranty, and trust",
  ];

  const solutions = [
    "4–8 months lead time, act before damage, not after",
    "Physics models that see inside the cell chemistry",
    "Continuous health tracking from day one, not just at failure",
    "Root cause attribution across every party that can cause a failure",
    "Protect the asset, the SLA, and the relationship",
  ];

  return (
    <section id="problem" className="relative py-16 md:py-28 bg-[#050508] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.2em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            The Visibility Gap
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Batteries Degrade in the Dark.<br />
            <span className="block mt-2 text-emerald-400">Until Now.</span>
          </h2>

          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Standard monitoring watches voltage and temperature metrics that only spike
            <span className="text-white block sm:inline"> after degradation is already irreversible.</span>{" "}
            Zylectra models the physics, not just the symptoms.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* Status Quo — Reactive */}
          <div className="group relative bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 transition-all hover:border-red-500/30">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">
                Reactive Monitoring
              </h3>
            </div>

            <p className="text-gray-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              Standard systems wait for a threshold breach. By the time the alarm sounds,
              the cell is already a liability, and the window to act has closed.
            </p>

            <ul className="space-y-4 md:space-y-5">
              {problems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 md:gap-4 text-gray-500 text-sm md:text-base font-medium"
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Zylectra — Proactive */}
          <div className="group relative bg-emerald-500/[0.02] border border-emerald-500/20 rounded-2xl md:rounded-3xl p-6 md:p-12 transition-all hover:border-emerald-500/40">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">
                Physics-AI Intelligence
              </h3>
            </div>

            <p className="text-gray-300 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              Zylectra models the internal chemical state. We detect the{" "}
              <span className="text-emerald-400 italic">cause</span> before the{" "}
              <span className="text-emerald-400 italic">symptom</span> appears,
              and tell you exactly which party is responsible.
            </p>

            <ul className="space-y-4 md:space-y-5">
              {solutions.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 md:gap-4 text-white text-sm md:text-base font-semibold"
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionTwo;