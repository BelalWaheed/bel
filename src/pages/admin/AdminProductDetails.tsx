import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { setViewProduct } from "@/redux/userSlices/productSlice";
import { productApi } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { FaStar } from "react-icons/fa";

export default function AdminProductDetails() {
  const { viewProduct } = useAppSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    async function getProductDetails() {
      if (!productId) return;
      try {
        const product = await productApi.getById(productId);
        dispatch(setViewProduct(product));
      } catch (e) {
        console.error("Error fetching product details:", e);
      }
    }
    getProductDetails();
  }, [productId, dispatch]);

  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-5xl flex flex-col md:flex-row rounded-xl shadow-card bg-card border border-border">
        <CardHeader className="md:w-1/2 p-6 flex justify-center items-center bg-white/5">
          <img
            src={viewProduct.image}
            alt={viewProduct.title}
            className="object-contain w-64 h-64 rounded-lg animate-float"
          />
        </CardHeader>

        <div className="flex flex-col justify-between p-6 md:w-1/2 rounded-r-xl">
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <span className="text-sm text-primary font-medium tracking-wide uppercase">
                {viewProduct.category || t("common.product")}
              </span>
              <h2 className="text-2xl font-bold text-foreground leading-tight">{viewProduct.title}</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">{viewProduct.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-3xl font-bold gradient-text">
                ${viewProduct.price}
              </span>
              
              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
                <span className="text-yellow-500 font-bold flex items-center gap-1">
                  {viewProduct.rating?.rate}
                  <FaStar className="w-4 h-4 ml-1" />
                </span>
                <span className="text-muted-foreground text-sm">
                  ({viewProduct.rating?.count} {t("common.reviews")})
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-8 px-0">
            <Link to="/admin/products" className="w-full">
              <Button variant="outline" className="w-full rounded-full hover:bg-secondary">
                {t("common.backToProducts")}
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
