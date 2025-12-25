import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ComingSoonPopup from "./Blogs";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showBlogPopup, setShowBlogPopup] = useState(false);

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
					? "bg-white/95 backdrop-blur-md shadow-lg border border-emerald-100/50"
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
						<span className="text-xl font-poppins font-bold text-gray-900">
							Zylectra
						</span>
					</div>

					<div className="hidden md:flex items-center space-x-6 font-inter text-sm">
						<button
							onClick={() => scrollToSection("about")}
							className="text-gray-700 hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							About
						</button>
						<button
							onClick={() => scrollToSection("features")}
							className="text-gray-700 hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							Features
						</button>
						<button
							onClick={() => setShowBlogPopup(true)}
							className="text-gray-700 hover:text-emerald-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-emerald-50"
						>
							Blogs
						</button>
						<button
							onClick={() => scrollToSection("cta")}
							className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
						>
							Early Access
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
								onClick={() => scrollToSection("about")}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								About
							</button>
							<button
								onClick={() => scrollToSection("features")}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								Features
							</button>
							<button
								onClick={() => setShowBlogPopup(true)}
								className="text-gray-700 hover:text-emerald-600 transition-all px-4 py-2 rounded-lg hover:bg-emerald-50"
							>
								Blogs
							</button>
							<button
								onClick={() => scrollToSection("cta")}
								className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all transform hover:scale-105 hover:shadow-lg mx-4 mt-2"
							>
								Early Access
							</button>
						</div>
					</div>
				)}
			</div>
			<ComingSoonPopup
				isOpen={showBlogPopup}
				onClose={() => setShowBlogPopup(false)}
			/>
		</nav>
	);
};

export default Navbar;
