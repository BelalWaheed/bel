import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/userSlices/productSlice";

const starRating = (count) => {
  return [...Array(5)].map((_, i) => (
    <svg
      key={i}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill={i < count ? "currentColor" : "none"}
      stroke="currentColor"
      className={`size-4 ${
        i < count ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"
      }`}
    >
      <path
        fillRule="evenodd"
        d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
        clipRule="evenodd"
      />
    </svg>
  ));
};

function Products() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] py-10">
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-center">
              <Card className="w-full max-w-sm flex flex-col justify-between dark:bg-[#1e293b] bg-white shadow-xl dark:shadow-md">
                <CardHeader floated={false} className="relative h-52">
                  <img
                    src={product?.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                  />
                </CardHeader>

                <CardBody>
                  <div className="flex gap-1 mb-2">
                    {starRating(Math.floor(product.rating.rate))}
                  </div>
                  <Typography
                    variant="h6"
                    className="mb-2 text-blue-gray-900 dark:text-white line-clamp-2"
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardBody>

                <CardFooter className="pt-0 flex justify-between items-center">
                  <h1 className="text-red-700 dark:text-red-400 text-xl font-semibold">
                    ${product.price}
                  </h1>
                  <Button
                    onClick={() => dispatch(addProduct(product))}
                    color="gray"
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
          <h1 className="p-6 text-center text-4xl text-gray-500 dark:text-gray-300">
            No products available.
          </h1>
        </div>
      )}
    </div>
  );
}

export default Products;
