import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { setViewProduct } from "@/redux/userSlices/productSlice";
import { productApi } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminProductDetails() {
  const { viewProduct } = useAppSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getProductDetails() {
      if (!productId) return;
      try {
        const product = await productApi.getById(productId);
        dispatch(setViewProduct(product));
      } catch (e) {
        console.error("Error fetching product details:", e);
      }
    }
    getProductDetails();
  }, [productId, dispatch]);

  return (
    <div className="min-h-[calc(100vh-60px)] bg-linear-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-5xl flex flex-col md:flex-row rounded-xl shadow-lg bg-[#1e293b] border-gray-700">
        <CardHeader className="md:w-1/2 p-6 flex justify-center items-center">
          <img
            src={viewProduct.image}
            alt={viewProduct.title}
            className="object-contain w-64 rounded-lg"
          />
        </CardHeader>

        <div className="flex flex-col justify-between p-6 md:w-1/2 bg-[#0f172a] rounded-r-xl">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-xl font-bold text-white">{viewProduct.title}</h2>
            <p className="text-gray-400">{viewProduct.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-white">
                ${viewProduct.price}
              </span>
              <span className="text-blue-400">
                {viewProduct.category || "Uncategorized"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-medium">
                {viewProduct.rating?.rate}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-amber-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400 text-sm">
                ({viewProduct.rating?.count} reviews)
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-6 px-0">
            <Link to="/admin/products" className="w-full">
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-200">
                BACK TO PRODUCTS
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
