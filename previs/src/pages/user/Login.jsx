import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetUser,
  setEmail,
  setPassword,
} from "../../redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "../../redux/userSlices/profileSlice";

export function Login() {
  const { allUsers, user } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!user.email.trim()) {
      newErrors.email = "Email is ?????";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is ?????";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
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
    localStorage.userI = foundUser.id;
    dispatch(setLoggedUser(foundUser));
    dispatch(setLogged(true));
    document.activeElement?.blur(); // to remove the focus becouse there is a consle problem
    navigate("/");
    dispatch(resetUser());
  };


  return (
    <div className="flex items-center pb-24 justify-center min-h-screen bg-gradient-to-l from-gray-50 to-gray-100 dark:bg-gradient-to-l dark:from-[#0f172a] dark:to-[#1e293b] px-4">
      <Card
        color="transparent"
        shadow={false}
        className="p-6 rounded-xl w-full max-w-md bg-white/80 dark:bg-white/5 dark:backdrop-blur-md"
      >
        <Typography
          variant="h3"
          className="text-center font-bold pt-serif-bold-italic text-gray-800 dark:text-white"
        >
          Login
        </Typography>

        <Typography
          color="gray"
          className="mt-2 text-center text-base font-normal dark:text-gray-300"
        >
          Welcome back! Please enter your credentials.
        </Typography>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <Typography variant="h6" className="mb-1 dark:text-gray-200">
                Your Email
              </Typography>
              <Input
                size="lg"
                name="email"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="you@example.com"
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

            <div>
              <Typography variant="h6" className="mb-1 dark:text-gray-200">
                Password
              </Typography>
              <Input
                type="password"
                name="password"
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
            Log In
          </Button>

          <Typography
            color="gray"
            className="mt-4 text-center font-normal dark:text-gray-400"
          >
            Don’t have an account?{" "}
            <Link
              to="/sign-in"
              className="font-medium text-gray-900 dark:text-white underline"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
