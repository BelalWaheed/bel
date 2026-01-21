import { Link, useNavigate } from "react-router-dom";
import { HiHome, HiShoppingBag, HiUsers, HiLogout } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
import { resetCart } from "@/redux/userSlices/productSlice";
import { Button } from "@/components/ui/button";

export default function AdminNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useAppSelector((state) => state.profile);

  const handleLogout = () => {
    localStorage.removeItem("userI");
    dispatch(setLogged(false));
    dispatch(setLoggedUser(null));
    dispatch(resetCart());
    navigate("/");
  };

  return (
    <nav className="bg-linear-to-r from-[#0f172a] to-[#1e293b] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            to="/admin"
            className="text-2xl font-bold pt-serif-bold-italic hover:text-primary transition-colors"
          >
            Admin Panel
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <HiHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <HiShoppingBag className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <HiUsers className="h-5 w-5" />
              <span>Users</span>
            </Link>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{loggedUser?.name}</p>
              <p className="text-xs text-gray-400">{loggedUser?.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <HiLogout className="h-5 w-5" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
          <Link
            to="/admin"
            className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <HiHome className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <HiShoppingBag className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <HiUsers className="h-5 w-5" />
            <span className="text-xs">Users</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
