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
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
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

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!user.name.trim()) newErrors.name = "Name is required.";

    const emailExists = allUsers.some((u) => u.email === user.email);
    if (emailExists) {
      newErrors.email = "This email is already registered.";
    } else if (!user.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!user.gender || user.gender === "") {
      newErrors.gender = "Please select a gender.";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
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
    <div className="flex items-center pb-24 justify-center min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4">
      <Card className="w-full max-w-md bg-white/80 dark:bg-white/5 dark:backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <p className="mt-2 text-muted-foreground">
            Nice to meet you! Enter your details to register.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

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
              <Label>Your Gender</Label>
              <Select
                value={user.gender}
                onValueChange={(value) => dispatch(setGender(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender}</p>
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
              Sign Up
            </Button>

            <p className="text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-foreground underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
