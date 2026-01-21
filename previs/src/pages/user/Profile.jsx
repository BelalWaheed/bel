import {
  Card,
  Typography,
  Button,
  Avatar,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  setEditLoggedUser,
  setName,
  setEmail,
  setPassword,
} from "../../redux/userSlices/profileSlice";
import { setUserChanged } from "../../redux/adminSlices/flagsSlice";

export default function Profile() {
  const { loggedUser, editLoggedUser } = useSelector((state) => state.profile);
  const { userChanged } = useSelector((state) => state.flags);
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      dispatch(setEditLoggedUser(loggedUser));
    }
  }, [isEditing, dispatch, loggedUser]);

  const validate = () => {
    const newErrors = {};
    const { name, email, password, id } = editLoggedUser;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email.";
    else if (allUsers.some((u) => u.email === email && u.id !== id)) {
      newErrors.email = "This email is already registered.";
    }

    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Save changes
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`${URL}/users/${editLoggedUser.id}`, editLoggedUser);
      dispatch(setUserChanged(!userChanged));
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4">
      <Card className="w-full max-w-md p-6 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-md">
        <div className="flex flex-col items-center gap-3">
          <Avatar
            variant="circular"
            size="md"
            alt="user avatar"
            withBorder
            color="blue-gray"
            className="p-0.5"
            src={
              loggedUser?.gender === "male"
                ? "https://i.ibb.co/JWJ9wnxY/male.png"
                : "https://i.ibb.co/xSmDKcN4/female-avatar-girl-face-woman-user-9-svgrepo-com.png"
            }
          />
          <Typography
            variant="h3"
            className="text-gray-900 dark:text-white pb-5 text-center"
          >
            {loggedUser?.name || "Your Name"} - Info
          </Typography>
        </div>

        <form className="space-y-6 mt-8 text-sm text-gray-800 dark:text-gray-300">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="font-medium sm:w-1/3">Name:</label>
            <div className="sm:w-2/3 w-full">
              {isEditing ? (
                <div className="flex flex-col gap-1">
                  <Input
                    label="Your name"
                    value={editLoggedUser.name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                    className="text-gray-800 dark:text-white"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
              ) : (
                <span>{loggedUser?.name}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="font-medium sm:w-1/3">Email:</label>
            <div className="sm:w-2/3 w-full">
              {isEditing ? (
                <div className="flex flex-col gap-1">
                  <Input
                    label="Your email"
                    value={editLoggedUser.email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    className="text-gray-800 dark:text-white"
                  />
                  {errors.email && (
                    <p className="text-red-500 ">{errors.email}</p>
                  )}
                </div>
              ) : (
                <span className="truncate">{loggedUser?.email}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="font-medium sm:w-1/3">Password:</label>
            <div className="sm:w-2/3 w-full flex items-center gap-2">
              {isEditing ? (
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Your password"
                    value={editLoggedUser.password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    className="text-gray-800 dark:text-white"
                  />
                  {errors.password && (
                    <p className="text-red-500 ">{errors.password}</p>
                  )}
                </div>
              ) : (
                <span className="tracking-widest">
                  {showPassword ? loggedUser.password : "••••••••"}
                </span>
              )}
              <IconButton
                variant="text"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </IconButton>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-6 space-y-2">
            {isEditing ? (
              <Button
                onClick={handleSave}
                fullWidth
                className="bg-gradient-to-r from-blue-700 to-purple-700 text-white"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                fullWidth
                className="bg-gradient-to-r from-blue-700 to-purple-700 text-white"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
