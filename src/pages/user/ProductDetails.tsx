import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { addProduct } from "@/redux/userSlices/productSlice";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import type { Product } from "@/types";

// Star Rating Component
const StarRating = ({ rating, count, reviewsLabel }: { rating: number; count?: number; reviewsLabel?: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className={`size-5 ${
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
    {count && (
      <span className="text-muted-foreground text-sm">({count} {reviewsLabel || "reviews"})</span>
    )}
  </div>
);

// Product Card Component for Related Products
const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) => (
  <Link to={`/products/${product.id}`}>
    <Card className="h-full flex flex-col cursor-pointer dark:bg-[#1e293b] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <CardHeader className="relative h-48 p-4 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <h3 className="text-foreground font-semibold line-clamp-2 text-sm">
          {product.title}
        </h3>
        <div className="mt-2">
          <StarRating rating={Math.floor(product.rating.rate)} />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-red-700 dark:text-red-400 text-lg font-bold">
          ${product.price}
        </span>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart(product);
          }}
          variant="secondary"
          size="sm"
          className="rounded-full hover:scale-105 transition-transform"
        >
          <FaCartPlus className="text-base" />
        </Button>
      </CardFooter>
    </Card>
  </Link>
);

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { t, isRTL } = useTranslation();
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === productId);

  const handleAddToCart = (prod: Product, qty: number = 1) => {
    for (let i = 0; i < qty; i++) {
      dispatch(addProduct(prod));
    }
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  // Use appropriate chevron icon based on RTL
  const BackIcon = isRTL ? FaChevronRight : FaChevronLeft;

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("common.productNotFound")}
          </h1>
          <Link to="/products">
            <Button variant="outline">
              <BackIcon className="mx-2" />
              {t("common.backToProducts")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
          <BackIcon className="mx-2" />
          {t("common.backToProducts")}
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image with Zoom */}
          <div className="flex items-center justify-center">
            <div
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl overflow-hidden cursor-zoom-in transition-all duration-300 ${
                isZoomed ? "scale-100" : ""
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={product.image}
                alt={product.title}
                className={`max-w-full max-h-[500px] object-contain transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "hover:scale-110"
                }`}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/500x500?text=No+Image";
                }}
              />
              {!isZoomed && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {t("common.clickToZoom")}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              {product.category}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            <div className="mb-6">
              <StarRating
                rating={Math.floor(product.rating.rate)}
                count={product.rating.count}
                reviewsLabel={t("common.reviews")}
              />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-red-700 dark:text-red-400">
                ${product.price}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-foreground font-medium">{t("common.quantity")}:</span>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-border font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={() => handleAddToCart(product, quantity)}
              size="lg"
              className="w-full md:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaCartPlus className="mx-2 text-xl" />
              {t("common.addToCart")}
            </Button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {t("common.relatedProducts")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
