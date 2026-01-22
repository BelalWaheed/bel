import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaUser, FaEnvelope, FaLock, FaPen, FaCheck, FaArrowRight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  setEditLoggedUser,
  setName,
  setEmail,
  setPassword,
  setLoggedUser,
} from "@/redux/userSlices/profileSlice";
import { toggleUserChanged } from "@/redux/adminSlices/flagsSlice";
import { userApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function UserProfile() {
  const { loggedUser, editLoggedUser } = useAppSelector((state) => state.profile);
  const { allUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t, isRTL } = useTranslation();
  const { SEO } = useSEO();

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isEditing && loggedUser) {
      dispatch(setEditLoggedUser({
        name: loggedUser.name,
        email: loggedUser.email,
        password: loggedUser.password,
        gender: loggedUser.gender,
        role: loggedUser.role,
      }));
    }
  }, [isEditing, dispatch, loggedUser]);

  const validate = () => {
    const newErrors: FormErrors = {};
    const { name, email, password } = editLoggedUser;

    if (!name.trim()) newErrors.name = t("auth.nameRequired");
    if (!email.trim()) newErrors.email = t("auth.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t("auth.invalidEmailFormat");
    else if (allUsers.some((u) => u.email === email && u.id !== loggedUser?.id)) {
      newErrors.email = t("auth.emailAlreadyRegistered");
    }

    if (!password.trim()) newErrors.password = t("auth.passwordRequired");
    else if (password.length < 6)
      newErrors.password = t("auth.passwordMinLength");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !loggedUser) return;

    setIsSaving(true);
    try {
      const updatedUser = await userApi.update(loggedUser.id, editLoggedUser);
      dispatch(setLoggedUser(updatedUser));
      dispatch(toggleUserChanged());
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const getAvatarUrl = () => {
    return loggedUser?.gender === "male"
      ? "https://i.ibb.co/JWJ9wnxY/male.png"
      : "https://i.ibb.co/xSmDKcN4/female-avatar-girl-face-woman-user-9-svgrepo-com.png";
  };

  if (!loggedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
            <FaUser className="text-4xl text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t("profile.loginRequired")}
          </h2>
          <Link to="/login">
            <Button className="btn-premium px-8 py-4 text-white text-lg group">
              {t("common.login")}
              <FaArrowRight className={`mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO 
        title={t("profile.title")}
        description="Manage your Hola Fushion account. Update your personal information, change password, and view your profile."
      />
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">{t("profile.title")}</span>
          </h1>
        </div>

        {/* Profile Card */}
        <div className="card-premium glass overflow-hidden">
          {/* Avatar Section */}
          <div className="relative bg-linear-to-br from-primary/20 to-accent/20 p-8 flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full gradient-primary p-1 shadow-xl">
                <Avatar className="w-full h-full">
                  <AvatarImage src={getAvatarUrl()} alt={loggedUser.name} />
                  <AvatarFallback className="text-3xl bg-card">
                    {loggedUser.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <FaPen className="text-sm" />
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground mt-4">
              {loggedUser.name}
            </h2>
            <p className="text-muted-foreground">{loggedUser.email}</p>
          </div>

          {/* Form Section */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <FaUser className="text-primary" />
              {t("profile.personalInfo")}
            </h3>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t("profile.name")}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={editLoggedUser.name}
                      onChange={(e) => dispatch(setName(e.target.value))}
                      className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <div className="h-12 px-4 rounded-xl bg-secondary/30 flex items-center text-foreground">
                    {loggedUser.name}
                  </div>
                )}
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t("profile.email")}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      value={editLoggedUser.email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      className="pl-10 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <div className="h-12 px-4 rounded-xl bg-secondary/30 flex items-center text-foreground">
                    {loggedUser.email}
                  </div>
                )}
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t("profile.password")}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={editLoggedUser.password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      className="pl-10 pr-12 h-12 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                    </button>
                  </div>
                ) : (
                  <div className="h-12 px-4 rounded-xl bg-secondary/30 flex items-center justify-between text-foreground">
                    <span className="tracking-widest">
                      {showPassword ? loggedUser.password : "••••••••"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                    </button>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Gender Display */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t("profile.gender")}
                </label>
                <div className="h-12 px-4 rounded-xl bg-secondary/30 flex items-center text-foreground capitalize">
                  {loggedUser.gender === "male" ? t("profile.male") : t("profile.female")}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1 h-12 rounded-xl"
                      disabled={isSaving}
                    >
                      {t("profile.cancel")}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 btn-premium h-12 text-white"
                    >
                      {isSaving ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("profile.saving")}
                        </span>
                      ) : (
                        <>
                          <FaCheck className="mx-2" />
                          {t("profile.saveChanges")}
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full btn-premium h-12 text-white"
                  >
                    <FaPen className="mx-2" />
                    {t("profile.editProfile")}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-medium shadow-xl">
            <FaCheck />
            {t("profile.profileUpdated")}
          </div>
        </div>
      )}
    </div>
  );
}
