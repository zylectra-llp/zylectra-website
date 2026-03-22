import React from "react";
import { Link } from "react-router-dom";

const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="bg-gradient-to-br from-[#0a0a0f] via-[#0b0b12] to-[#050508] border-y border-white/10 px-6 md:px-16 py-28 text-center"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <div className="text-sm tracking-widest uppercase text-emerald-500 mb-4">
          Enterprise Deployment
        </div>

        {/* Heading */}
        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight"
        >
          Prevent BESS Downtime Before It Costs You Uptime.
        </h2>

        {/* Description */}
        <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-12">
          Prevent costly downtime and SLA breaches with Zylectra, get 4-8 months early warning and evidence-based root cause analysis 
          for your BESS.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <Link
            to="/pilot"
            aria-label="Request an enterprise pilot for Zylectra BESS intelligence platform"
            className="px-8 py-3 rounded-lg bg-emerald-500 text-black font-medium transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            Request Enterprise Pilot
          </Link>

          {/* Secondary CTA */}
          <a
            href="#demo"
            aria-label="Try the Zylectra BESS analysis demo for free"
            className="px-8 py-3 rounded-lg border border-emerald-500/60 text-emerald-500 font-medium transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500"
          >
            Try the Demo Free
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;