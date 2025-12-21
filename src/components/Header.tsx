import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_archipelago.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 pill-nav px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <a href="/" className="flex items-center gap-2 sm:gap-3">
              <img 
                src={logo} 
                alt="Archipelago" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
              />
              <span className="text-lg sm:text-xl font-bold tracking-wide">
                <span className="text-accent">ARCHI</span>
                <span className="text-primary">PELAGO</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="/" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all">
              Home
            </a>
            <a href="/overview" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all">
              Overview
            </a>
            <a href="/news" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all">
              News & Events
            </a>
            <a href="/results" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all">
              Results
            </a>
            <a href="/consortium" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all">
              Consortium
            </a>
            <a href="/contact" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all">
              Contact Us
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 sm:p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 mt-2 bg-card rounded-2xl border border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              <a href="/" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors">
                Home
              </a>
              <a href="/overview" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors">
                Overview
              </a>
              <a href="/news" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors">
                News & Events
              </a>
              <a href="/results" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors">
                Results
              </a>
              <a href="/consortium" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors">
                Consortium
              </a>
              <a href="/contact" className="text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors">
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
