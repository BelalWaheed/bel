import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { resetUser, setEmail, setPassword } from "@/redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const { allUsers, user } = useAppSelector((state) => state.user);
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
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
        email: emailExists ? undefined : "Email not found.",
        password: emailExists ? "Incorrect password." : undefined,
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
    <div className="flex items-center pb-24 justify-center min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4">
      <Card className="w-full max-w-md bg-white/80 dark:bg-white/5 dark:backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold pt-serif-bold-italic">
            Login
          </CardTitle>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Please enter your credentials.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white"
            >
              Log In
            </Button>

            <p className="text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-foreground underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
