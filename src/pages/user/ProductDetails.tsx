import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { addProduct } from "@/redux/userSlices/productSlice";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";
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
  const { products, cart } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { t, isRTL } = useTranslation();
  const { SEO } = useSEO();
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const product = products.find((p) => p.id === productId);
  
  // Check if product is in cart
  const cartItem = cart.find((item) => item.id === productId);
  const isInCart = !!cartItem;

  const handleAddToCart = (prod: Product, qty: number = 1) => {
    for (let i = 0; i < qty; i++) {
      dispatch(addProduct(prod));
    }
    
    // Show success state
    setJustAdded(true);
    setShowToast(true);
    
    // Reset after animation
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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
    <div className="min-h-screen py-8 px-4 relative">
      <SEO 
        title={product.title}
        description={product.description?.slice(0, 160)}
        image={product.image}
        keywords={`${product.category}, ${product.title}, buy online`}
        type="product"
        product={{
          price: product.price,
          currency: 'USD',
          availability: 'in stock',
          category: product.category
        }}
      />
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in-0 slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-medium shadow-xl">
            <FaCheck className="text-sm" />
            {t("common.addedToCart")}
          </div>
        </div>
      )}

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
              <div className="space-y-3">
                {isInCart && !justAdded ? (
                  // Product is in cart - show "In Cart" with quantity and option to add more
                  <div className="flex  flex-row gap-3 items-center ">
                    <div className="w-full py-4 text-lg bg-green-500/10 border border-green-500 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center gap-2 font-medium">
                      <FaCheck />
                      {t("common.inCart")} ({cartItem?.quantity})
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product, quantity)}
                      className="btn-premium py-4 h-full text-white sm:px-8"
                    >
                      <FaCartPlus className="mx-1" />
                      +{quantity}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleAddToCart(product, quantity)}
                    disabled={justAdded}
                    className={`w-full md:w-full py-4 text-lg transition-all duration-300 ${
                      justAdded 
                        ? "bg-green-500 hover:bg-green-500 text-white" 
                        : "btn-premium text-white"
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <FaCheck className="mx-2 animate-in zoom-in-50 duration-200" />
                        {t("common.addedToCart")}
                      </>
                    ) : (
                      <>
                        <FaCartPlus className="mx-2" />
                        {t("common.addToCart")}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Service Link */}
        <div className="mb-12 p-6 rounded-2xl bg-secondary/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">{t("customerService.needHelp")}</h3>
            <p className="text-sm text-muted-foreground">{t("customerService.helpDesc")}</p>
          </div>
          <Link to="/customer-service">
            <Button variant="outline" className="rounded-xl whitespace-nowrap">
              {t("footer.customerService")}
            </Button>
          </Link>
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
