import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  resetUser,
  setEmail,
  setGender,
  setName,
  setPassword,
} from "@/redux/userSlices/userSlice";
import { toggleUserChanged } from "@/redux/adminSlices/flagsSlice";
import { userApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface FormErrors {
  name?: string;
  email?: string;
  gender?: string;
  password?: string;
}

export default function AddUser() {
  const { user, allUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const { t } = useTranslation();

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
      await userApi.create(user);
      dispatch(toggleUserChanged());
      dispatch(resetUser());
      navigate("/admin/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex items-center pb-24 justify-center min-h-[calc(100vh-60px)] px-4">
      <Card className="w-full max-w-md card-premium">
        <CardHeader>
          <CardTitle className="text-center text-foreground text-2xl">
            {t("admin.addNewUser")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t("common.name")}</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder={t("auth.yourName")}
                className="bg-background"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder={t("auth.yourEmail")}
                className="bg-background"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("profile.gender")}</Label>
              <Select
                value={user.gender}
                onValueChange={(value) => dispatch(setGender(value))}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("auth.selectGenderPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("profile.male")}</SelectItem>
                  <SelectItem value="female">{t("profile.female")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("common.password")}</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="********"
                className="bg-background"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full btn-premium font-bold py-3 rounded-md"
            >
              {t("admin.addNewUser")}
            </Button>

            <Link to="/admin/users">
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 border-input bg-background hover:bg-muted text-foreground"
              >
                {t("common.cancel")}
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
