import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    ["The Intelligence", "product"],
    ["Outcomes", "outcomes"],
    ["About", "about"],
  ] as const;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(var(--bg-rgb),0.8)] backdrop-blur-md shadow-2xl border border-[rgba(var(--fg-rgb),0.1)]"
          : "bg-transparent"
      } rounded-2xl`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={goHome}
            aria-label="Go to Zylectra home"
          >
            <img
              src="/image.jpg"
              alt="Zylectra Logo"
              className="w-10 h-10 object-contain"
            />

            <span className="text-xl font-bold text-[var(--text)] tracking-tight">
              Zylectra
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-[13px] tracking-wider">
            {navLinks.map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors px-3 py-2 whitespace-nowrap"
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2.5 rounded-xl font-bold ml-3 transition-all whitespace-nowrap"
            >
              <span>Contact us</span>

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-1">
          <button
            type="button"
            className="p-2 text-[var(--text)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[var(--surface)] border border-[rgba(var(--fg-rgb),0.1)] p-6 mt-3 rounded-2xl shadow-2xl animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-3 text-center">
              {navLinks.map(([label, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text)] py-3 text-base transition-colors"
                >
                  {label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="group flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-xl font-bold text-center transition-all mt-2"
              >
                <span>Contact us</span>

                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
