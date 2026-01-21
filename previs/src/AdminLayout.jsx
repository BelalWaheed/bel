import { Route, Routes } from "react-router-dom";
import SimpleNav from "./components/admin/SimpleNav";
import Dashboard from "./pages/admin/Dashboard";
import ErrorSection7 from "./pages/user/ErrorSection7";
import ProductDashboard from "./pages/admin/ProductDashboard";
import ProductView from "./pages/admin/ProductView";
import AddNewProduct from "./pages/admin/AddNewProduct";
import ViewUsers from "./pages/admin/ViewUsers";
import EditProduct from "./pages/admin/EditProduct";
import { AddUser } from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
function AdminLayout() {
  return (
    <div className="bg-gradient-to-l  from-[#0f172a] to-[#1e293b] transition-transform duration-300">
      <SimpleNav />

      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductDashboard />} />
        <Route path="users" element={<ViewUsers />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="edit-user/:userid" element={<EditUser />} />
        <Route path="addproduct" element={<AddNewProduct />} />
        <Route path="view/:productid" element={<ProductView />} />
        <Route path="edit/:productid" element={<EditProduct />} />

        <Route path="*" element={<ErrorSection7 />} />
      </Routes>
    </div>
  );
}

export default AdminLayout;
