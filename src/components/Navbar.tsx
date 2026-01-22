import { useEffect, useState, useRef, useCallback } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const location = useLocation();

  const { theme } = useAppSelector((state) => state.theme);
  const { cart } = useAppSelector((state) => state.products);
  const { logged, loggedUser } = useAppSelector((state) => state.profile);

  // Close mobile nav on route change
  useEffect(() => {
    setOpenNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside to close menu
  
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

  // Navigate and close menu
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    setOpenNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  return (
    <header className={`transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav 
        ref={navRef}
        className={`mx-auto max-w-7xl px-6 rounded-2xl transition-all duration-300 ${
          scrolled || openNav
            ? 'glass shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <div className="flex  hover:cursor-pointer">
          <button
            onClick={() => handleNavigate("/")}
            className="group "
          >
            <div className="flex items-center">
 <img
      src="/hola-icon.png"
      alt="Hola Fushion Logo"
      className=" h-10 w-auto rounded-full"
      />
    <span className=" ml-2 font-bold text-lg text-foreground">
      Hola Fushion
    </span>
      </div>

          </button>
      </div>
    

          {/* Center Nav Links - Desktop Only (above 768px) */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
            <button
              onClick={() => handleNavigate("/")}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t("common.home")}
            </button>
            <button
              onClick={() => handleNavigate("/products")}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t("common.shop")}
            </button>
            <button
              onClick={() => handleNavigate("/customer-service")}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t("footer.customerService")}
            </button>
          </div>

          {/* Right Actions - Always Visible */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Cart - Always Visible */}
            <button
              onClick={() => handleNavigate("/cart")}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-secondary transition-colors group"
            >
              <HiShoppingCart className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-semibold animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Language Toggle - Always Visible */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-full hover:bg-secondary transition-colors group"
              title={t("navbar.toggleLanguage")}
            >
              <HiLanguage className="text-lg text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-semibold text-foreground">{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle - Always Visible */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full hover:bg-secondary transition-colors group"
            >
              {theme ? (
                <CiDark className="text-xl text-foreground group-hover:text-primary transition-colors" />
              ) : (
                <MdOutlineLightMode className="text-xl text-foreground group-hover:text-primary transition-colors" />
              )}
            </button>

            {/* Desktop: Profile/Login - only above 768px */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-px h-6 bg-border mx-1" />
              {logged ? (
                <UserProfileMenu />
              ) : (
                <Button 
                  onClick={() => handleNavigate("/login")}
                  className="btn-premium px-5 py-2 text-white text-sm"
                >
                  {t("common.login")}
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle - below 768px */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <HiX className="h-6 w-6 text-foreground" />
              ) : (
                <HiMenu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - below 768px */}
        {openNav && (
          <div className="md:hidden py-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={() => handleNavigate("/")}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium text-start"
              >
                {t("common.home")}
              </button>
              <button
                onClick={() => handleNavigate("/products")}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium text-start"
              >
                {t("common.shop")}
              </button>
              <button
                onClick={() => handleNavigate("/customer-service")}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium text-start"
              >
                {t("footer.customerService")}
              </button>
            </div>

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-border/50">
              {logged ? (
                <div className="flex items-center gap-3 px-4 py-2">
                  <UserProfileMenu />
                  <span className="text-foreground font-medium">{loggedUser?.name}</span>
                </div>
              ) : (
                <div className="px-4">
                  <Button 
                    onClick={() => handleNavigate("/login")}
                    className="btn-premium w-full py-3 text-white"
                  >
                    {t("common.login")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
