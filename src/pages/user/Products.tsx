import { useState, useMemo, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/redux/Store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";

export default function Products() {
  const { products } = useAppSelector((state) => state.products);
  const { t } = useTranslation();
  const { SEO } = useSEO();
  const [searchParams] = useSearchParams();

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
  // Filter states
  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([priceStats.min, priceStats.max]);
  const [showFilters, setShowFilters] = useState(initialCategory !== "all");
  const [priceInitialized, setPriceInitialized] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sync category from URL when it changes
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
      setShowFilters(true);
    }
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedGender, priceRange]);

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
      const matchesGender =
        selectedGender === "all" || product.gender?.toLowerCase() === selectedGender.toLowerCase();
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice && matchesGender;
    });
  }, [products, selectedCategory, priceRange, selectedGender]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setPriceRange([priceStats.min, priceStats.max]);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedGender !== "all" ||
    priceRange[0] !== priceStats.min ||
    priceRange[1] !== priceStats.max;

  return (
    <div className="min-h-screen py-8 px-4">
      <SEO 
        title={t("common.ourProducts")}
        description="Browse our collection of premium fashion, electronics, and lifestyle products. Filter by category and price to find exactly what you're looking for."
        keywords="products, fashion, electronics, jewelry, shop, buy online"
      />
      <div className="xl:max-w-10/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("common.ourProducts")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t("common.tryAdjustingFilters")}
          </p>
          
          {/* Gender Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-secondary rounded-xl shadow-inner">
              {["all", "men", "women", "kids"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    selectedGender === gender
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant={showFilters ? "default" : "secondary"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full"
            >
              <FaFilter className="text-sm " />
              {showFilters ? t("common.hideFilters") : t("common.showFilters")}
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground hover:text-foreground rounded-full"
              >
                <FaTimes className="mx-1" />
                {t("common.clearFilters")}
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {t("common.showing")}{" "}
            <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
            {t("common.of")}{" "}
            <span className="font-semibold text-foreground">{products.length}</span>{" "}
            {t("common.products")}
          </p>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="card-premium p-6 mb-8 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t("filters.category")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                        selectedCategory === category
                          ? "gradient-primary text-white shadow-md"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {category === "all" ? t("common.allCategories") : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t("filters.priceRange")}
                </h3>
                <div className="space-y-6">
                  {/* Slider */}
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={priceStats.min}
                    max={priceStats.max}
                    step={1}
                    className="w-full"
                  />

                  {/* Price Display */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground block mb-1">
                        {t("filters.minPrice")}
                      </label>
                      <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                        <button
                          onClick={() => setPriceRange([Math.max(priceStats.min, priceRange[0] - 5), priceRange[1]])}
                          disabled={priceRange[0] <= priceStats.min}
                          className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center font-semibold">${priceRange[0]}</span>
                        <button
                          onClick={() => setPriceRange([Math.min(priceRange[1] - 1, priceRange[0] + 5), priceRange[1]])}
                          disabled={priceRange[0] >= priceRange[1] - 1}
                          className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <span className="text-muted-foreground">—</span>
                    
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground block mb-1">
                        {t("filters.maxPrice")}
                      </label>
                      <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                        <button
                          onClick={() => setPriceRange([priceRange[0], Math.max(priceRange[0] + 1, priceRange[1] - 5)])}
                          disabled={priceRange[1] <= priceRange[0] + 1}
                          className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center font-semibold">${priceRange[1]}</span>
                        <button
                          onClick={() => setPriceRange([priceRange[0], Math.min(priceStats.max, priceRange[1] + 5)])}
                          disabled={priceRange[1] >= priceStats.max}
                          className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-full"
                >
                  Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="rounded-full"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("common.noProductsFound")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t("common.tryAdjustingFilters")}
            </p>
            <Button onClick={resetFilters} className="btn-premium text-white px-6 py-2">
              {t("common.resetFilters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
