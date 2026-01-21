import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { addProduct } from "@/redux/userSlices/productSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className={`size-4 ${
            i < rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

export default function Products() {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addProduct(product));
  };

  return (
    <div className="flex justify-center min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] py-10">
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-center">
              <Card className="w-full max-w-sm flex flex-col justify-between dark:bg-[#1e293b] bg-white shadow-xl dark:shadow-md">
                <CardHeader className="relative h-52 p-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                </CardHeader>

                <CardContent className="flex-1">
                  <StarRating rating={Math.floor(product.rating.rate)} />
                  <h3 className="mt-2 mb-2 text-foreground font-semibold line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>

                <CardFooter className="pt-0 flex justify-between items-center">
                  <span className="text-red-700 dark:text-red-400 text-xl font-semibold">
                    ${product.price}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    variant="secondary"
                    size="sm"
                    className="rounded-full hover:scale-105 transition-transform"
                  >
                    <FaCartPlus className="text-lg" />
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full max-w-7xl px-4">
          <h1 className="p-6 text-center text-4xl text-muted-foreground">
            No products available.
          </h1>
        </div>
      )}
    </div>
  );
}
