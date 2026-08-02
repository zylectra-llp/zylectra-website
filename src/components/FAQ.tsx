import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ: React.FC = () => {
  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "Is Zylectra replacing our BMS?",
      a: (
        <>
          No. Your BMS remains responsible for real-time battery control,
          protection, and safety.
          <br />
          <br />
          Zylectra sits above the existing battery data layer. We use the
          telemetry your systems already generate to understand how batteries
          are behaving over time, identify emerging degradation, explain what
          is driving it, and help your team decide what to do next.
          <br />
          <br />
          Think of your BMS as the system that keeps the battery operating.
          Zylectra is the intelligence layer that helps you make better
          decisions about the battery over its lifetime.
        </>
      ),
    },
    {
      q: "Do we need to install new hardware or change our existing setup?",
      a: (
        <>
          No new battery hardware is required for the standard deployment.
          <br />
          <br />
          Zylectra works with the data your battery systems already collect,
          such as voltage, current, temperature, timestamps, and other
          available telemetry. Data can be provided through an existing API,
          data pipeline, or secure file transfer, depending on your setup.
          <br />
          <br />
          The exact data requirements depend on the use case and the level of
          intelligence you want to build.
        </>
      ),
    },
    {
      q: "What does Zylectra actually tell us?",
      a: (
        <>
          Zylectra is designed to answer four questions:
          <br />
          <br />
          <strong className="text-[var(--text)]">
            What is changing?
          </strong>{" "}
          Which batteries or assets are showing signs of changing behavior or
          degradation.
          <br />
          <br />
          <strong className="text-[var(--text)]">
            Why is it changing?
          </strong>{" "}
          What underlying degradation mechanisms may be driving that behavior.
          <br />
          <br />
          <strong className="text-[var(--text)]">
            What should we do next?
          </strong>{" "}
          Whether an asset should continue operating, be moved to a different
          duty cycle, be serviced, derated, or retired.
          <br />
          <br />
          <strong className="text-[var(--text)]">
            What does it mean for the business?
          </strong>{" "}
          How those decisions can affect battery life, availability, asset
          utilization, and economic value.
        </>
      ),
    },
    {
      q: "We don't control all of the battery data. Can we still use Zylectra?",
      a: (
        <>
          Potentially, yes. The key requirement is access to the telemetry
          needed for the specific use case.
          <br />
          <br />
          If the data is controlled by an OEM, BMS provider, battery
          manufacturer, or financing partner, they may need to be involved.
          <br />
          <br />
          We can work with you to identify exactly what data is available and
          who needs to be involved before starting a deployment.
        </>
      ),
    },
    {
      q: "Can Zylectra work with different battery chemistries and applications?",
      a: (
        <>
          Zylectra is built for lithium-ion batteries across different
          applications.
          <br />
          <br />
          The specific intelligence and outputs depend on the chemistry,
          operating conditions, available telemetry, and use case. Our work
          spans applications where battery degradation and asset value matter,
          including EVs, fleets, swapping networks, and energy storage.
          <br />
          <br />
          We evaluate each deployment based on the data and operating
          environment available.
        </>
      ),
    },
    {
      q: "Will Zylectra see our proprietary battery IP?",
      a: (
        <>
          Zylectra's standard data requirements are focused on operational
          telemetry rather than your proprietary battery designs.
          <br />
          <br />
          We generally work with data such as voltage, current, temperature,
          timestamps, and other operational signals. We do not need your BMS
          source code or proprietary pack design to provide the core
          intelligence layer.
          <br />
          <br />
          Data access, ownership, confidentiality, and retention are defined
          upfront as part of the engagement and can be covered under an NDA.
        </>
      ),
    },
    {
      q: "How do we know Zylectra will work for our batteries?",
      a: (
        <>
          We start with the data and the business problem, not a one-size-fits-
          all deployment.
          <br />
          <br />
          During an initial engagement, we assess the available telemetry,
          operating conditions, battery population, and the decision you want
          to improve. From there, we define a focused validation or pilot
          around a measurable outcome.
          <br />
          <br />
          The goal is to demonstrate value on your own battery data before
          moving toward a broader deployment.
        </>
      ),
    },
    {
      q: "What happens to our data after the engagement?",
      a: (
        <>
          Your raw battery telemetry remains yours.
          <br />
          <br />
          Data access, storage, retention, and deletion terms are agreed as
          part of the engagement. We can also define how derived insights and
          model learnings are handled based on the specific deployment.
          <br />
          <br />
          Our objective is to give you useful battery intelligence without
          requiring you to give up ownership of your underlying operational
          data.
        </>
      ),
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 bg-[var(--bg)] text-[var(--text)] overflow-hidden border-t border-[rgba(var(--fg-rgb),0.05)]"
    >
      {/* Background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase mb-4">
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] tracking-tight max-w-3xl leading-tight">
            Before you put your{" "}
            <span className="text-emerald-400">
              battery data to work.
            </span>
          </h2>

          <p className="mt-5 text-[var(--text-muted)] max-w-2xl text-base md:text-lg leading-relaxed">
            The practical questions teams ask before bringing Zylectra into
            their battery operations.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                    : "border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.02)] hover:border-[rgba(var(--fg-rgb),0.2)]"
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
                      Q{String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-base md:text-lg font-semibold text-[var(--text)] leading-snug">
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
                      <Plus className="w-5 h-5 text-[rgba(var(--fg-rgb),0.4)]" />
                    )}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-400 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-7 pb-7 pt-0 md:pl-[5.25rem] text-[var(--text-muted)] text-sm md:text-[15px] leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-14 flex flex-col items-center text-center">
          <p className="text-[var(--text-faint)] text-sm mb-5">
            Have a question about your battery data or use case?
          </p>

          <a
            href="/contact"
            title="Talk to the Zylectra team"
            aria-label="Talk to the Zylectra team"
            className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-emerald-400 text-black font-bold text-base md:text-lg shadow-lg shadow-emerald-400/10 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_4px_40px_rgba(52,211,153,0.18)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            style={{ letterSpacing: "0.015em", minWidth: 220 }}
          >
            Talk to us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;