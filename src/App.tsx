import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { setAllUsers } from "@/redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
import { setLoading, setProducts, resetCart } from "@/redux/userSlices/productSlice";
import { initializeTheme } from "@/redux/userSlices/themeSlice";
import { initializeLanguage } from "@/redux/userSlices/languageSlice";
import { userApi, productApi } from "@/lib/api";

import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Navbar from "@/components/Navbar";
import AdminNav from "@/components/AdminNav";
import Loader from "@/components/Loader";
import NotFound from "@/pages/user/NotFound";

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const isAdminPath = pathname.startsWith("/admin");
  const [initialLoading, setInitialLoading] = useState(true);

  const { logged, loggedUser } = useAppSelector((state) => state.profile);
  const { productChanged, userChanged } = useAppSelector((state) => state.flags);

  // Initialize theme and language on mount
  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeLanguage());
  }, [dispatch]);

  // Fetch all users and logged user
  useEffect(() => {
    async function fetchInitialData() {
      try {
        // Fetch all users
        const users = await userApi.getAll();
        dispatch(setAllUsers(users));

        // Fetch logged user if exists
        const userId = localStorage.getItem("userI");
        if (userId) {
          try {
            const currentUser = await userApi.getById(userId);
            dispatch(setLoggedUser(currentUser));
            dispatch(setLogged(true));
          } catch {
            // User not found, clear the stored ID
            localStorage.removeItem("userI");
          }
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
        // Continue without users data
      } finally {
        setInitialLoading(false);
      }
    }

    fetchInitialData();
  }, [userChanged, dispatch]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch(setLoading(true));
        const products = await productApi.getAll();
        dispatch(setProducts(products));
      } catch (err) {
        console.error("Error fetching products:", err);
        // Continue without products data
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchProducts();
  }, [productChanged, dispatch]);

  // Reset cart only on logout
  useEffect(() => {
    if (!logged) {
      dispatch(resetCart());
    }
  }, [logged, dispatch]);

  // Loading screen - only for initial load
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b]">
        {isAdminPath ? <AdminNav /> : <Navbar />}
        <Loader />
      </div>
    );
  }

  // Admin check
  const isAdmin = loggedUser?.role === "admin";

  return (
    <Routes>
      <Route path="/*" element={<UserLayout />} />
      <Route
        path="/admin/*"
        element={isAdmin ? <AdminLayout /> : <NotFound />}
      />
    </Routes>
  );
}
