import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

/* eslint-disable react-refresh/only-export-components */

const FAQ: React.FC = () => {
  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "How is this different from what our BMS already gives us?",
      a: (
        <>
          Your BMS is reactive. It alarms after a threshold is crossed.
          <br />
          <br />
          Zylectra is predictive. It models internal electrochemistry to flag risk and name the mechanism earlier,
          using the same telemetry.
          <br />
          <br />
          By the time it alarms, the damage is already priced into your warranty reserve.
        </>
      ),
    },
    {
      q: "Do you need hardware installed or changes to our existing setup?",
      a: (
        <>
          No hardware, no firmware changes, no new sensors.
          <br />
          <br />
          We use the data you already log: voltage, current, temperature, and timestamps, via your existing data pipe.
        </>
      ),
    },
    {
      q: "We don't own the BMS data on our fleet. The OEM does.",
      a: (
        <>
          If you do not control the telemetry, the OEM (or financier) needs to be involved.
          <br />
          <br />
          <a href="/pilot" className="text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline font-semibold">
            Book a 20-minute call
          </a>{" "}
          and we'll walk you through it — including a short one-pager you can forward internally to get the right people in the room.
        </>
      ),
    },
    {
      q: "Our BMS vendor says they'll build this themselves.",
      a: (
        <>
          Some will try. Most will not, because this is closer to applied research than a firmware feature.
          <br />
          <br />
          If they do build it, the hard part is validation, root cause attribution, and auditability, not dashboards.
        </>
      ),
    },
    {
      q: "Does this work for BESS and non-EV applications?",
      a: (
        <>
          Yes. The physics-informed models work on any Li-ion chemistry.
          <br />
          <br />
          We've validated on LFP and NMC. If you're running Li-ion and failures cost you money, the conversation is worth having.
        </>
      ),
    },
    {
      q: "Will Zylectra see our IP if we send you our telemetry?",
      a: (
        <>
          We only need operational telemetry: voltage, current, temperature, and timestamps.
          <br />
          <br />
          We do not need cell chemistry, pack design, or BMS source code. NDA and data ownership terms are standard.
        </>
      ),
    },
    {
      q: "What happens to the data after the pilot?",
      a: (
        <>
          Your raw telemetry stays yours.
          <br />
          <br />
          We keep model learnings, and can support deletion terms for any copies we store within an agreed window.
        </>
      ),
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-28 bg-[#050508] text-white overflow-hidden border-t border-white/5"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="mb-14">
          <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase mb-4">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-3xl leading-tight">
            The questions you're probably <span className="text-emerald-400">already asking.</span>
          </h2>
          <p className="mt-5 text-white/55 max-w-2xl text-base md:text-lg leading-relaxed">
            Written the way an actual buyer asks them. If a question's missing, write to{" "}
            <a href="mailto:info@zylectra.com" className="text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline">
              info@zylectra.com
            </a>{" "}
            and we'll add it.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-5 text-left p-6 md:p-7 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="font-mono text-[11px] tracking-widest text-emerald-400/70 uppercase mt-1 flex-shrink-0">
                      Q{i + 1}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                      {item.q}
                    </h3>
                  </div>
                  <span
                    className={`flex-shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/40" />
                    )}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-7 pb-7 pt-0 md:pl-[5.25rem] text-white/65 text-sm md:text-[15px] leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-14 flex justify-center">
          <a
            href="/pilot"
            title="Book a call"
            aria-label="Book a call"
            className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-emerald-400 text-black font-bold text-base md:text-lg shadow-lg shadow-emerald-400/10 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_4px_40px_rgba(52,211,153,0.18)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            style={{ letterSpacing: "0.015em", minWidth: 220 }}
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
