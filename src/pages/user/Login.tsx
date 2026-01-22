import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { resetUser, setEmail, setPassword } from "@/redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const { allUsers, user } = useAppSelector((state) => state.user);
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!user.email.trim()) {
      newErrors.email = language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    }

    if (!user.password.trim()) {
      newErrors.password = language === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const foundUser = allUsers.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (!foundUser) {
      const emailExists = allUsers.find((u) => u.email === user.email);
      setErrors({
        email: emailExists ? undefined : (language === "ar" ? "البريد الإلكتروني غير موجود" : "Email not found."),
        password: emailExists ? (language === "ar" ? "كلمة المرور غير صحيحة" : "Incorrect password.") : undefined,
      });
      return;
    }

    localStorage.setItem("userI", foundUser.id);
    dispatch(setLoggedUser(foundUser));
    dispatch(setLogged(true));
    (document.activeElement as HTMLElement)?.blur();
    navigate("/");
    dispatch(resetUser());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="card-premium p-8 glass">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">H</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">{t("common.login")}</span>
            </h1>
            <p className="text-muted-foreground">
              {language === "ar" 
                ? "مرحباً بعودتك! أدخل بياناتك للمتابعة."
                : "Welcome back! Enter your credentials to continue."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-end">
              <a href="#" className="text-sm text-primary hover:underline">
                {t("auth.forgotPassword")}
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="btn-premium w-full h-12 text-white text-lg"
            >
              {t("common.login")}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground mt-6">
            {t("auth.noAccount")}{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-primary hover:underline"
            >
              {t("common.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
