import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setViewProduct } from "../../redux/userSlices/productSlice"; // keep as-is unless you rename it
import { useEffect } from "react";

const ProductView = () => {
  const { viewProduct, loading } = useSelector((state) => state.products); // keeping original slice name for consistency
  const { productid } = useParams();
  const URL = import.meta.env.VITE_URL;
  const dispatch = useDispatch();

  async function getProductDetails() {
    try {
      const res = await axios.get(`${URL}/products/${productid}`);
      if (res.status === 200) {
        dispatch(setViewProduct(res.data));
      }
    } catch (e) {}
  }

  useEffect(() => {
    getProductDetails();
  }, [productid]);

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-8 flex items-center justify-center">
      <Card className="w-full items-center max-w-5xl flex flex-col md:flex-row rounded-xl shadow-lg bg-[#1e293b] max-h-[calc(100vh-76px)]">
        <CardHeader
          floated={false}
          className="md:w-1/2 h-64 md:h-auto p-0  flex justify-center items-center"
        >
          <Typography
            as="img"
            src={viewProduct?.image}
            className=" object-contain w-64 rounded-lg"
          ></Typography>
        </CardHeader>

        <div className="flex flex-col justify-between p-6 md:w-1/2 bg-[#0f172a]">
          <CardBody className="p-0">
            <Typography variant="h5" color="white" className="mb-2">
              {viewProduct?.title}
            </Typography>
            <Typography color="gray" className="mb-4 font-normal">
              {viewProduct?.description}
            </Typography>
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h6" color="white">
                ${viewProduct?.price}
              </Typography>
              <Typography color="blue" className="font-normal">
                {viewProduct?.category || "Uncategorized"}
              </Typography>
            </div>
            <div className="flex items-center gap-1.5">
              <Typography color="amber" className="font-medium">
                {viewProduct?.rating?.rate}
              </Typography>
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
            </div>
          </CardBody>

          <CardFooter className="pt-4 px-0">
            <Link to="/admin/products">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                BACK TO PRODUCTS
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ProductView;
