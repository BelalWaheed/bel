import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiShoppingCart, HiMenu, HiX } from "react-icons/hi";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { darkMode, lightMode } from "@/redux/userSlices/themeSlice";
import { toggleLanguage } from "@/redux/userSlices/languageSlice";
import { Button } from "@/components/ui/button";
import UserProfileMenu from "./UserProfileMenu";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();
  const location = useLocation();

  const { theme } = useAppSelector((state) => state.theme);
  const { cart } = useAppSelector((state) => state.products);
  const { logged } = useAppSelector((state) => state.profile);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Close nav on scroll
      if (openNav) {
        setOpenNav(false);
      }
    };

    // Close nav when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node) && openNav) {
        setOpenNav(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNav]);

  const toggleTheme = () => {
    if (theme) {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  };

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  };

  const handleLinkClick = () => {
    setOpenNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={` transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav 
        ref={navRef}
        className={`mx-auto max-w-7xl px-6 rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'glass shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block group-hover:gradient-text transition-all">
              Hola Fushion
            </span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t("common.home")}
            </Link>
            <Link
              to="/products"
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t("common.shop")}
            </Link>
            <Link
              to="/customer-service"
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t("footer.customerService")}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Cart */}
            <Link
              to="/cart"
              onClick={handleLinkClick}
              className="relative p-2.5 rounded-full hover:bg-secondary transition-colors group"
            >
              <HiShoppingCart className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-semibold animate-pulse">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-secondary transition-colors group"
              title={t("navbar.toggleLanguage")}
            >
              <HiLanguage className="text-lg text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-semibold text-foreground">{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-secondary transition-colors group"
            >
              {theme ? (
                <CiDark className="text-xl text-foreground group-hover:text-primary transition-colors" />
              ) : (
                <MdOutlineLightMode className="text-xl text-foreground group-hover:text-primary transition-colors" />
              )}
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1" />

            {/* Auth / Profile */}
            {logged ? (
              <UserProfileMenu />
            ) : (
              <Link to="/login" onClick={handleLinkClick}>
                <Button className="btn-premium px-5 py-2 text-white text-sm">
                  {t("common.login")}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <HiX className="h-6 w-6 text-foreground" />
            ) : (
              <HiMenu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {openNav && (
          <div className="lg:hidden py-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2 mb-4">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              >
                {t("common.home")}
              </Link>
              <Link
                to="/products"
                onClick={handleLinkClick}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              >
                {t("common.shop")}
              </Link>
              <Link
                to="/customer-service"
                onClick={handleLinkClick}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              >
                {t("footer.customerService")}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/cart"
                onClick={handleLinkClick}
                className="relative p-2.5 rounded-full hover:bg-secondary transition-colors"
              >
                <HiShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-semibold">
                    {cart.length}
                  </span>
                )}
              </Link>

              <button
                onClick={handleToggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-secondary transition-colors"
              >
                <HiLanguage className="text-lg" />
                <span className="text-xs font-semibold">{language.toUpperCase()}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-secondary transition-colors"
              >
                {theme ? <CiDark className="text-xl" /> : <MdOutlineLightMode className="text-xl" />}
              </button>

              {logged ? (
                <UserProfileMenu />
              ) : (
                <Link to="/login" onClick={handleLinkClick}>
                  <Button className="btn-premium px-5 py-2 text-white text-sm">
                    {t("common.login")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
