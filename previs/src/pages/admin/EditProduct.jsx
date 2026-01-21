import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setCount,
  setDescription,
  setImage,
  setPrice,
  setRate,
  setTitle,
  setViewProduct,
} from "../../redux/userSlices/productSlice"; // keep as-is unless you rename it
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { setProductChanged } from "../../redux/adminSlices/flagsSlice";

const EditProduct = () => {
  const { productid } = useParams();

  const dispatch = useDispatch();
  const { productChanged } = useSelector((state) => state.flags);
  const { viewProduct } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_URL;
  const [errors, setErrors] = useState({});

  async function getProductDetails() {
    try {
      const res = await axios.get(`${URL}/products/${productid}`);
      if (res.status === 200) {
        dispatch(setViewProduct(res.data));
      }
    } catch (e) {
      alert("Error fetching product details. Please try again later.");
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [productid]);

  const validate = () => {
    const newErrors = {};

    if (!viewProduct.title?.trim()) newErrors.title = "Title is required.";
    if (!viewProduct.price || isNaN(viewProduct.price))
      newErrors.price = "Valid price is required.";
    if (!viewProduct.category?.trim())
      newErrors.category = "Category is required.";
    if (!viewProduct.description?.trim())
      newErrors.description = "Description is required.";
    if (!viewProduct.image?.startsWith("https://"))
      newErrors.image = "Image URL must start with 'https://'.";
    if (!viewProduct.rating?.rate || isNaN(viewProduct.rating.rate))
      newErrors.rate = "Valid rate is required.";
    if (!viewProduct.rating?.count || isNaN(viewProduct.rating.count))
      newErrors.count = "Valid count is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    axios
      .put(`${URL}/products/${productid}`, viewProduct)
      .then(() => {
        console.log("Product added successfully:");
        dispatch(setProductChanged(!productChanged));
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className=" min-h-[calc(100vh-60px)]    max-w-4xl md:mx-auto px-4 py-8  sm:mx-7">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        <Typography
          variant="h5"
          className="text-center font-bold text-gray-900"
        >
          Add New Product
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Product Title"
              value={viewProduct.title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              color="black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <Input
              label="Product Price"
              type="number"
              icon={<span className="text-gray-500">$</span>}
              value={viewProduct.price}
              onChange={(e) => dispatch(setPrice(e.target.value))}
              color="black"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          <div>
            <Input
              label="Product Category"
              value={viewProduct.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              color="black"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>
        </div>

        <div>
          <Textarea
            label="Product Description"
            value={viewProduct.description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            color="black"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div>
          <Input
            label="Product Image URL"
            type="url"
            value={viewProduct.image}
            onChange={(e) => dispatch(setImage(e.target.value))}
            color="black"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Product Rate"
              type="number"
              value={viewProduct.rating?.rate}
              onChange={(e) => dispatch(setRate(e.target.value))}
              color="black"
            />
            {errors.rate && (
              <p className="text-red-500 text-sm">{errors.rate}</p>
            )}
          </div>

          <div>
            <Input
              label="Rating Count"
              type="number"
              value={viewProduct.rating?.count}
              onChange={(e) => dispatch(setCount(e.target.value))}
              color="black"
            />
            {errors.count && (
              <p className="text-red-500 text-sm">{errors.count}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-black text-white font-bold px-6 py-3 rounded-md hover:bg-gray-900 transition"
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
