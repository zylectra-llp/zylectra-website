import React from "react";
import { TrendingUp, Zap, Brain, Clock } from "lucide-react";

const SectionTwo = () => {
	const items = [
		{
			icon: <Brain className="w-12 h-12 text-emerald-500" />,
			text: "AI Route Optimization with real-time battery & traffic data",
			bgGradient: "from-emerald-50 to-teal-50",
			borderColor: "border-emerald-200",
			glowColor: "shadow-emerald-100",
		},
		{
			icon: <Clock className="w-12 h-12 text-blue-500" />,
			text: "Cut charging downtime by up to 15% with smart scheduling",
			bgGradient: "from-blue-50 to-indigo-50",
			borderColor: "border-blue-200",
			glowColor: "shadow-blue-100",
		},
		{
			icon: <TrendingUp className="w-12 h-12 text-purple-500" />,
			text: "Boost fleet utilization by up to 20% with predictive dispatch",
			bgGradient: "from-purple-50 to-pink-50",
			borderColor: "border-purple-200",
			glowColor: "shadow-purple-100",
		},
		{
			icon: <Zap className="w-12 h-12 text-amber-500" />,
			text: "Dynamic re-routing based on driver behavior & energy patterns",
			bgGradient: "from-amber-50 to-orange-50",
			borderColor: "border-amber-200",
			glowColor: "shadow-amber-100",
		},
	];

	return (
		<section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-32 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
				<div
					className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>
				<div
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
			</div>

			{/* Grid pattern overlay */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>

			<div className="relative max-w-7xl mx-auto px-6 text-center">
				<div className="mb-16">
					<div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full mb-6 animate-fade-in">
						<Zap className="w-4 h-4 mr-2" />
						Fleet Optimization Platform
					</div>

					<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in">
						<span className="block mb-4">
							EV Fleet Management,{" "}
							<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
								Reimagined
							</span>
						</span>
						<span className="block">
							From Manual Planning to{" "}
							<span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
								AI-Powered Efficiency
							</span>
						</span>
					</h2>

					<p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
						Stop wasting time on manual route planning. Let AI optimize every
						mile, every charge, every vehicle.
					</p>
				</div>

				{/* Cards for features */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
					{items.map((item, index) => (
						<div
							key={index}
							className={`
                relative group bg-gradient-to-br ${item.bgGradient} 
                hover:shadow-2xl hover:${item.glowColor} 
                transition-all duration-700 ease-out
                rounded-3xl border-2 ${item.borderColor}
                p-8 flex flex-col items-center justify-center text-center 
                transform hover:-translate-y-4 hover:scale-105
                opacity-0 animate-fade-up backdrop-blur-sm
                min-h-[280px] cursor-pointer
              `}
							style={{
								animationDelay: `${0.5 + index * 0.2}s`,
								animationFillMode: "forwards",
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

							<div className="relative mb-8 p-4 bg-white/50 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
								<div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 rounded-2xl"></div>
								<div className="relative flex items-center justify-center">
									{item.icon}
								</div>
							</div>

							<p className="relative text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed tracking-wide">
								{item.text}
							</p>
						</div>
					))}
				</div>

				<div className="mt-20 opacity-0 animate-fade-in [animation-delay:1.5s] [animation-fill-mode:forwards]">
					<p className="text-lg text-gray-500 mb-6">
						Transform your EV fleet from reactive to predictive, from
						inefficient to optimized.
					</p>
					<div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent mx-auto animate-bounce"></div>
				</div>
			</div>

			<style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
      `}</style>
		</section>
	);
};

export default SectionTwo;

