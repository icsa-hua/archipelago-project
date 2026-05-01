import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo_archipelago.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "@/components/LoginModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

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

  const closeMobileMenu = () => setIsMenuOpen(false);

  const navItemClass =
    "text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 transition-all";

  const navItemMobileClass =
    "text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 transition-colors";

  return (
    <>
      <header className="sticky top-0 z-50 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 pill-nav px-4 sm:px-6">
            {/* Logo */}
            <div className="flex items-center min-w-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <img
                  src={logo}
                  alt="Archipelago"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
                />
                <span className="text-lg sm:text-xl font-bold tracking-wide">
                  <span className="text-accent">ARCHI</span>
                  <span className="text-primary">PELAGO</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className={navItemClass}>
                {t("nav.home")}
              </Link>
              <Link to="/overview" className={navItemClass}>
                {t("nav.overview")}
              </Link>
              {/* <Link to="/exchange" className={navItemClass}>
                Exchange
              </Link> */}
              <Link to="/news" className={navItemClass}>
                {t("nav.news")}
              </Link>
              <Link to="/results" className={navItemClass}>
                {t("nav.results")}
              </Link>
              <Link to="/consortium" className={navItemClass}>
                {t("nav.consortium")}
              </Link>
              <Link to="/contact" className={navItemClass}>
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Auth Button */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-primary/30">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm font-semibold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium max-w-[100px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-border z-50">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-primary mt-1 capitalize">
                        {user.role === 'professor' 
                          ? (language === 'en' ? 'Professor' : 'Professeur')
                          : (language === 'en' ? 'Student' : 'Étudiant')}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/exchange" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Exchange
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Sign Out' : 'Déconnexion'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-1.5 border-primary/30 hover:bg-primary/10"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Sign In' : 'Connexion'}
                  </span>
                </Button>
              )}

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-border hover:bg-primary/10 transition-all"
                aria-label="Toggle language"
              >
                {language === "en" ? "FR" : "EN"}
              </button>

              {/* Theme Toggle */}
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
                className="lg:hidden p-1.5 sm:p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 px-4 mt-2 bg-card rounded-2xl border border-border animate-fade-in">
              <nav className="flex flex-col gap-2">
                <Link to="/" className={navItemMobileClass} onClick={closeMobileMenu}>
                  {t("nav.home")}
                </Link>
                <Link to="/overview" className={navItemMobileClass} onClick={closeMobileMenu}>
                  {t("nav.overview")}
                </Link>
                <Link to="/exchange" className={navItemMobileClass} onClick={closeMobileMenu}>
                  Exchange
                </Link>
                <Link to="/news" className={navItemMobileClass} onClick={closeMobileMenu}>
                  {t("nav.news")}
                </Link>
                <Link to="/results" className={navItemMobileClass} onClick={closeMobileMenu}>
                  {t("nav.results")}
                </Link>
                <Link to="/consortium" className={navItemMobileClass} onClick={closeMobileMenu}>
                  {t("nav.consortium")}
                </Link>
                <Link to="/contact" className={navItemMobileClass} onClick={closeMobileMenu}>
                  {t("nav.contact")}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
};

export default Header;
