import React, { useState, useEffect } from "react";
import {
	ArrowRight,
	Car,
	MapPin,
	Battery,
	Sparkles,
	Target,
	Cpu,
	BarChartBig,
} from "lucide-react";

const Hero = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentFeature, setCurrentFeature] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 300);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const interval = setInterval(
			() => setCurrentFeature((prev) => (prev + 1) % 3),
			3000,
		);
		return () => clearInterval(interval);
	}, []);

	const scrollToCTA = () => {
		const el = document.getElementById("cta");
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	const features = [
		{
			title: "Adaptive Route Intelligence",
			description:
				"Continuously optimized routes that boost utilization and minimize downtime.",
			icon: Target,
			color: "from-emerald-400 to-teal-400",
		},
		{
			title: "AI-Powered Planning",
			description:
				"Automatically assigns the best vehicle and charging plan for every trip.",
			icon: Cpu,
			color: "from-teal-400 to-emerald-500",
		},
		{
			title: "Scenario Forecasting",
			description:
				"Run instant simulations to avoid delays and make better decisions.",
			icon: BarChartBig,
			color: "from-emerald-500 to-green-400",
		},
	];

	return (
		<section
			id="hero"
			className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 xs:px-6 pt-20 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-teal-900/10"
		>
			{/* BACKGROUND */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50/80 to-white/90"></div>

				{/* Smaller orbs for mobile */}
				<div className="absolute top-10 left-5 w-40 xs:w-56 sm:w-72 h-40 xs:h-56 sm:h-72 bg-emerald-200/30 rounded-full blur-2xl animate-pulse"></div>

				<div className="absolute bottom-10 right-5 w-36 xs:w-48 sm:w-64 h-36 xs:h-48 sm:h-64 bg-green-300/25 rounded-full blur-xl animate-bounce"></div>
			</div>

			{/* FLOATING ICONS */}
			<div className="absolute inset-0 pointer-events-none scale-75 xs:scale-90 sm:scale-100">
				<div className="absolute top-20 right-10 animate-float">
					<div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-emerald-200/30 shadow-md">
						<Car className="w-6 h-6 text-emerald-500" />
					</div>
				</div>

				<div className="absolute bottom-28 left-10 animate-float-delayed">
					<div className="p-2 bg-white/10 rounded-xl border border-green-200/40 shadow-md">
						<Battery className="w-5 h-5 text-green-500" />
					</div>
				</div>
			</div>

			{/* CONTENT */}
			<div className="relative z-10 max-w-6xl mx-auto text-center py-5">
				{/* BADGE */}
				<div
					className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
						}`}
				>
					<div className="inline-flex items-center gap-2 px-5 xs:px-6 py-2 xs:py-3 bg-emerald-100 rounded-full shadow-md mb-6 xs:mb-10">
						<Sparkles className="w-4 xs:w-5 h-4 xs:h-5 text-emerald-600 animate-spin" />
						<span className="text-emerald-700 text-sm xs:text-base sm:text-lg font-semibold">
							AI-Powered Fleet Intelligence
						</span>
					</div>
				</div>

				{/* HEADINGS */}
				<div
					className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
						}`}
				>
					<p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent leading-tight">
						Optimize every mile.
					</p>

					<p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mt-3">
						Maximize every vehicle.
					</p>
				</div>

				{/* DESCRIPTION */}
				<div
					className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
						}`}
				>
					<p className="mt-6 text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
						AI-driven route & charging optimization that cuts downtime by 15%
						and boosts utilization by 20%.
					</p>
				</div>

				{/* CTA BUTTON */}
				<div
					className={`px-3 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
						}`}
				>
					<button
						onClick={scrollToCTA}
						className="mt-10 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 xs:px-10 py-3 xs:py-4 rounded-full text-base xs:text-lg sm:text-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto whitespace-nowrap"
					>
						<Target className="w-5 xs:w-6 h-5 xs:h-6 animate-pulse" />
						JOIN THE EARLY ACCESS WAITLIST
						<ArrowRight className="w-5 xs:w-6 h-5 xs:h-6 transition-transform group-hover:translate-x-1" />
					</button>
				</div>

				{/* FEATURE CARDS */}
				<div
					className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
						}`}
				>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 py-5 px-5">
						{features.map((feature, index) => {
							const Icon = feature.icon;
							const active = currentFeature === index;

							return (
								<div
									key={index}
									className={`p-6 rounded-3xl bg-white/90 backdrop-blur-xl border-2 shadow-lg transition-all duration-500 text-center ${active
											? "scale-105 border-emerald-300 shadow-emerald-200"
											: "hover:scale-105 border-emerald-200/40"
										}`}
								>
									<div
										className={`mx-auto w-12 xs:w-14 h-12 xs:h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-md ${active ? "animate-pulse" : ""
											}`}
									>
										<Icon className="text-white w-6 h-6" />
									</div>

									<h3 className="mt-4 font-semibold text-gray-800 text-base xs:text-lg">
										{feature.title}
									</h3>
									<p className="text-gray-600 text-sm mt-2 leading-relaxed">
										{feature.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Floating Animations */}
			<style>{`
        @keyframes float { 
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-delayed { 
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
		</section>
	);
};

export default Hero;

