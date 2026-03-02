import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<nav
			className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${isScrolled
					? "bg-black backdrop-blur-md shadow-lg border border-emerald-100/50"
					: "bg-transparent"
				} rounded-2xl`}
		>
			<div className="max-w-7xl mx-auto px-6 py-3">
				<div className="flex items-center justify-between">
					<div
						className="flex items-center gap-3 cursor-pointer"
						onClick={() => scrollToSection("hero")}
					>
						<img
							src="\image.jpg"
							alt="Zylectra Logo"
							className="w-10 h-10 object-contain mix-blend-multiply"
						/>
						<span className="text-2xl font-poppins font-bold text-white">
							Zylectra
						</span>
					</div>

					<div className="hidden md:flex items-center space-x-6 font-inter text-sm">
						<button
							onClick={() => scrollToSection("product")}
							className="text-white hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							Product
						</button>
						<button
							onClick={() => scrollToSection("demo")}
							className="text-white hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							Demo
						</button>
						<button
							onClick={() => scrollToSection("how-it-works")}
							className="text-white hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							How it Works
						</button>
						<button
							onClick={() => scrollToSection("about")}
							className="text-white hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							About Zylectra
						</button>
						<button
							onClick={() => scrollToSection("demo")}
							className="group flex items-center gap-2 bg-green-400 text-black px-5 py-2 rounded-md font-semibold text-sm"
							>
							<span>Try demo</span>
							<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
						</button>
					</div>

					<button
						className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6 text-gray-700" />
						) : (
							<Menu className="w-6 h-6 text-gray-700" />
						)}
					</button>
				</div>

				{isMobileMenuOpen && (
					<div className="md:hidden bg-white/95 backdrop-blur-md border-t border-emerald-100/50 py-4 mt-3 rounded-xl shadow-md">
						<div className="flex flex-col space-y-3 font-inter text-sm">
							<button
								onClick={() => scrollToSection("product")}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								Product
							</button>
							<button
								onClick={() => scrollToSection("demo")}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								Demo
							</button>
							<button
								onClick={() => scrollToSection("how-it-works")}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								How it Works
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								About Zylectra
							</button>
							<button
								onClick={() => scrollToSection("demo")}
								className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all transform hover:scale-105 hover:shadow-lg mx-4 mt-2"
							>
								Try demo
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
