import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaArrowRight, FaCartShopping, FaShieldHalved, FaTruck, FaRotate } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  increaseN,
  decreaseN,
  removeFromCart,
} from "@/redux/userSlices/productSlice";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";
import type { CartItem } from "@/types";

export default function Cart() {
  const { cart } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { t, isRTL } = useTranslation();
  const { SEO } = useSEO();

  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.14;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + taxes + shipping;

  const generateCartMessage = (cartItems: CartItem[]) => {
    if (!cartItems || cartItems.length === 0) {
      return t("cart.emptyCart");
    }

    const lines: string[] = [];
    lines.push(t("cart.orderIntro"));
    lines.push("");
    cartItems.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. ${item.title} — ${t("cart.qty")}: ${item.quantity} — ${t("cart.unit")}: $${item.price.toFixed(2)} — ${t("cart.line")}: $${(item.price * item.quantity).toFixed(2)}`
      );
    });
    lines.push("");
    lines.push(`${t("cart.subtotal")}: $${subtotal.toFixed(2)}`);
    lines.push(`${t("cart.taxes")} (14%): $${taxes.toFixed(2)}`);
    lines.push(`${t("cart.total")}: $${total.toFixed(2)}`);
    lines.push("");
    lines.push(t("cart.name"));
    lines.push(t("cart.phone"));
    lines.push(t("cart.address"));
    lines.push("");
    lines.push(t("cart.thankYou"));
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
      showTemporaryToast(t("cart.orderCopied"));
    } catch {
      window.open(igDmLink, "_blank");
      showTemporaryToast(t("cart.copyFailed"));
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("cart.yourCart")}
        description="Review your shopping cart. Free shipping on orders over $50. Secure checkout with multiple payment options."
      />
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("cart.yourCart")}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {totalItems} {t("common.items")}
              </p>
            </div>
            <Link to="/products">
              <Button variant="secondary" className="rounded-full gap-2">
                {t("cart.continueShopping")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8">
              <FaCartShopping className="text-5xl text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {t("cart.emptyCart")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              {t("cart.emptyCartDesc")}
            </p>
            <Link to="/products">
              <Button className="btn-premium px-8 py-4 text-white text-lg group">
                {t("common.shop")}
                <FaArrowRight className={`mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2">
              {/* Items Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-6">{t("common.products")}</div>
                <div className="col-span-2 text-center">{t("common.quantity")}</div>
                <div className="col-span-2 text-center">{t("cart.unit")}</div>
                <div className="col-span-2 text-end">{t("cart.total")}</div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-border">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex items-center gap-4">
                      <Link 
                        to={`/products/${product.id}`}
                        className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-secondary/50 shrink-0 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-3 hover:scale-105 transition-transform"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/products/${product.id}`}
                          className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-1"
                        >
                          {product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground capitalize">
                          {product.category}
                        </p>
                        {/* Mobile Price */}
                        <p className="text-lg font-bold gradient-text md:hidden mt-2">
                          ${(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className="inline-flex items-center rounded-full bg-secondary overflow-hidden">
                        <button
                          onClick={() => dispatch(decreaseN({ id: product.id }))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseN({ id: product.id }))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Unit Price - Desktop */}
                    <div className="hidden md:block md:col-span-2 text-center text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </div>

                    {/* Total & Delete */}
                    <div className="hidden md:flex md:col-span-2 items-center justify-end gap-3">
                      <span className="font-bold text-lg gradient-text">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart({ id: product.id }))}
                        className="w-9 h-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                        title={t("cart.remove")}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    {/* Mobile Delete */}
                    <div className="md:hidden flex justify-center">
                      <button
                        onClick={() => dispatch(removeFromCart({ id: product.id }))}
                        className="text-sm text-destructive hover:underline flex items-center gap-1"
                      >
                        <FaTrash className="text-xs" />
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="sticky top-32">
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  {/* Summary Header */}
                  <div className="bg-secondary/30 px-6 py-4 border-b border-border">
                    <h3 className="text-lg font-bold">{t("cart.orderSummary")}</h3>
                  </div>

                  {/* Summary Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("cart.taxes")} (14%)</span>
                      <span className="font-medium">${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("cart.shipping")}</span>
                      <span className={`font-medium ${shipping === 0 ? 'text-green-500' : ''}`}>
                        {shipping === 0 ? t("cart.free") : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}

                    <hr className="border-border" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t("cart.total")}</span>
                      <span className="gradient-text">${total.toFixed(2)}</span>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="btn-premium w-full py-4 text-white text-lg mt-4"
                    >
                      {t("cart.checkout")}
                    </Button>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                          <FaShieldHalved className="text-sm" />
                        </div>
                        <p className="text-[10px] text-muted-foreground">Secure</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                          <FaTruck className="text-sm" />
                        </div>
                        <p className="text-[10px] text-muted-foreground">Fast Ship</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                          <FaRotate className="text-sm" />
                        </div>
                        <p className="text-[10px] text-muted-foreground">Returns</p>
                      </div>
                    </div>
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
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 gradient-primary text-white px-6 py-4 rounded-xl shadow-xl z-50 animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
