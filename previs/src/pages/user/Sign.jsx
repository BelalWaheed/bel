import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetUser,
  setEmail,
  setGender,
  setName,
  setPassword,
} from "../../redux/userSlices/userSlice";
import { useState } from "react";
import { setLogged, setLoggedUser } from "../../redux/userSlices/profileSlice";
import { Select, Option } from "@material-tailwind/react";
import { setUserChanged } from "../../redux/adminSlices/flagsSlice";

const URL = import.meta.env.VITE_URL;

export function SignUp() {
  const { user, allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { userChanged } = useSelector((state) => state.flags);

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required.";

    const emailExists = allUsers.some((u) => u.email === user.email);
    if (emailExists) {
      setErrors({ email: "This email is already registered." });
      return;
    }
    if (!user.email.trim()) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    fetch(`${URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.userI = data.id;
        dispatch(setLoggedUser(data));

        dispatch(setLogged(true));
        navigate("/");
        dispatch(resetUser());
        dispatch(setUserChanged(!userChanged));
      });
  };

  return (
    <div className="flex items-center pb-24 justify-center min-h-screen bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4">
      <Card
        color="transparent"
        shadow={false}
        className="p-6 rounded-xl w-full max-w-md bg-white/80 dark:bg-white/5 dark:backdrop-blur-md"
      >
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 dark:text-white"
        >
          Sign Up
        </Typography>

        <Typography
          color="gray"
          className="mt-2 text-center text-base font-normal dark:text-gray-300"
        >
          Nice to meet you! Enter your details to register.
        </Typography>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <Typography variant="h6" className="mb-1 dark:text-gray-200">
                Your Name
              </Typography>
              <Input
                size="lg"
                value={user.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder="Belal Waheed"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && (
                <Typography variant="small" className="text-red-500 mt-1">
                  {errors.name}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="h6" className="mb-1 dark:text-gray-200">
                Your Email
              </Typography>
              <Input
                size="lg"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="belal@example.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.email && (
                <Typography variant="small" className="text-red-500 mt-1">
                  {errors.email}
                </Typography>
              )}
            </div>
            <div className="flex  flex-col text-gray-900 dark:text-white">
              <Typography variant="h6" className="mb-1 dark:text-gray-200">
                Your Gender
              </Typography>
              <Select
                className=" dark:text-white"
                value={user.gender}
                onChange={(e) => dispatch(setGender(e))}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </div>
            {errors.gender && (
              <Typography variant="small" className="text-red-500 mt-1">
                {errors.gender}
              </Typography>
            )}

            <div>
              <Typography variant="h6" className="mb-1 dark:text-gray-200">
                Password
              </Typography>
              <Input
                type="password"
                value={user.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="********"
                size="lg"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.password && (
                <Typography variant="small" className="text-red-500 mt-1">
                  {errors.password}
                </Typography>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 bg-gradient-to-r from-blue-700 to-purple-700 text-white"
            fullWidth
          >
            Sign Up
          </Button>

          <Typography
            color="gray"
            className="mt-4 text-center font-normal dark:text-gray-400"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-900 dark:text-white underline"
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
