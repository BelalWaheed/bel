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
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center w-full max-w-4xl">
        {/* Users Card */}
        <Card className="w-full card-premium hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-center text-primary">USERS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b border-border mb-4"></div>
            <div className="space-y-4 text-base leading-relaxed">
              <p className="flex justify-between">
                <span className="font-semibold text-muted-foreground">
                  Number of Users:
                </span>{" "}
                <span className="font-bold text-foreground">{allUsers.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-muted-foreground">
                  Last User Registered:
                </span>{" "}
                <span className="font-bold text-foreground">{lastUser?.name || "No users yet"}</span>
              </p>
            </div>
            <Link to="/admin/users" className="block mt-8">
              <Button className="w-full btn-premium rounded-full font-semibold">
                CHECK USERS
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Products Card */}
        <Card className="w-full card-premium hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-center text-primary">PRODUCTS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b border-border mb-4"></div>
            <div className="space-y-4 text-base leading-relaxed">
              <p className="flex justify-between">
                <span className="font-semibold text-muted-foreground">
                  Number of Products:
                </span>{" "}
                <span className="font-bold text-foreground">{products.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-muted-foreground">
                  Last Product Added:
                </span>{" "}
                <span className="font-bold text-foreground">{lastProduct?.title || "No products yet"}</span>
              </p>
            </div>
            <Link to="/admin/products" className="block mt-6">
              <Button className="w-full btn-premium rounded-full font-semibold">
                CHECK PRODUCTS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
