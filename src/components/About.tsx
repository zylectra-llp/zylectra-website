import React from 'react';
import { Award, GraduationCap, Trophy } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <img src="/image.jpg" alt="Zylectra Logo - AI Battery Intelligence Platform" className="w-12 h-12 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About <span className="text-emerald-600">Zylectra</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mt-3">
              Zylectra is an AI-powered battery intelligence platform designed to help EV and battery manufacturers predict battery failures, optimize second-life value, and reduce warranty costs by 15-30%. We bridge the critical gap between controlled lab testing and real-world battery performance.
            </p>
          </div>
        </div>

        {/* Recognition Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* VentureLab Thapar Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <article className="relative bg-white p-6 rounded-2xl border-2 border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                  INCUBATED
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">VentureLab Thapar</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Incubated at <span className="font-semibold text-emerald-700">VentureLab Thapar University</span> with <span className="font-semibold text-emerald-700">₹4 lakhs in grants</span> to develop our battery intelligence technology.
              </p>
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-600">Incubation Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-600">₹4 Lakhs Funding Grant</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <img src="/thapar innovate.jpg" alt="VentureLab Thapar University Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-gray-500 font-medium">VentureLab Thapar</span>
              </div>
            </article>
          </div>

          {/* IHFC IIT Delhi Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <article className="relative bg-white p-6 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  SELECTED
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">IHFC IIT Delhi</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Selected for the <span className="font-semibold text-blue-700">READY Program</span> by Innovation and Startup Hub, IIT Delhi to scale battery intelligence innovations.
              </p>
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-600">READY Program Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-600">Mentorship & Support</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <img src="/ihfc.jpg" alt="IHFC IIT Delhi Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-gray-500 font-medium">READY Program - IIT Delhi</span>
              </div>
            </article>
          </div>

          {/* TiE Chandigarh Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <article className="relative bg-white p-6 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <div className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                  FINALIST
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">TiE Chandigarh</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                Won <span className="font-semibold text-orange-700">1st Runner Up</span> and <span className="font-semibold text-orange-700">₹1 lakh prize</span> at the TiE Chandigarh Global Startup Finale 2025.
              </p>
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-600">1st Runner Up Award</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold text-sm">✓</span>
                  <span className="text-xs text-gray-600">₹1 Lakh Prize Money</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <img src="/tie.png" alt="TiE Chandigarh Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-gray-500 font-medium">TiE Finale 2025</span>
              </div>
            </article>
          </div>
        </div>

        {/* Bottom Recognition Banner */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-4 rounded-2xl border border-emerald-200 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
              <div className="w-1 h-1 bg-emerald-300 rounded-full animate-pulse delay-600"></div>
            </div>
            <span className="text-lg font-bold text-emerald-800">Backed by Innovation Leaders in Battery AI</span>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-emerald-300 rounded-full animate-pulse delay-600"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
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