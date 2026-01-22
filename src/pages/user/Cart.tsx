import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaArrowRight, FaCartShopping } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  increaseN,
  decreaseN,
  removeFromCart,
} from "@/redux/userSlices/productSlice";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import type { CartItem } from "@/types";

export default function Cart() {
  const { cart } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { t, language, isRTL } = useTranslation();

  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.14;
  const total = subtotal + taxes;

  const generateCartMessage = (cartItems: CartItem[]) => {
    if (!cartItems || cartItems.length === 0) {
      return language === "ar" ? "سلتي فارغة." : "My cart is empty.";
    }

    const lines: string[] = [];
    lines.push(language === "ar" ? "مرحباً، أريد طلب المنتجات التالية:" : "Hello, I want to order the following items:");
    lines.push("");
    cartItems.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. ${item.title} — ${language === "ar" ? "الكمية" : "Qty"}: ${item.quantity} — ${language === "ar" ? "السعر" : "Unit"}: $${item.price.toFixed(2)} — ${language === "ar" ? "المجموع" : "Line"}: $${(item.price * item.quantity).toFixed(2)}`
      );
    });
    lines.push("");
    lines.push(`${language === "ar" ? "المجموع الفرعي" : "Subtotal"}: $${subtotal.toFixed(2)}`);
    lines.push(`${language === "ar" ? "الضرائب" : "Taxes"} (14%): $${taxes.toFixed(2)}`);
    lines.push(`${language === "ar" ? "الإجمالي" : "Total"}: $${total.toFixed(2)}`);
    lines.push("");
    lines.push(language === "ar" ? "الاسم:" : "Name:");
    lines.push(language === "ar" ? "الهاتف:" : "Phone:");
    lines.push(language === "ar" ? "العنوان (للتوصيل):" : "Address (if delivery):");
    lines.push("");
    lines.push(language === "ar" ? "شكراً!" : "Thank you!");
    return lines.join("\n");
  };

  const showTemporaryToast = (message: string) => {
    setToast(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      showTemporaryToast(t("cart.emptyCart"));
      return;
    }

    const message = generateCartMessage(cart);
    const igDmLink = "https://ig.me/m/belalwaheed_";

    try {
      await navigator.clipboard.writeText(message);
      window.open(igDmLink, "_blank");
      showTemporaryToast(
        language === "ar" 
          ? "تم نسخ الطلب! افتح رسائل انستجرام والصقه ثم أرسله."
          : "Order copied! Open Instagram DM and paste it, then send."
      );
    } catch {
      window.open(igDmLink, "_blank");
      showTemporaryToast(
        language === "ar"
          ? "تعذر النسخ تلقائياً. افتح رسائل انستجرام والصق طلبك."
          : "Unable to copy automatically. Open Instagram DM and paste your order."
      );
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">{t("cart.yourCart")}</span>
          </h1>
          <p className="text-muted-foreground">
            {cart.length} {language === "ar" ? "منتج" : "items"}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-6">
              <FaCartShopping className="text-5xl text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("cart.emptyCart")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {language === "ar" 
                ? "لم تضف أي منتجات إلى سلتك بعد. استكشف منتجاتنا واكتشف ما يناسبك!"
                : "You haven't added any products to your cart yet. Explore our products and find what suits you!"}
            </p>
            <Link to="/products">
              <Button className="btn-premium px-8 py-4 text-white text-lg group">
                {t("common.shop")}
                <FaArrowRight className={`mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="card-premium p-4 flex flex-col sm:flex-row items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl bg-secondary/50 shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 text-center sm:text-start">
                    <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ${product.price.toFixed(2)} × {product.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 rounded-xl bg-secondary overflow-hidden">
                    <button
                      onClick={() => dispatch(decreaseN({ id: product.id }))}
                      className="p-3 hover:bg-primary/10 transition-colors"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-3 font-semibold min-w-[40px] text-center">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseN({ id: product.id }))}
                      className="p-3 hover:bg-primary/10 transition-colors"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>

                  {/* Price & Delete */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg gradient-text min-w-[80px] text-end">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart({ id: product.id }))}
                      className="p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-premium p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">
                  {language === "ar" ? "ملخص الطلب" : "Order Summary"}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{language === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{language === "ar" ? "الضرائب" : "Taxes"} (14%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{language === "ar" ? "الشحن" : "Shipping"}</span>
                    <span className="text-primary font-medium">{language === "ar" ? "مجاني" : "Free"}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>{t("cart.total")}</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="btn-premium w-full py-4 text-white text-lg"
                >
                  {t("cart.checkout")}
                </Button>

                <Link to="/products" className="block mt-4">
                  <Button variant="outline" className="w-full rounded-xl">
                    {t("cart.continueShopping")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 gradient-primary text-white px-6 py-4 rounded-xl shadow-xl z-50 animate-in slide-in-from-bottom-4 duration-300">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
