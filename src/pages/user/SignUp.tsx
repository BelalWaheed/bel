import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  resetUser,
  setEmail,
  setGender,
  setName,
  setPassword,
} from "@/redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
import { toggleUserChanged } from "@/redux/adminSlices/flagsSlice";
import { userApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";

interface FormErrors {
  name?: string;
  email?: string;
  gender?: string;
  password?: string;
}

export default function SignUp() {
  const { user, allUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const { t } = useTranslation();
  const { SEO } = useSEO();

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!user.name.trim()) newErrors.name = t("auth.nameRequired");

    const emailExists = allUsers.some((u) => u.email === user.email);
    if (emailExists) {
      newErrors.email = t("auth.emailAlreadyRegistered");
    } else if (!user.email.trim()) {
      newErrors.email = t("auth.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = t("auth.invalidEmailFormat");
    }

    if (!user.gender || user.gender === "") {
      newErrors.gender = t("auth.selectGender");
    }

    if (!user.password.trim()) {
      newErrors.password = t("auth.passwordRequired");
    } else if (user.password.length < 6) {
      newErrors.password = t("auth.passwordMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const newUser = await userApi.create(user);
      localStorage.setItem("userI", newUser.id);
      dispatch(setLoggedUser(newUser));
      dispatch(setLogged(true));
      navigate("/");
      dispatch(resetUser());
      dispatch(toggleUserChanged());
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SEO 
        title={t("auth.createAccount")}
        description="Create your Hola Fushion account. Join us for exclusive deals, fast checkout, and personalized shopping experience."
      />
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
              <span className="gradient-text">{t("common.signUp")}</span>
            </h1>
            <p className="text-muted-foreground">
              {t("auth.niceToMeet")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("auth.yourName")}</Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  value={user.name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  placeholder="John Doe"
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.yourEmail")}</Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  placeholder="you@example.com"
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>{t("auth.yourGender")}</Label>
              <Select
                value={user.gender}
                onValueChange={(value) => dispatch(setGender(value))}
              >
                <SelectTrigger className="h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder={t("auth.selectGenderPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("auth.male")}</SelectItem>
                  <SelectItem value="female">{t("auth.female")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender}</p>
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
                  placeholder="********"
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="btn-premium w-full h-12 text-white text-lg"
            >
              {t("common.signUp")}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-muted-foreground mt-6">
            {t("auth.haveAccount")}{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              {t("common.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
