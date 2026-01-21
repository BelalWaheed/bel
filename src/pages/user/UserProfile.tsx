import { useState, useEffect } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import {
  setEditLoggedUser,
  setName,
  setEmail,
  setPassword,
} from "@/redux/userSlices/profileSlice";
import { toggleUserChanged } from "@/redux/adminSlices/flagsSlice";
import { userApi } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function UserProfile() {
  const { loggedUser, editLoggedUser } = useAppSelector((state) => state.profile);
  const { allUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email.";
    else if (allUsers.some((u) => u.email === email && u.id !== loggedUser?.id)) {
      newErrors.email = "This email is already registered.";
    }

    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !loggedUser) return;

    try {
      await userApi.update(loggedUser.id, editLoggedUser);
      dispatch(toggleUserChanged());
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getAvatarUrl = () => {
    return loggedUser?.gender === "male"
      ? "https://i.ibb.co/JWJ9wnxY/male.png"
      : "https://i.ibb.co/xSmDKcN4/female-avatar-girl-face-woman-user-9-svgrepo-com.png";
  };

  if (!loggedUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4">
      <Card className="w-full max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-md">
        <CardHeader className="flex flex-col items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={getAvatarUrl()} alt={loggedUser.name} />
            <AvatarFallback>{loggedUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center">
            {loggedUser.name} - Info
          </h2>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="font-medium sm:w-1/3">Name:</label>
              <div className="sm:w-2/3 w-full">
                {isEditing ? (
                  <div className="space-y-1">
                    <Input
                      value={editLoggedUser.name}
                      onChange={(e) => dispatch(setName(e.target.value))}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <span>{loggedUser.name}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="font-medium sm:w-1/3">Email:</label>
              <div className="sm:w-2/3 w-full">
                {isEditing ? (
                  <div className="space-y-1">
                    <Input
                      value={editLoggedUser.email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                ) : (
                  <span className="truncate block">{loggedUser.email}</span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="font-medium sm:w-1/3">Password:</label>
              <div className="sm:w-2/3 w-full flex items-center gap-2">
                {isEditing ? (
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={editLoggedUser.password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      placeholder="Your password"
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>
                ) : (
                  <span className="tracking-widest">
                    {showPassword ? loggedUser.password : "••••••••"}
                  </span>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-6">
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  className="w-full bg-linear-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white"
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-linear-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
