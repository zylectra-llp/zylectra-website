import React from "react";
import {
	CheckCircle,
	BatteryWarning,
	Star,
	Zap,
	AlertTriangle,
	TrendingDown,
	TrendingUp,
	Clock,
} from "lucide-react";

const Section6 = () => {
	return (
		<section className="relative py-16 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400 rounded-full blur-2xl animate-pulse"></div>
				<div className="absolute bottom-20 right-20 w-40 h-40 bg-red-400 rounded-full blur-2xl animate-pulse"></div>
			</div>

			<div className="max-w-6xl mx-auto relative z-10">
				<div className="text-center mb-10">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
						Be the fleet operator{" "}
						<span className="relative inline-block">
							<span className="text-emerald-600">that competes smarter</span>
							<div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
						</span>
					</h2>
				</div>

				<div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{/* With Zylectra Section */}
					<div className="relative group">
						<div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
						<div className="relative bg-white rounded-2xl shadow-xl border-2 border-emerald-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
							<div className="flex flex-col gap-3 sm:flex-row items-start sm:items-center justify-between mb-6">
								<h3 className="text-xl sm:text-2xl font-bold text-emerald-700 flex items-center gap-3">
									<div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
										<CheckCircle className="w-6 h-6 text-emerald-600" />
									</div>
									With Zylectra
								</h3>
								<div className="px-3 py-1 bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-full">
									OPTIMIZED FLEET
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
									<div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
										<TrendingUp className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-800 font-medium text-sm sm:text-base">
										20% boost in fleet utilization
									</span>
								</div>

								<div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
									<div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
										<Clock className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-800 font-medium text-sm sm:text-base">
										15% reduction in charging downtime
									</span>
								</div>

								<div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
									<div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
										<Zap className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-800 font-medium text-sm sm:text-base">
										AI-powered route optimization every trip
									</span>
								</div>

								<div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
									<div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
										<Star className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-800 font-medium text-sm sm:text-base">
										Predictive dispatch eliminates guesswork
									</span>
								</div>
							</div>

							<div className="mt-6 flex items-center justify-center">
								<div className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold">
									<div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
									<span>Maximum Profitability Mode</span>
								</div>
							</div>
						</div>
					</div>

					{/* Without Zylectra Section */}
					<div className="relative group">
						<div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
						<div className="relative bg-white rounded-2xl shadow-xl border-2 border-gray-300 p-8 hover:shadow-2xl transition-all duration-300">
							<div className="flex flex-col gap-3 sm:flex-row items-start sm:items-center justify-between mb-6">
								<h3 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-3">
									<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
										<AlertTriangle className="w-6 h-6 text-red-500" />
									</div>
									Without Zylectra
								</h3>
								<div className="px-3 py-1 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-full">
									HIGH INEFFICIENCY
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
									<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
										<TrendingDown className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-700 text-sm sm:text-base">
										10-20% vehicle utilization wasted
									</span>
								</div>

								<div className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
									<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
										<BatteryWarning className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-700 text-sm sm:text-base">
										Excessive charging downtime & delays
									</span>
								</div>

								<div className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
									<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
										<AlertTriangle className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-700 text-sm sm:text-base">
										Manual route planning wastes hours daily
									</span>
								</div>

								<div className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
									<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
										<Clock className="w-5 h-5 text-white" />
									</div>
									<span className="text-gray-700 text-sm sm:text-base">
										Surprise breakdowns disrupt operations
									</span>
								</div>
							</div>

							<div className="mt-6 flex items-center justify-center">
								<div className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full text-sm font-semibold">
									<div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
									<span>Revenue Leakage Mode</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center mt-8">
					<p className="text-gray-600 text-lg sm:text-xl">
						Which fleet operation do you want to run?
					</p>
				</div>
			</div>
		</section>
	);
};

export default Section6;

