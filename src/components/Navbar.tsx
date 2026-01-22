import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();

  const { theme } = useAppSelector((state) => state.theme);
  const { cart } = useAppSelector((state) => state.products);
  const { logged } = useAppSelector((state) => state.profile);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <nav className="mx-auto max-w-7xl px-4 py-2 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b]">
      <div className="flex items-center justify-between text-foreground">
        {/* Logo */}
        <Link
          to="/"
          className="mr-4 md:text-4xl text-3xl cursor-pointer py-1.5 lg:ml-2 pt-serif-bold-italic"
        >
          Hola fushoin
        </Link>

        {/* Nav Links */}
        <div className="flex gap-2 underline">
          <Link
            to="/"
            className="cursor-pointer md:text-3xl text-2xl py-1.5 lg:ml-2 pt-serif-regular-italic hover:text-primary transition-colors"
          >
            {t("common.home")}
          </Link>
          <Link
            to="/products"
            className="mr-4 cursor-pointer md:text-3xl text-2xl py-1.5 lg:ml-2 pt-serif-regular-italic hover:text-primary transition-colors"
          >
            {t("common.shop")}
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden gap-4 lg:flex items-center">
          {/* Cart */}
          <div className="relative flex items-center">
            <Link
              to={logged ? "/cart" : "/login"}
              className="hover:scale-125 transition-all"
            >
              <HiShoppingCart className="h-6 w-6" />
            </Link>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow">
                {cart.length}
              </span>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={handleToggleLanguage}
            className="p-1 cursor-pointer transition-colors duration-300 hover:text-primary flex items-center gap-1"
            title={t("navbar.toggleLanguage")}
          >
            <HiLanguage className="text-2xl" />
            <span className="text-sm font-semibold">{language.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 cursor-pointer transition-colors duration-300 hover:text-primary"
          >
            {theme ? (
              <CiDark className="text-2xl" />
            ) : (
              <MdOutlineLightMode className="text-2xl" />
            )}
          </button>

          {/* Auth / Profile */}
          {logged ? (
            <UserProfileMenu />
          ) : (
            <Link to="/login">
              <Button
                variant="secondary"
                size="sm"
                className="bg-teal-200 hover:bg-purple-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white"
              >
                {t("common.login")}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {openNav && (
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 lg:hidden">
          {/* Cart */}
          <div className="relative flex items-center">
            <Link
              to={logged ? "/cart" : "/login"}
              className="hover:scale-125 transition-all"
            >
              <HiShoppingCart className="h-6 w-6" />
            </Link>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow">
                {cart.length}
              </span>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={handleToggleLanguage}
            className="p-1 cursor-pointer transition-colors duration-300 flex items-center gap-1"
          >
            <HiLanguage className="text-2xl" />
            <span className="text-sm font-semibold">{language.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 cursor-pointer transition-colors duration-300"
          >
            {theme ? (
              <CiDark className="text-2xl" />
            ) : (
              <MdOutlineLightMode className="text-2xl" />
            )}
          </button>

          {/* Auth / Profile */}
          {logged ? (
            <UserProfileMenu />
          ) : (
            <Link to="/login">
              <Button
                variant="secondary"
                size="sm"
                className="bg-teal-200 hover:bg-purple-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white"
              >
                {t("common.login")}
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
