import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        if (location.pathname !== "/") {
          navigate(`/#${sectionId}`);
          return;
        }
      
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/80 backdrop-blur-md shadow-2xl border border-white/10"
                    : "bg-transparent"
                } rounded-2xl`}
        >
            <div className="max-w-7xl mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Brand Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => scrollToSection("hero")}
                    >
                        <img src="\image.jpg" alt="Zylectra Logo" className="w-10 h-10 object-contain"/>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Zylectra
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2 font-medium text-[13px] tracking-wider">
                        {[
                            ["What you get", "product"],
                            ["How it works", "how-it-works"],
                            ["Film",         "film"],
                            ["FAQ",          "faq"],
                        ].map(([label, id]) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className="text-gray-400 hover:text-white transition-colors px-4 py-2"
                            >
                                {label}
                            </button>
                        ))}

                        <Link
                            to="/pilot"
                            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2.5 rounded-xl font-bold ml-4 transition-all"
                        >
                            <span>Request a pilot</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-black border border-white/10 p-6 mt-3 rounded-2xl shadow-2xl animate-in slide-in-from-top-5">
                        <div className="flex flex-col space-y-4 text-center">
                            <button onClick={() => scrollToSection("product")}      className="text-gray-300 py-2">What you get</button>
                            <button onClick={() => scrollToSection("how-it-works")} className="text-gray-300 py-2">How it works</button>
                            <button onClick={() => scrollToSection("film")}         className="text-gray-300 py-2">Film</button>
                            <button onClick={() => scrollToSection("faq")}          className="text-gray-300 py-2">FAQ</button>
                            <Link
                                to="/pilot"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-emerald-500 text-black py-4 rounded-xl font-bold text-center"
                            >
                                Request a pilot
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;