import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAllUsers } from "./redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "./redux/userSlices/profileSlice";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import {
  resetCart,
  setLoading,
  setProducts,
} from "./redux/userSlices/productSlice";
import ErrorSection7 from "./pages/user/ErrorSection7";
import axios from "axios";
import SimpleNav from "./components/admin/SimpleNav";
import { ComplexNavbar } from "./components/user/ComplexNavbar";

function App() {
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_URL;

  const { logged, loggedUser } = useSelector((state) => state.profile);
  const { productChanged, userChanged } = useSelector((state) => state.flags);
  const { loading } = useSelector((state) => state.products);

  const location = useLocation();
  const pathname = location.pathname;
  const isAdminPath = pathname.startsWith("/admin");

  // ------------------------------
  // Fetch all users and logged user
  // ------------------------------
  useEffect(() => {
    async function fetchInitialData() {
      try {
        dispatch(setLoading(true));

        // Fetch all users
        const usersRes = await axios.get(`${URL}/users`);
        dispatch(setAllUsers(usersRes.data));

        // Fetch logged user if exists
        if (localStorage.userI) {
          const currentUserRes = await axios.get(
            `${URL}/users/${localStorage.userI}`
          );
          dispatch(setLoggedUser(currentUserRes.data));
          dispatch(setLogged(true));
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchInitialData();
  }, [userChanged]);

  // ------------------------------
  // Fetch products
  // ------------------------------
  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${URL}/products`);
        dispatch(setProducts(res.data));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchProducts();
  }, [productChanged]);

  // ------------------------------
  // Reset cart only on logout
  // ------------------------------
  useEffect(() => {
    if (!logged) {
      dispatch(resetCart());
    }
  }, [logged]);


  // ------------------------------
  // Loading screen
  // ------------------------------
  if (loading || (loggedUser === null && localStorage.userI)) {
    return (
      <div className="min-h-[calc(100vh-60px)] bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b]">
        {isAdminPath ? <SimpleNav /> : <ComplexNavbar />}

        <div className="flex items-center justify-center h-[calc(100vh-60px)]">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-xl font-semibold animate-pulse text-gray-700 dark:text-white">
              Loading, please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------
  // Admin check
  // ------------------------------
  const isAdmin = loggedUser?.role === "admin";

  return (
    <Routes>
      <Route path="/*" element={<UserLayout />} />
      <Route
        path="/admin/*"
        element={isAdmin ? <AdminLayout /> : <ErrorSection7 />}
      />
    </Routes>
  );
}

export default App;
