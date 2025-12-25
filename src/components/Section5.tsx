import React from "react";

const SectionFive = () => {
  return (
    <section className="bg-gray-50 py-20 px-6" aria-labelledby="problem-solution-heading">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h2 id="problem-solution-heading" className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          Predicting battery failures 
          <span className="relative inline-block mx-2 mb-2">
            <span className="text-red-500 line-through decoration-4 decoration-red-500">is useless</span>
          </span>
          without action.
        </h2>

        {/* Problem vs Solution */}
        <div className="mb-12 space-y-6">
          <p className="text-xl md:text-2xl text-gray-700">
            The real problem isn't 
            <span className="font-semibold text-gray-500 mx-2">knowing it will fail</span>.
          </p>
          
          <div className="flex items-center justify-center space-x-4 my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="p-3 bg-emerald-600 rounded-full" aria-hidden="true">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-900">
            It's knowing 
            <span className="font-bold text-emerald-600 mx-2">why and what to do today</span>.
          </p>
        </div>

        {/* Visual Equation */}
        <div className="flex justify-center items-center space-x-6 mb-12 flex-wrap gap-4">
          {/* Fleet Battery Data */}
          <div className="text-center">
            <div className="w-20 h-14 bg-gray-300 rounded-xl border-2 border-gray-400 flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">Fleet Data</p>
          </div>

          <p className="text-xl md:text-2xl text-gray-900">+</p>
          {/* Root Cause AI */}
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-2 relative">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-3 bg-emerald-400 animate-pulse"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 90}deg) translateY(-12px)`,
                    animationDelay: `${i * 200}ms`
                  }}
                  aria-hidden="true"
                ></div>
              ))}
            </div>
            <p className="text-sm text-emerald-600 font-semibold">Root Cause AI</p>
          </div>

					<div className="text-2xl text-gray-400"> = </div>
          {/* Action Plan */}
          <div className="text-center">
            <div className="w-20 h-14 bg-emerald-600 rounded-xl border-2 border-emerald-500 flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-emerald-600 font-semibold">Action Plan</p>
          </div>
        </div>

        {/* Zylectra Statement */}
        <article className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <p className="text-xl text-gray-900 mb-4">
            Without a clear action plan, battery prediction is just expensive news. Fleet managers stay stuck: they know a battery will fail, but not why or what to change. Costs keep rising. Downtime keeps happening.
          </p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-emerald-600">Zylectra</span>
            <span className="text-xl text-gray-900">shows why and tells you what to fix.</span>
          </div>
          
          {/* Three Key Points */}
          <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-emerald-600 font-bold text-sm mb-2">See It Coming</div>
              <p className="text-gray-600 text-sm">Know which battery will fail weeks before it dies.</p>
            </div>
            <div className="text-center">
              <div className="text-emerald-600 font-bold text-sm mb-2">Understand Why</div>
              <p className="text-gray-600 text-sm">Your driver, your charging, your heat — we show you what's killing it.</p>
            </div>
            <div className="text-center">
              <div className="text-emerald-600 font-bold text-sm mb-2">Act Today</div>
              <p className="text-gray-600 text-sm">Fix the one thing that saves you the most money right now.</p>
            </div>
          </div>
          
          <p className="text-gray-600 italic mt-6">
            From prevention to action to savings — intelligence at every decision point in your fleet.
          </p>
        </article>

        {/* Schema.org Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why is battery prediction alone not enough?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Knowing a battery will fail is only the first step. Fleet managers need to understand why it's failing and what action to take. Zylectra explains the root cause and prescribes the exact intervention that saves the most money."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Zylectra different?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zylectra combines prediction with explanation and action. We show you which battery fails, why it fails (driver behavior, charging patterns, heat), and what to do today to prevent it and save money."
                }
              },
              {
                "@type": "Question",
                "name": "How does Zylectra help fleet managers save money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zylectra predicts failures before they happen and tells you the exact action to take to prevent them. This prevents costly downtime, extends battery life, and reduces unexpected replacement costs."
                }
              }
            ]
          })}
        </script>
      </div>
    </section>
  );
};

export default SectionFive;