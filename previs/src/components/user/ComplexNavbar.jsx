import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import { darkMode, lightMode } from "../../redux/userSlices/themeSlice";

export function ComplexNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { theme } = useSelector((state) => state.theme);
  const { cart } = useSelector((state) => state.products);
  const { logged, loggedUser } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  useEffect(() => {
    if (localStorage.theme == "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, []);

  return (
    <Navbar
      className="mx-auto max-w-screen-xl px-4 py-2 
    rounded-2xl shadow-lg overflow-hidden 
    transition-transform duration-300

    bg-gradient-to-l from-gray-50 to-gray-100 
    dark:bg-gradient-to-l dark:from-[#0f172a] dark:to-[#1e293b] 
"
    >
      <div className="flex items-center justify-between text-blue-gray-900     dark:text-white">
        <Typography
          as={Link}
          to="/"
          className="mr-4 md:text-4xl text-3xl cursor-pointer py-1.5 lg:ml-2 pt-serif-bold-italic"
        >
          Hola fushoin
        </Typography>

        <div className="flex gap-2 underline">
          <Typography
            as={Link}
            to="/"
            className=" cursor-pointer md:text-3xl text-2xl py-1.5 lg:ml-2 pt-serif-regular-italic"
          >
            Home
          </Typography>

          <Typography
            as={Link}
            to="/products "
            className="mr-4 cursor-pointer md:text-3xl text-2xl py-1.5 lg:ml-2 pt-serif-regular-italic"
          >
            Shop
          </Typography>
        </div>
        <div className="hidden gap-2 lg:flex">
          <div className="relative flex items-center">
            {logged ? (
              <Link to="/cart" className="hover:scale-125 transition-all">
                <ShoppingCartIcon className="h-6 w-6  " />
              </Link>
            ) : (
              <Link to="/login" className="hover:scale-125 transition-all">
                <ShoppingCartIcon className="h-6 w-6  " />
              </Link>
            )}

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow">
                {cart.length}
              </span>
            )}
          </div>
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              {theme ? (
                <CiDark
                  className="text-2xl   cursor-pointer transition-colors duration-300"
                  onClick={() => dispatch(darkMode())}
                />
              ) : (
                <MdOutlineLightMode
                  className="text-2xl dark:text-white  cursor-pointer transition-colors duration-300 "
                  onClick={() => dispatch(lightMode())}
                />
              )}
            </Typography>
          </ul>
          {logged ? (
            <UserProfile />
          ) : (
            <Link to="/login">
              <Button
                variant="text"
                size="sm"
                className="bg-teal-200 hover:bg-purple-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white"
              >
                Log In
              </Button>
            </Link>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="flex  w-full flex-nowrap items-center justify-center gap-2 lg:hidden">
          <div className="relative flex items-center">
            {logged ? (
              <Link to="/cart" className="hover:scale-125 transition-all">
                <ShoppingCartIcon className="h-6 w-6 text-black dark:text-white " />
              </Link>
            ) : (
              <Link to="/login" className="hover:scale-125 transition-all">
                <ShoppingCartIcon className="h-6 w-6   text-black dark:text-white " />
              </Link>
            )}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black  text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow">
                {cart.length}
              </span>
            )}
          </div>
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              {theme ? (
                <CiDark
                  className="text-2xl   cursor-pointer transition-colors duration-300"
                  onClick={() => dispatch(darkMode())}
                />
              ) : (
                <MdOutlineLightMode
                  className="text-2xl dark:text-white  cursor-pointer transition-colors duration-300 "
                  onClick={() => dispatch(lightMode())}
                />
              )}
            </Typography>
          </ul>
          {logged ? (
            <UserProfile />
          ) : (
            <Link to="/login">
              <Button
                variant="text"
                size="sm"
                className="bg-teal-200 hover:bg-purple-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white"
              >
                Log In
              </Button>
            </Link>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
