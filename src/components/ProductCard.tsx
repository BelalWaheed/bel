import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/Store";
import { addProduct } from "@/redux/userSlices/productSlice";
import { useTranslation } from "@/hooks/useTranslation";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill={i < rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1}
        className={`w-4 h-4 ${
          i < rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
        }`}
      >
        <path d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" />
      </svg>
    ))}
  </div>
);

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addProduct(product));
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="card-premium h-full flex flex-col overflow-hidden hover-lift">
        {/* Image Container */}
        <div className="relative aspect-square bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-primary flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-lg"
              title={t("common.addToCart")}
            >
              <FaCartPlus className="text-lg" />
            </button>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-primary flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg">
              <FaEye className="text-lg" />
            </div>
          </div>

          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground capitalize backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={Math.floor(product.rating.rate)} />
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm md:text-base">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold gradient-text">
                ${product.price}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <FaCartPlus className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
