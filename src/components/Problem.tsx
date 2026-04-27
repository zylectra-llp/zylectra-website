import React, { useEffect, useRef, useState } from "react";
import { Atom, ArrowRight, History } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SectionTwo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const historianBullets = [
    {
      vague: "Pack-12: anomaly detected.",
      meta: "Source: pattern-matching ML",
    },
    {
      vague: "Cell voltage variance flagged.",
      meta: "Action: investigate.",
    },
    {
      vague: "Failure probability: elevated.",
      meta: "Confidence: not stated.",
    },
  ];

  const physicistBullets = [
    {
      sharp: "Cell 47B. SEI growth dominant. 41% of total fade attributable.",
      meta: "Failure window: Day 247 ± 9.",
    },
    {
      sharp: "Lithium plating onset detected on graphite anode.",
      meta: "Reduce charge current 8% above 80% SOC. Recovers ~4 months of useful life.",
    },
    {
      sharp: "Loss of Active Material in cathode. 96.5% attribution confidence.",
      meta: "Validated against ground-truth on NASA Ames cycling data.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="the-shift"
      className="relative py-20 md:py-28 bg-[#050508] overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-14 md:mb-20 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.2em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            The Shift
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.2]">
            Most battery AI is a historian.
            <span className="block mt-2 text-emerald-400">Yours should be a physicist.</span>
          </h2>

          <div className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed space-y-3">
            <p>
              Pattern-matching tools wait for a failure they’ve already seen. By then, your warranty is cooked.
            </p>
            <p>
              Physics-informed AI reads your data against the laws of electrochemistry, so it names the cause
              the first time it ever appears.
            </p>
            <p className="text-white font-semibold">
              One gives you a warning. The other gives you a diagnosis.
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Historian */}
          <div
            className={`group relative bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            } hover:border-red-500/30`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <History className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-wider uppercase">
                Pattern-matching AI
              </h3>
            </div>
            <p className="text-xs md:text-sm font-mono uppercase tracking-widest text-red-400/70 mb-7 ml-12">
              "The Historian"
            </p>

            <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
              Looks backward. Triggers when the data starts looking like a failure that already happened.
              By then the warranty is already cooked.
            </p>

            <div className="space-y-4">
              {historianBullets.map((b) => (
                <div
                  key={b.vague}
                  className="rounded-xl border border-white/5 bg-white/[0.015] p-4"
                >
                  <p className="text-gray-300 text-sm md:text-base font-medium leading-snug">
                    {b.vague}
                  </p>
                  <p className="font-mono text-[10.5px] tracking-wider text-red-400/60 mt-1.5 uppercase">
                    {b.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Physicist */}
          <div
            className={`group relative bg-emerald-500/[0.02] border border-emerald-500/20 rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            } hover:border-emerald-500/40`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Atom className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-wider uppercase">
                Physics-informed AI
              </h3>
            </div>
            <p className="text-xs md:text-sm font-mono uppercase tracking-widest text-emerald-400/70 mb-7 ml-12">
              "The Physicist"
            </p>

            <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
              Reads the same telemetry through the equations governing how lithium ions actually move.
              Names the mechanism, the timeline, and the action that earns the warranty back.
            </p>

            <div className="space-y-4">
              {physicistBullets.map((b) => (
                <div
                  key={b.sharp}
                  className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4"
                >
                  <p className="text-white text-sm md:text-base font-semibold leading-snug">
                    {b.sharp}
                  </p>
                  <p className="font-mono text-[10.5px] tracking-wider text-emerald-400/80 mt-1.5 uppercase">
                    {b.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-16 md:mt-24 flex justify-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection("film")}
            className="group inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-emerald-500 text-black text-lg md:text-xl font-bold transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_38px_rgba(16,185,129,0.38)]"
            aria-label='Watch what changes (opens the film demo section)'
          >
            Watch what changes
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
   
      </div>
    </section>
  );
};

export default SectionTwo;
