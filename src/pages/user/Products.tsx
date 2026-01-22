import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { addProduct } from "@/redux/userSlices/productSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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

  // Get min and max prices
  const priceStats = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([priceStats.min, priceStats.max]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceInitialized, setPriceInitialized] = useState(false);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats];
  }, [products]);

  // Initialize price range when products load
  if (!priceInitialized && products.length > 0) {
    setPriceRange([priceStats.min, priceStats.max]);
    setPriceInitialized(true);
  }

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [products, selectedCategory, priceRange]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addProduct(product));
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([priceStats.min, priceStats.max]);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    priceRange[0] !== priceStats.min ||
    priceRange[1] !== priceStats.max;

  return (
    <div className="min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Filter Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Our Products</h1>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <FaTimes className="mr-2" />
                Clear Filters
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg p-6 mb-8 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  {/* Slider */}
                  <Slider
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    min={priceStats.min}
                    max={priceStats.max}
                    step={1}
                    className="w-full"
                  />
                  {/* Min Price */}
                  <div className="flex items-center gap-2">

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Min Price</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPriceRange([Math.max(priceStats.min, priceRange[0] - 5), priceRange[1]])}
                        disabled={priceRange[0] <= priceStats.min}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="w-16 text-center font-semibold text-foreground">
                        ${priceRange[0]}
                      </span>
                      <button
                        onClick={() => setPriceRange([Math.min(priceRange[1] - 1, priceRange[0] + 5), priceRange[1]])}
                        disabled={priceRange[0] >= priceRange[1] - 1}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Max Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Max Price</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPriceRange([priceRange[0], Math.max(priceRange[0] + 1, priceRange[1] - 5)])}
                        disabled={priceRange[1] <= priceRange[0] + 1}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="w-16 text-center font-semibold text-foreground">
                        ${priceRange[1]}
                      </span>
                      <button
                        onClick={() => setPriceRange([priceRange[0], Math.min(priceStats.max, priceRange[1] + 5)])}
                        disabled={priceRange[1] >= priceStats.max}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {products.length}
                </span>{" "}
                products
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <li key={product.id} className="flex justify-center">
                <Link to={`/products/${product.id}`} className="w-full max-w-sm">
                  <Card className="h-full flex flex-col justify-between dark:bg-[#1e293b] bg-white shadow-xl dark:shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
                    <CardHeader className="relative h-56 p-4 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
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
                        onClick={(e) => handleAddToCart(e, product)}
                        variant="secondary"
                        size="sm"
                        className="rounded-full hover:scale-105 transition-transform"
                      >
                        <FaCartPlus className="text-lg" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Try adjusting your filters to find what you're looking for.
            </p>
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
