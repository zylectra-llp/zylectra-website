import React, { useState, useEffect } from "react";
import { TrendingUp, Zap, ArrowRight, Sparkles, Brain } from "lucide-react";

const SectionThree = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			className="relative py-32 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 overflow-hidden"
			id="features"
		>
			{/* Animated Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000"></div>
			</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Battery Intelligence
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8 leading-snug">
              Real-world battery insights
              <br />
              <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent animate-pulse">
                manufacturers can trust and act on.
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Zylectra is the{" "}
              <span className="font-bold text-gray-900 bg-gradient-to-r from-emerald-100 to-teal-100 px-2 py-1 rounded-lg">
                intelligent platform
              </span>
              {" "}for OEMs and battery makers to predict failures, optimize second-life value, and reduce warranty costs:
            </p>
          </div>
        </div>

        {/* Connection Cards */}
        <div className={`flex flex-col lg:flex-row justify-center items-center gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { icon: Brain, text: "Battery Health Prediction", color: "from-emerald-500 to-teal-500" },
            { icon: Zap, text: "Root Cause Analysis", color: "from-teal-500 to-emerald-600" },
            { icon: TrendingUp, text: "Warranty Intelligence", color: "from-emerald-600 to-green-500" },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 min-w-[280px]">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold text-lg">{item.text}</span>
                </div>
              </div>
              {index < 2 && (
                <ArrowRight className="hidden lg:block w-6 h-6 text-emerald-500 animate-pulse" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center mb-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <button
              onClick={() => scrollToSection("cta")}
              className="relative px-12 py-5 text-xl font-bold text-white rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
              aria-label="Request early access to Zylectra battery intelligence platform"
            >
              <Sparkles className="w-5 h-5 animate-spin" />
              Request Early Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            {
              title: "Predictive Battery Health Monitoring",
              description: "Monitor state-of-health (SoH) across entire fleets in real-time. Identify batteries at risk of failure weeks or months before they fail, enabling proactive warranty management and customer satisfaction.",
              image: "/battery.png",
              gradient: "from-emerald-500/10 to-teal-500/10",
              iconColor: "text-emerald-600",
              keyFeatures: "Real-time SoH assessment, Early failure detection, Predictive alerts",
            },
            {
              title: "Root Cause Discovery for Degradation",
              description: "AI-powered analysis reveals exactly why each battery degrades. Understand if issues stem from extreme temperatures, aggressive fast-charging patterns, manufacturing defects, or specific driving behaviors.",
              image: "/degradation.png",
              gradient: "from-teal-500/10 to-emerald-600/10",
              iconColor: "text-teal-600",
              keyFeatures: "Temperature analysis, Charging pattern detection, Design improvement insights",
            },
            {
              title: "Second-Life Value Optimization",
              description: "Predict optimal timing for battery transition from vehicles to energy storage. Maximize residual value and unlock 20-40% additional revenue per battery through data-driven second-life applications.",
              image: "/value.png",
              gradient: "from-emerald-600/10 to-green-500/10",
              iconColor: "text-emerald-700",
              keyFeatures: "Second-life readiness assessment, Residual value prediction, Market timing intelligence",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 delay-${(index + 1) * 100}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <article className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100/50 h-full flex flex-col">
                {/* Icon Container */}
                <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200/50 mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={feature.image}
                    alt={`${feature.title} Screenshot`}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </p>
                  
                  {/* Key Features */}
                  <div className="pt-4 border-t border-gray-200/50">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">Key Capabilities:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {feature.keyFeatures.split(", ").map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </article>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-20">
					<div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full shadow-inner">
						<div className="flex gap-2">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className={`w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse`}
									style={{ animationDelay: `${i * 200}ms` }}
								/>
							))}
						</div>
						<span className="text-gray-600 font-medium">
							Powered by Zylectra AI
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionThree;

