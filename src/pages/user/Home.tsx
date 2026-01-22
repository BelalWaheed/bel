import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { useAppSelector } from "@/redux/Store";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const { products } = useAppSelector((state) => state.products);
  const { t, isRTL } = useTranslation();

  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  // Get categories
  const categories = [...new Set(products.map((p) => p.category))].slice(0, 4);

  // Feature items with translations
  const features = [
    { icon: FaTruck, title: t("home.freeShipping"), desc: t("home.freeShippingDesc") },
    { icon: FaShieldAlt, title: t("home.securePayment"), desc: t("home.securePaymentDesc") },
    { icon: FaHeadset, title: t("home.support247"), desc: t("home.support247Desc") },
    { icon: FaStar, title: t("home.premiumQuality"), desc: t("home.premiumQualityDesc") },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-100px)] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isRTL ? 'lg:order-2' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <FaStar className="text-yellow-500" />
              <span>{t("home.newCollection")}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">{t("home.discover")}</span>
              <br />
              <span className="text-foreground">{t("home.latestFashion")}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              {t("home.heroDescription")}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <Button className="btn-premium px-8 py-4 text-white text-lg group">
                  {t("common.shop")}
                  <FaArrowRight className={`mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-4 text-lg rounded-xl">
                {t("common.learnMore")}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold gradient-text">500+</p>
                <p className="text-sm text-muted-foreground">{t("common.products")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">10K+</p>
                <p className="text-sm text-muted-foreground">{t("home.happyCustomers")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">24/7</p>
                <p className="text-sm text-muted-foreground">{t("home.support")}</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Products */}
          <div className={`relative ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-3xl animate-pulse" />
              
              {/* Main circle with product */}
              <div className="relative w-full h-full rounded-full bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10 flex items-center justify-center overflow-hidden">
                {featuredProducts[0] && (
                  <img
                    src={featuredProducts[0].image}
                    alt="Featured Product"
                    className="w-3/4 h-3/4 object-contain animate-float"
                  />
                )}
              </div>

              {/* Floating product cards */}
              {featuredProducts[1] && (
                <div className="absolute -top-4 -right-4 w-24 h-24 card-premium p-2 animate-float shadow-lg">
                  <img src={featuredProducts[1].image} alt="" className="w-full h-full object-contain" />
                </div>
              )}
              {featuredProducts[2] && (
                <div className="absolute -bottom-4 -left-4 w-28 h-28 card-premium p-2 animate-float shadow-lg delay-500">
                  <img src={featuredProducts[2].image} alt="" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="text-xl" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">{t("home.featuredProducts")}</span>
              </h2>
              <p className="text-muted-foreground">
                {t("home.featuredDesc")}
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="rounded-full group">
                {t("common.viewAll")}
                <FaArrowRight className={`mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">{t("home.shopByCategory")}</span>
            </h2>
            <p className="text-muted-foreground">
              {t("home.categoryDesc")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => p.category === category);
              return (
                <Link
                  key={category}
                  to="/products"
                  className="group"
                >
                  <div className="card-premium aspect-square p-6 flex flex-col items-center justify-center text-center group-hover:shadow-glow transition-all duration-300">
                    {categoryProducts[0] && (
                      <img
                        src={categoryProducts[0].image}
                        alt={category}
                        className="w-20 h-20 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <h3 className="font-semibold text-foreground capitalize group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {categoryProducts.length} {t("common.items")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
 </div>
  );
}
