import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiHome, HiShoppingBag, HiUsers, HiExternalLink } from "react-icons/hi";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { darkMode, lightMode } from "@/redux/userSlices/themeSlice";
import { toggleLanguage } from "@/redux/userSlices/languageSlice";
import UserProfileMenu from "./UserProfileMenu";
import { useTranslation } from "@/hooks/useTranslation";

export default function AdminNav() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const location = useLocation();

  const { theme } = useAppSelector((state) => state.theme);
  const { logged } = useAppSelector((state) => state.profile);

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
  useEffect(() => {
    if (!openNav) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenNav(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
          {/* Logo & Brand */}
          
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
          {/* Center Nav Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
            <button
              onClick={() => handleNavigate("/admin")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                location.pathname === "/admin" 
                  ? "bg-primary text-white shadow-md" 
                  : "text-foreground hover:bg-white/50 dark:hover:bg-white/10"
              }`}
            >
              <HiHome className="text-lg" />
              {t("common.dashboard")}
            </button>
            <button
              onClick={() => handleNavigate("/admin/products")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                location.pathname.includes("/products")
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground hover:bg-white/50 dark:hover:bg-white/10"
              }`}
            >
              <HiShoppingBag className="text-lg" />
              {t("common.products")}
            </button>
            <button
              onClick={() => handleNavigate("/admin/users")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                location.pathname.includes("/users")
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground hover:bg-white/50 dark:hover:bg-white/10"
              }`}
            >
              <HiUsers className="text-lg" />
              {t("common.users")}
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Go to Site Button */}
            <button
              onClick={() => handleNavigate("/")}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors text-sm font-medium group"
              title={t("common.goToSite")}
            >
              <HiExternalLink className="text-lg group-hover:text-primary transition-colors" />
              <span className="hidden lg:inline">{t("common.goToSite")}</span>
            </button>

            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

            {/* Language */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-secondary transition-colors group"
            >
              <HiLanguage className="text-lg text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-semibold text-foreground">{language.toUpperCase()}</span>
            </button>

            {/* Theme */}
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

            {/* Profile */}
            <div className="hidden md:block">
              {logged && <UserProfileMenu />}
            </div>

            {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        {openNav && (
          <div className="md:hidden py-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={() => handleNavigate("/admin")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium text-start"
              >
                <HiHome className="text-xl" />
                {t("common.dashboard")}
              </button>
              <button
                onClick={() => handleNavigate("/admin/products")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium text-start"
              >
                <HiShoppingBag className="text-xl" />
                {t("common.products")}
              </button>
              <button
                onClick={() => handleNavigate("/admin/users")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium text-start"
              >
                <HiUsers className="text-xl" />
                {t("common.users")}
              </button>
              
              <div className="h-px bg-border my-2" />
              
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:bg-primary/5 transition-colors font-medium text-start"
              >
                <HiExternalLink className="text-xl" />
                {t("common.goToSite")}
              </button>
            </div>

            {logged && (
              <div className="px-4 pt-2 border-t border-border/50">
                <UserProfileMenu />
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
