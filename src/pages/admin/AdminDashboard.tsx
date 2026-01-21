import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/Store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { allUsers } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.products);
  const lastUser = allUsers[allUsers.length - 1];
  const lastProduct = products[products.length - 1];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-linear-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-center px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
        {/* Users Card */}
        <Card className="w-full max-w-sm bg-gray-900 text-white border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-center">USERS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b border-gray-700 mb-4"></div>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                <span className="font-semibold text-blue-400">
                  Number of Users:
                </span>{" "}
                {allUsers.length}
              </p>
              <p>
                <span className="font-semibold text-blue-400">
                  Last User Registered:
                </span>{" "}
                {lastUser?.name || "No users yet"}
              </p>
            </div>
            <Link to="/admin/users" className="block mt-8">
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-200 font-semibold">
                CHECK USERS
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Products Card */}
        <Card className="w-full max-w-sm bg-gray-900 text-white border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-center">PRODUCTS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b border-gray-700 mb-4"></div>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                <span className="font-semibold text-green-400">
                  Number of Products:
                </span>{" "}
                {products.length}
              </p>
              <p>
                <span className="font-semibold text-green-400">
                  Last Product Added:
                </span>{" "}
                {lastProduct?.title || "No products yet"}
              </p>
            </div>
            <Link to="/admin/products" className="block mt-6">
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-200 font-semibold">
                CHECK PRODUCTS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
