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
              <span>{isRTL ? "مجموعة حصرية جديدة" : "New Exclusive Collection"}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">{isRTL ? "اكتشف" : "Discover"}</span>
              <br />
              <span className="text-foreground">{isRTL ? "أحدث الأزياء" : "Latest Fashion"}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              {isRTL 
                ? "تسوق أحدث تشكيلات الموضة بأسعار لا تُقاوم. منتجات حصرية بجودة عالية وتوصيل سريع."
                : "Shop the latest fashion collections at unbeatable prices. Exclusive products with high quality and fast delivery."}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <Button className="btn-premium px-8 py-4 text-white text-lg group">
                  {t("common.shop")}
                  <FaArrowRight className={`mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-4 text-lg rounded-xl">
                {isRTL ? "تعرف علينا" : "Learn More"}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold gradient-text">500+</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "منتج" : "Products"}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">10K+</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "عميل سعيد" : "Happy Customers"}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">24/7</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "دعم فني" : "Support"}</p>
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
            {[
              { icon: FaTruck, title: isRTL ? "شحن مجاني" : "Free Shipping", desc: isRTL ? "للطلبات فوق $50" : "On orders over $50" },
              { icon: FaShieldAlt, title: isRTL ? "دفع آمن" : "Secure Payment", desc: isRTL ? "100% آمن" : "100% Secure" },
              { icon: FaHeadset, title: isRTL ? "دعم 24/7" : "24/7 Support", desc: isRTL ? "دعم مباشر" : "Live Support" },
              { icon: FaStar, title: isRTL ? "جودة عالية" : "Premium Quality", desc: isRTL ? "منتجات أصلية" : "Original Products" },
            ].map((item, i) => (
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
                <span className="gradient-text">{isRTL ? "منتجات مميزة" : "Featured Products"}</span>
              </h2>
              <p className="text-muted-foreground">
                {isRTL ? "اكتشف أفضل المنتجات المختارة لك" : "Discover our hand-picked selection for you"}
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="rounded-full group">
                {isRTL ? "عرض الكل" : "View All"}
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
              <span className="gradient-text">{isRTL ? "تسوق حسب الفئة" : "Shop by Category"}</span>
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? "اختر من بين مجموعة متنوعة من الفئات" : "Choose from a variety of categories"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, i) => {
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
                      {categoryProducts.length} {isRTL ? "منتج" : "items"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-20 text-center text-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {isRTL ? "اشترك في نشرتنا البريدية" : "Subscribe to Our Newsletter"}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isRTL 
                  ? "احصل على أحدث العروض والخصومات الحصرية مباشرة في بريدك الإلكتروني"
                  : "Get the latest offers and exclusive discounts directly in your inbox"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={isRTL ? "بريدك الإلكتروني" : "Your email address"}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors">
                  {isRTL ? "اشترك" : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
