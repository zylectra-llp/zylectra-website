import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative bg-gradient-to-br from-[#0a0a0f] via-[#0b0b12] to-[#050508] border-y border-white/10 px-6 md:px-16 py-28 overflow-hidden"
    >
      {/* Soft glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[420px] bg-emerald-500/[0.07] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="text-sm tracking-widest uppercase text-emerald-500 mb-4">
          The ask
        </div>

        <h2
          id="cta-heading"
          className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight tracking-tight"
        >
          Your battery's future <span className="text-emerald-400">should be knowable.</span>
        </h2>

        <p className="text-white/65 max-w-xl mx-auto leading-relaxed mb-10 text-base md:text-lg">
          Six weeks. Telemetry you already have. If the predictions don't hold up against ground truth in your fleet, you walk away.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/pilot"
            aria-label="Request a Zylectra pilot"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-emerald-500 text-black font-bold transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            Request a pilot
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-widest uppercase text-white/40">
          Six to twelve week pilot · No hardware · NDA-protected · We respond within two working days
        </p>
      </div>
    </section>
  );
};

export default CTA;
