import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaChevronLeft, FaChevronRight, FaHeart, FaShare } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { addProduct } from "@/redux/userSlices/productSlice";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";
import type { Product } from "@/types";

// Star Rating Component
const StarRating = ({ rating, count, reviewsLabel }: { rating: number; count?: number; reviewsLabel?: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1}
          className={`w-5 h-5 ${
            i < rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
          }`}
        >
          <path d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" />
        </svg>
      ))}
    </div>
    {count && (
      <span className="text-muted-foreground text-sm">({count} {reviewsLabel || "reviews"})</span>
    )}
  </div>
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
          <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("common.productNotFound")}
          </h1>
          <Link to="/products">
            <Button className="btn-premium text-white px-6 py-3">
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
        {/* Breadcrumb */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <BackIcon className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span>{t("common.backToProducts")}</span>
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1.5 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="space-y-4">
            <div
              className={`relative card-premium aspect-square overflow-hidden cursor-zoom-in transition-all duration-300 ${
                isZoomed ? "shadow-glow" : ""
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {/* Category Badge */}
              <span className="absolute top-4 left-4 z-10 px-4 py-1.5 text-sm font-medium rounded-full gradient-primary text-white capitalize">
                {product.category}
              </span>

              <img
                src={product.image}
                alt={product.title}
                className={`w-full h-full object-contain p-8 transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "hover:scale-105"
                }`}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/500x500?text=No+Image";
                }}
              />
              
              {!isZoomed && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs backdrop-blur-sm">
                  {t("common.clickToZoom")}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title & Rating */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <StarRating
                rating={Math.floor(product.rating.rate)}
                count={product.rating.count}
                reviewsLabel={t("common.reviews")}
              />
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground  text-lg leading-relaxed mb-8 flex-1">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-border">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">{t("common.quantity")}:</span>
                <div className="flex items-center rounded-xl bg-secondary overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-primary/10 transition-colors font-medium"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-primary/10 transition-colors font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleAddToCart(product, quantity)}
                  className="btn-premium flex-1 py-4 text-white text-lg"
                >
                  <FaCartPlus className="mx-2" />
                  {t("common.addToCart")}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-xl"
                >
                  <FaHeart className="text-lg" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-xl"
                >
                  <FaShare className="text-lg" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="gradient-text">{t("common.relatedProducts")}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
