import { Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useTranslation();

  return (
    <footer className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  Hola Fushion
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {language === "ar" 
                  ? "متجرك المفضل لأحدث صيحات الموضة. منتجات عالية الجودة بأسعار رائعة وخدمة استثنائية."
                  : "Your one-stop shop for the latest trends in fashion. Quality products, great prices, and exceptional service."}
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: FaLinkedinIn, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-secondary hover:gradient-primary text-foreground hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "ar" ? "روابط سريعة" : "Quick Links"}
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: t("common.home") },
                  { to: "/products", label: t("common.shop") },
                  { to: "/cart", label: t("common.cart") },
                  { to: "/profile", label: t("common.profile") },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors animated-underline inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "ar" ? "خدمة العملاء" : "Customer Service"}
              </h3>
              <ul className="space-y-3">
                {[
                  { label: language === "ar" ? "الأسئلة الشائعة" : "FAQ", href: "#" },
                  { label: language === "ar" ? "الشحن والإرجاع" : "Shipping & Returns", href: "#" },
                  { label: t("footer.terms"), href: "#" },
                  { label: t("footer.privacy"), href: "#" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors animated-underline inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t("footer.contact")}
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: HiOutlineLocationMarker, text: language === "ar" ? "١٢٣ شارع الأزياء، نيويورك" : "123 Fashion Street, NY 10001" },
                  { icon: HiOutlinePhone, text: "+1 (555) 123-4567" },
                  { icon: HiOutlineMail, text: "support@holafushion.com" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Hola Fushion. {t("footer.rights")}.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                {[
                  { label: language === "ar" ? "الشروط" : "Terms", href: "#" },
                  { label: language === "ar" ? "الخصوصية" : "Privacy", href: "#" },
                  { label: language === "ar" ? "ملفات تعريف الارتباط" : "Cookies", href: "#" },
                ].map((link, i) => (
                  <a key={i} href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
