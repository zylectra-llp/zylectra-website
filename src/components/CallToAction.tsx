import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* eslint-disable react-refresh/only-export-components */

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

          <button
            type="button"
            title="See demo"
            aria-label="See Zylectra demo"
            className="relative group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            style={{
              letterSpacing: "0.015em",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.92)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(52,211,153,0.38)";
              e.currentTarget.style.background = "rgba(52,211,153,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
            onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="relative z-10 flex items-center gap-2">
              {/* Demo icon - play */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-emerald-300/90 group-hover:text-emerald-200 transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l10.29-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
              </svg>
              See demo
            </span>
            <span
              className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(52,211,153,0.18) inset, 0 10px 40px rgba(52,211,153,0.08)",
              }}
            />
          </button>
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-widest uppercase text-white/40">
          Six to twelve week pilot · No hardware · NDA-protected · We respond within two working days
        </p>
      </div>
    </section>
  );
};

export default CTA;
