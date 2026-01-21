import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  setCategory,
  setCount,
  setDescription,
  setImage,
  setPrice,
  setRate,
  setTitle,
  resetProduct,
} from "@/redux/adminSlices/addSlice";
import { toggleProductChanged } from "@/redux/adminSlices/flagsSlice";
import { productApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FormErrors {
  title?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
  rate?: string;
  count?: string;
}

export default function AddProduct() {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.adminAdd);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!product.title?.trim()) newErrors.title = "Title is required.";
    if (!product.price || isNaN(Number(product.price)))
      newErrors.price = "Valid price is required.";
    if (!product.category?.trim()) newErrors.category = "Category is required.";
    if (!product.description?.trim())
      newErrors.description = "Description is required.";
    if (!product.image?.startsWith("https://"))
      newErrors.image = "Image URL must start with 'https://'.";
    if (!product.rating?.rate || isNaN(Number(product.rating.rate)))
      newErrors.rate = "Valid rate is required.";
    if (!product.rating?.count || isNaN(Number(product.rating.count)))
      newErrors.count = "Valid count is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await productApi.create(product);
      dispatch(toggleProductChanged());
      dispatch(resetProduct());
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] max-w-4xl md:mx-auto px-4 py-8 sm:mx-7">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  value={product.title}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                  placeholder="Product title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Product Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={product.price}
                  onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>
                <Input
                  id="category"
                  value={product.category}
                  onChange={(e) => dispatch(setCategory(e.target.value))}
                  placeholder="Category"
                />
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <textarea
                id="description"
                value={product.description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Product description..."
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Product Image URL</Label>
              <Input
                id="image"
                type="url"
                value={product.image}
                onChange={(e) => dispatch(setImage(e.target.value))}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="text-sm text-destructive">{errors.image}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Product Rate</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  max="5"
                  value={product.rating?.rate}
                  onChange={(e) => dispatch(setRate(Number(e.target.value)))}
                  placeholder="0.0"
                />
                {errors.rate && (
                  <p className="text-sm text-destructive">{errors.rate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">Rating Count</Label>
                <Input
                  id="count"
                  type="number"
                  value={product.rating?.count}
                  onChange={(e) => dispatch(setCount(Number(e.target.value)))}
                  placeholder="0"
                />
                {errors.count && (
                  <p className="text-sm text-destructive">{errors.count}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-md hover:bg-primary/90 transition"
              >
                ADD NEW PRODUCT
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
