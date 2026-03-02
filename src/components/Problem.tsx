import React from "react";
import { XCircle, CheckCircle } from "lucide-react";

const SectionTwo = () => {
  const problems = [
    "Detects failures after damage is done",
    "Pure statistics, no physics understanding",
    "Single data source (voltage/temp only)",
    "Can't attribute fault to root cause",
    "High false positive rates",
  ];

  const solutions = [
    "3–7× earlier failure prediction",
    "Physics constraints embedded in model",
    "Multi-modal: electrical, thermal, acoustic, usage",
    "Attribution: OEM defect vs user vs environment",
    "Explainable outputs for engineering teams",
  ];

  return (
    <section
      id="problem"
      className="relative py-28 bg-[#0b0f14] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute -top-40 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-emerald-400 rounded-full mb-6">
            The Problem
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Current Tools Are Flying Blind
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Battery failures cost OEMs billions in recalls and warranties,
            yet existing systems react too late and cannot explain the physics
            behind degradation.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Old Approach */}
          <div className="relative bg-white/5 border border-red-500/20 rounded-2xl p-10 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/70 rounded-t-2xl" />

            <div className="text-xs tracking-widest uppercase text-red-400 mb-4">
              ✗ Old Approach
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              Statistical & Rule-Based Systems
            </h3>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Threshold alerts and pattern libraries that react after damage
              occurs offering no insight into underlying electrochemical failure.
            </p>

            <ul className="space-y-4">
              {problems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Zylectra Approach */}
          <div className="relative bg-white/5 border border-emerald-500/30 rounded-2xl p-10 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-t-2xl" />

            <div className="text-xs tracking-widest uppercase text-emerald-400 mb-4">
              ✓ Zylectra Approach
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              Physics-Informed Intelligence
            </h3>

            <p className="text-gray-400 mb-8 leading-relaxed">
              AI constrained by electrochemical dynamics, thermal behavior,
              and degradation pathways predicting and explaining failures
              at the physics level.
            </p>

            <ul className="space-y-4">
              {solutions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
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