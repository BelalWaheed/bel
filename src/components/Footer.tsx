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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-gray-100 to-gray-200 dark:from-[#0f172a] dark:to-[#1e293b] text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold pt-serif-bold-italic">
              Hola fushoin
            </h2>
            <p className="text-muted-foreground text-sm">
              Your one-stop shop for the latest trends in fashion. Quality
              products, great prices, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <HiOutlineLocationMarker className="h-5 w-5 text-primary" />
                <span className="text-sm">123 Fashion Street, NY 10001</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <HiOutlinePhone className="h-5 w-5 text-primary" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <HiOutlineMail className="h-5 w-5 text-primary" />
                <span className="text-sm">support@holafushoin.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Hola fushoin. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
