import React, { useEffect, useRef, useState } from "react";
import {
  BatteryWarning,
  IndianRupee,
  Gauge,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

const SectionTwo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      // threshold is a % of the whole section's own height, and this section
      // is taller than the viewport on mobile/tablet — a ratio-based
      // threshold can never be satisfied there. rootMargin fires as soon as
      // the section's top edge nears the viewport instead, independent of
      // how tall the section is.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => obs.disconnect();
  }, []);

  const problems = [
    {
      icon: BatteryWarning,
      title: "Unexpected Downtime",
      text:
        "Weak batteries often stay in service until they begin affecting vehicles and daily operations.",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      icon: IndianRupee,
      title: "Higher Battery Costs",
      text:
        "Healthy batteries are replaced too early while weaker ones continue running longer than they should.",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      icon: Gauge,
      title: "Lower Utilization",
      text:
        "Every battery is treated the same, even though every battery ages differently.",
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-28"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Background glow */}
      <div
        className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}

        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400 mb-6">
            THE REAL PROBLEM
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--text)] tracking-tight">
            Every wrong battery
            <span className="block text-emerald-400 mt-2">
              decision costs money.
            </span>
          </h2>

          <p className="mt-8 text-lg text-[var(--text-muted)] leading-relaxed max-w-3xl mx-auto">
            Every battery ages differently.
            Without knowing which batteries need attention,
            operators often replace healthy batteries too early,
            keep weak batteries running too long,
            or treat every battery the same.
          </p>

          <p className="mt-5 text-[var(--text)] font-semibold text-xl">
            The result is higher operating costs and lower fleet availability.
          </p>
        </div>

        {/* Problem Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">

          {problems.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className={`group rounded-3xl border ${item.border}
                bg-[rgba(var(--fg-rgb),0.02)]
                p-8 transition-all duration-700 hover:-translate-y-2 hover:border-emerald-500/30
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
              >

                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg}
                  flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>

                <h3 className="text-[var(--text)] text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-[var(--text-muted)] leading-relaxed text-base">
                  {item.text}
                </p>

              </div>

            );

          })}

        </div>

        {/* Divider */}

        <div
          className={`flex flex-col items-center mt-20 transition-all duration-700 delay-500 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <ArrowDown className="w-6 h-6 text-emerald-400 mb-4 animate-bounce" />

          <p className="uppercase tracking-[0.25em] text-xs font-bold text-emerald-400">
            WHY DOES THIS HAPPEN?
          </p>

          <h3 className="mt-5 text-3xl md:text-4xl font-bold text-[var(--text)] text-center">
            Most systems tell you
            <span className="block text-emerald-400 mt-2">
              what happened.
            </span>
          </h3>

          <p className="mt-6 text-[var(--text-muted)] text-lg max-w-2xl text-center leading-relaxed">
            Dashboards, health scores and alerts are useful,
            but they still leave operators asking the same three questions:
          </p>
        </div>

        {/* PART 2 CONTINUES HERE */}

                {/* Comparison */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">

{/* Current Approach */}

<div
  className={`rounded-3xl border border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.02)] p-8 transition-all duration-700 ${
    visible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8"
  }`}
>

  <div className="inline-flex items-center rounded-full bg-[rgba(var(--fg-rgb),0.05)] border border-[rgba(var(--fg-rgb),0.1)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] font-semibold mb-6">
    CURRENT APPROACH
  </div>

  <h3 className="text-3xl font-bold text-[var(--text)] mb-6">
    Battery dashboards
  </h3>

  <p className="text-[var(--text-muted)] leading-relaxed mb-8">
    Most systems monitor batteries well. They show health scores,
    alerts and charts. But operators still have to decide what those
    numbers actually mean.
  </p>

  <div className="space-y-4">

    {[
      "Health score",
      "Voltage & temperature alerts",
      "Battery dashboards",
      "Manual decisions"
    ].map((item) => (

      <div
        key={item}
        className="rounded-2xl border border-[rgba(var(--fg-rgb),0.05)] bg-[rgba(var(--fg-rgb),0.02)] p-4 flex items-center gap-4"
      >

        <div className="w-2 h-2 rounded-full bg-[rgba(var(--fg-rgb),0.4)]" />

        <span className="text-[var(--text)]">
          {item}
        </span>

      </div>

    ))}

  </div>

  <div className="mt-8 rounded-2xl bg-red-500/10 border border-red-500/20 p-5">

    <p className="text-red-300 font-semibold">
      They tell you what happened.
    </p>

    <p className="text-[var(--text-muted)] text-sm mt-2 leading-relaxed">
      You're still left figuring out which batteries need attention,
      why they're changing and what action to take.
    </p>

  </div>

</div>

{/* Zylectra */}

<div
  className={`rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.03] p-8 transition-all duration-700 delay-150 ${
    visible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8"
  }`}
>

  <div className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-400 font-semibold mb-6">
    WITH ZYLECTRA
  </div>

  <h3 className="text-3xl font-bold text-[var(--text)] mb-6">
    Better battery decisions
  </h3>

  <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
    Zylectra combines battery data with AI grounded in battery
    physics to help operators understand what is changing,
    why it's changing and what to do next.
  </p>

  <div className="space-y-4">

    {[
      "Know which batteries need attention",
      "Understand why they're changing",
      "Prioritize the right batteries first",
      "Decide what to do next"
    ].map((item) => (

      <div
        key={item}
        className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] p-4 flex items-center gap-4"
      >

        <div className="w-2 h-2 rounded-full bg-emerald-400" />

        <span className="text-[var(--text)]">
          {item}
        </span>

      </div>

    ))}

  </div>

  <div className="mt-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">

    <p className="text-emerald-300 font-semibold">
      It helps you decide what to do next.
    </p>

    <p className="text-[var(--text-secondary)] text-sm mt-2 leading-relaxed">
      Keep running. Monitor closely. Move to lighter duty.
      Replace only when it actually makes sense.
    </p>

  </div>

</div>

</div>

{/* Closing Statement */}

<div
className={`max-w-4xl mx-auto text-center mt-24 transition-all duration-700 delay-300 ${
  visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6"
}`}
>

<p className="text-3xl md:text-4xl font-bold leading-tight text-[var(--text)]">

  Every battery decision

  <span className="block text-emerald-400 mt-2">
    is a money decision.
  </span>

</p>

<div className="grid md:grid-cols-3 gap-5 mt-12">

  <div className="rounded-2xl border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] p-5">
    <p className="text-[var(--text)] font-semibold">
      Replace too early
    </p>
    <p className="text-[var(--text-muted)] mt-2 text-sm">
      Lose useful battery life.
    </p>
  </div>

  <div className="rounded-2xl border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] p-5">
    <p className="text-[var(--text)] font-semibold">
      Replace too late
    </p>
    <p className="text-[var(--text-muted)] mt-2 text-sm">
      Lose uptime and productivity.
    </p>
  </div>

  <div className="rounded-2xl border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] p-5">
    <p className="text-[var(--text)] font-semibold">
      Treat every battery the same
    </p>
    <p className="text-[var(--text-muted)] mt-2 text-sm">
      Lose money without knowing it.
    </p>
  </div>

</div>

</div>

{/* CTA */}

<div
className={`flex justify-center mt-16 transition-all duration-700 delay-500 ${
  visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6"
}`}
>

<a
  href="/poc"
  className="inline-flex items-center gap-3 rounded-2xl bg-emerald-400 px-8 py-4 text-black font-bold text-lg hover:bg-emerald-300 transition-all duration-300 shadow-lg shadow-emerald-400/10 hover:shadow-[0_4px_40px_rgba(52,211,153,0.2)]"
>
  Start a PoC
  <ArrowRight className="w-5 h-5" />
</a>

</div>

</div>
</section>
);
};

export default SectionTwo;