import React from "react";
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, Zap, AlertTriangle, Shield, DollarSign } from "lucide-react";

const Section6 = () => {
  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-400 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Be the fleet manager{" "}
            <span className="relative inline-block">
              <span className="text-emerald-600">that prevents failures</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
            </span>
          </h2>
          <p className="text-gray-600 text-lg mt-4">See what Zylectra means for your fleet's uptime and profit</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* With Zylectra Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <article className="relative bg-white rounded-2xl shadow-xl border-2 border-emerald-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-emerald-700 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  With Zylectra
                </h3>
                <div className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                  PREVENTIVE & PROFITABLE
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Know battery failures weeks ahead</p>
                    <p className="text-sm text-gray-600 mt-1">No more surprise breakdowns on the road</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Save thousands per prevented failure</p>
                    <p className="text-sm text-gray-600 mt-1">Action plan with dollar savings attached</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Understand exactly why it's failing</p>
                    <p className="text-sm text-gray-600 mt-1">Driver habits, charging times, heat stress — all clear</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Keep your fleet moving, not broken</p>
                    <p className="text-sm text-gray-600 mt-1">More uptime. Less downtime. More deliveries.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
                  <span>Proactive Prevention Mode</span>
                </div>
              </div>
            </article>
          </div>

          {/* Without Zylectra Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <article className="relative bg-white rounded-2xl shadow-xl border-2 border-gray-300 p-8 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-700 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  Without Zylectra
                </h3>
                <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  REACTIVE & COSTLY
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Battery fails without warning</p>
                    <p className="text-sm text-gray-600 mt-1">Discover problems only after roadside breakdown</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Thousands lost per failure</p>
                    <p className="text-sm text-gray-600 mt-1">Towing, repairs, lost deliveries, unhappy customers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">No idea why batteries are failing</p>
                    <p className="text-sm text-gray-600 mt-1">Can't fix driver habits or charging patterns</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Fleet margin bleeds away</p>
                    <p className="text-sm text-gray-600 mt-1">Unexpected costs destroy profitability</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span>Reactive & Uncertain Mode</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* CTA Text */}
        <div className="text-center mt-12">
          <p className="text-gray-700 text-lg font-semibold">
            Which fleet manager mindset will you choose?
          </p>
          <p className="text-gray-600 text-base mt-2">
            Zylectra transforms fleet management from fighting fires to preventing them. From losing money to keeping it.
          </p>
        </div>
      </div>

      {/* Schema.org Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ComparisonChart",
          "name": "Fleet Battery Management Comparison",
          "description": "Comparison of last-mile logistics fleet outcomes with and without Zylectra battery intelligence",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Battery Failure Warning",
              "with": "Know failures weeks in advance",
              "without": "Discover failures only after breakdown"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Cost Per Failure",
              "with": "Save thousands with prevention",
              "without": "Lose thousands per failure"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Root Cause Understanding",
              "with": "Know exactly why it's failing",
              "without": "No visibility into degradation"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Fleet Profitability",
              "with": "Keep margin, reduce surprises",
              "without": "Unexpected costs drain profit"
            }
          ]
        })}
      </script>
    </section>
  );
};

export default Section6;