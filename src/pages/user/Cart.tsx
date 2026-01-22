import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  increaseN,
  decreaseN,
  removeFromCart,
} from "@/redux/userSlices/productSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import type { CartItem } from "@/types";

export default function Cart() {
  const { cart } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();

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
    <div className="p-4 sm:p-6 min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] text-foreground relative">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center">
        {t("cart.yourCart")}
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-72 gap-6 text-center">
          <p className="text-xl sm:text-2xl font-bold text-pink-700 dark:text-pink-300">
            {t("cart.emptyCart")}
          </p>
          <Link to="/products">
            <Button className="px-6 py-3 bg-primary text-primary-foreground">
              {t("common.shop")}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 max-w-7xl mx-auto px-2 sm:px-4">
          {/* Cart Items */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {cart.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 gap-4 bg-white dark:bg-[#1e293b] shadow-md"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                  <span className="font-semibold text-sm">
                    {product.title}
                  </span>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 w-full sm:w-1/2">
                  <span className="text-sm font-medium whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => dispatch(decreaseN({ id: product.id }))}
                      size="sm"
                      variant="secondary"
                      className="p-2"
                    >
                      <FaMinus />
                    </Button>
                    <span className="text-primary font-semibold">
                      {product.quantity}
                    </span>
                    <Button
                      onClick={() => dispatch(increaseN({ id: product.id }))}
                      size="sm"
                      variant="secondary"
                      className="p-2"
                    >
                      <FaPlus />
                    </Button>
                  </div>

                  <span className="text-red-700 dark:text-red-400 font-semibold whitespace-nowrap">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(removeFromCart({ id: product.id }))}
                    className="rounded-full p-2"
                  >
                    <FaTrash className="text-sm" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 bg-white dark:bg-[#1e293b] shadow-md rounded-lg p-4 sm:p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">
              {language === "ar" ? "الملخص" : "Summary"}
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>{language === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === "ar" ? "الضرائب" : "Taxes"} (14%)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <hr className="my-2 border-border" />
              <div className="flex justify-between font-semibold text-lg text-foreground">
                <span>{t("cart.total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full mt-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm hover:scale-105 transition"
            >
              {t("cart.checkout")}
            </Button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-pulse">
          {toast}
        </div>
      )}
    </div>
  );
}
