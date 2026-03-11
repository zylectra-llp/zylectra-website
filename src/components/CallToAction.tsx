import React from "react";
import { Link } from "react-router-dom";

const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-[#0a0a0f] via-[#0b0b12] to-[#050508] border-y border-white/10 px-6 md:px-16 py-28 text-center"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <div className="text-sm tracking-widest uppercase text-emerald-500 mb-4">
          Enterprise Deployment
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight">
          Reduce Battery Failure Risk Before It Becomes Warranty Cost.
        </h2>

        {/* Description */}
        <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-12">
          Launch a structured pilot to model degradation trajectories,
          forecast failure windows, and quantify root-cause risk across
          your battery fleet. Built for OEMs and EV operators ready to
          move beyond reactive monitoring.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA - Enterprise */}
          <Link
            to="/pilot"
            className="px-8 py-3 rounded-lg bg-emerald-500 text-black font-medium transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            Request Enterprise Pilot
          </Link>

          {/* Secondary CTA - Simulation */}
          <a
            href="#demo"
            className="px-8 py-3 rounded-lg border border-emerald-500/60 text-emerald-500 font-medium transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500"
          >
            Try for free
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;