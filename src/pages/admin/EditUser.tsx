import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  resetUser,
  setEmail,
  setGender,
  setName,
  setPassword,
  setEditUser,
} from "@/redux/adminSlices/editUserSlice";
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

export default function EditUser() {
  const { allUsers } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.editUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const { userId } = useParams();

  useEffect(() => {
    async function getUserDetails() {
      if (!userId) return;
      try {
        const userData = await userApi.getById(userId);
        dispatch(setEditUser({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          gender: userData.gender,
          role: userData.role,
        }));
      } catch (e) {
        alert("Error fetching user details. Please try again later.");
      }
    }
    getUserDetails();
  }, [userId, dispatch]);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!user.name.trim()) newErrors.name = "Name is required.";

    const emailExists = allUsers.some(
      (u) => u.email === user.email && u.id !== userId
    );
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
    if (!validate() || !userId) return;

    try {
      await userApi.update(userId, user);
      dispatch(toggleUserChanged());
      dispatch(resetUser());
      navigate("/admin/users");
    } catch {
      alert("Error updating user. Please try again.");
    }
  };

  return (
    <div className="flex items-center pb-24 justify-center min-h-screen bg-linear-to-l from-[#0f172a] to-[#1e293b] px-4">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-white text-2xl">
            Edit User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                The Name
              </Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder="John Doe"
                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                The Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="user@example.com"
                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-200">The Gender</Label>
              <Select
                value={user.gender}
                onValueChange={(value) => dispatch(setGender(value))}
              >
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-400">{errors.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                The Password
              </Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="********"
                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
              />
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white"
            >
              Update
            </Button>

            <Link to="/admin/users">
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 border-gray-600 text-white hover:bg-white/10"
              >
                Go Back
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
