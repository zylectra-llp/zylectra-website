import React from 'react';
import { Award, Trophy } from 'lucide-react';

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-b from-[#060b16] via-[#050810] to-black text-white overflow-hidden"
    >
      {/* Subtle background gradient glows */}
      <div className="absolute -top-44 -right-36 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-44 -left-36 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="relative">
              <img
                src="/image.jpg"
                alt="Zylectra Logo - AI Battery Intelligence Platform"
                className="w-12 h-12 rounded-full border-2 border-emerald-400 shadow-lg"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About <span className="text-emerald-400">Zylectra</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed hidden sm:block">
            Bridging the gap between electrochemical physics and artificial intelligence to secure the world's energy transition.
          </p>
        </div>

        {/* Recognition Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {/* VentureLab Thapar Card */}
          <div className="group relative transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
            <article className="relative bg-white p-7 rounded-2xl border border-emerald-500/20 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="px-3 py-1 bg-emerald-500/80 text-white text-xs font-bold rounded-full tracking-wide">
                  INCUBATED
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">VentureLab Thapar</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                Incubated at <span className="font-semibold text-emerald-600">VentureLab Thapar</span> with <span className="font-semibold text-emerald-600">₹4 lakhs in grants</span> to develop our battery intelligence technology.
              </p>
              <div className="space-y-2 pt-4 border-t border-emerald-900/30">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-500">Incubation Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-500">₹4 Lakhs Funding Grant</span>
                </div>
              </div>
              <div className="pt-5 mt-5 border-t border-black/10 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-black">
                  Backed by
                </span>
                <img
                  src="/venture-lab-logo.svg"
                  alt="VentureLab Thapar University"
                  className="h-7 w-auto object-contain opacity-100"
                />
              </div>
            </article>
          </div>

          {/* TiE Chandigarh Card */}
          <div className="group relative transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-lg opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
            <article className="relative bg-white p-7 rounded-2xl border border-orange-400/30 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-400/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-orange-400" />
                </div>
                <div className="px-3 py-1 bg-orange-600/80 text-white text-xs font-bold rounded-full tracking-wide">
                  FINALIST
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">TiE Chandigarh</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                Won <span className="font-semibold text-orange-500">1st Runner Up</span> and <span className="font-semibold text-orange-500">₹1 lakh prize</span> at the TiE Chandigarh Global Startup Finale 2025.
              </p>
              <div className="space-y-2 pt-4 border-t border-orange-900/30">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-500">1st Runner Up Award</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-500">₹1 Lakh Prize Money</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-orange-900/30 mt-3">
                <div>
                  <img
                    src="/tie-silicon-logo.png"
                    alt="TiE Chandigarh"
                    className="h-7 w-auto object-contain opacity-100"
                  />
                </div>
                <span className="text-xs text-black font-medium">TiE Finale 2025</span>
              </div>
            </article>
          </div>
        </div>

        {/* Schema.org Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Zylectra",
            "description": "AI-powered battery intelligence platform for EV and battery manufacturers",
            "url": "https://zylectra.com",
            "awards": [
              {
                "@type": "Award",
                "name": "1st Runner Up - TiE Chandigarh Global Startup Finale 2025",
                "awardDate": "2025",
                "award": "₹1 Lakh Prize"
              },
              {
                "@type": "Award",
                "name": "READY Program Selection - IIT Delhi",
                "awardDate": "2025"
              },
              {
                "@type": "Grant",
                "name": "VentureLab Thapar Incubation Grant",
                "amount": "₹4 Lakhs"
              }
            ]
          })}
        </script>
      </div>
    </section>
  );
};

export default About;