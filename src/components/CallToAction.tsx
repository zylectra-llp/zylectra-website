import React from "react";

const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-[#0a0a0f] via-[#0b0b12] to-[#050508] border-y border-white/10 px-6 md:px-16 py-28 text-center"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <div className="text-sm tracking-widest uppercase text-emerald-500 mb-4">
          Get Started
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight">
          Ready to Predict Before Failure Strikes?
        </h2>

        {/* Description */}
        <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-12">
          Integrate Zylectra’s physics-informed prediction engine into your
          battery infrastructure. Pilot programs available for OEM and EV
          partners ready to move beyond reactive warranty management.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <a
            href="#demo"
            className="px-8 py-3 rounded-lg bg-emerald-500 text-black font-medium transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            Try the Live Demo
          </a>

          {/* Secondary CTA */}
          <a
            href="mailto:info@zylectra.com"
            className="px-8 py-3 rounded-lg border border-emerald-500/60 text-emerald-500 font-medium transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500"
          >
            Request Pilot Program
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;