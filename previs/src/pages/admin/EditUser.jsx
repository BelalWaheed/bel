import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  resetUser,
  setEmail,
  setGender,
  setName,
  setPassword,
} from "../../redux/adminSlices/editUserSlice";
import { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { setUserChanged } from "../../redux/adminSlices/flagsSlice";
import axios from "axios";
import { setEditUser } from "../../redux/adminSlices/editUserSlice";

export default function EditUser() {
  const URL = import.meta.env.VITE_URL;
  const { allUsers } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.editUser);
  const { userChanged } = useSelector((state) => state.flags);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { userid } = useParams();

  async function getUserDetails() {
    try {
      const res = await axios.get(`${URL}/users/${userid}`);
      if (res.status === 200) {
        dispatch(setEditUser(res.data));
      }
    } catch (e) {
      alert("Error fetching product details. Please try again later.");
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [userid]);

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required.";
    const emailExists = allUsers.some(
      (u) => u.email === user.email && u.id !== user.id
    );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`${URL}/users/${userid}`, user);
      dispatch(setUserChanged(!userChanged));
      dispatch(resetUser());
      navigate("/admin/users");
    } catch {
      alert("Error updating user. Please try again.");
    }
  };

  return (
    <div className="flex items-center pb-24 justify-center min-h-screen bg-gradient-to-l  from-[#0f172a] to-[#1e293b] px-4">
      <Card
        color="transparent"
        shadow={false}
        className="p-6 rounded-xl w-full max-w-md  bg-white/5 backdrop-blur-md"
      >
        <Typography variant="h3" className="text-center font-bold  text-white">
          Edit User
        </Typography>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <Typography variant="h6" className="mb-1 text-gray-200">
                The Name
              </Typography>
              <Input
                size="lg"
                value={user.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder="Belal Waheed"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
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
              <Typography variant="h6" className="mb-1 text-gray-200">
                The Email
              </Typography>
              <Input
                size="lg"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="belal@example.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
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
            <div className="flex  flex-col  text-white">
              <Typography variant="h6" className="mb-1 text-gray-200">
                The Gender
              </Typography>
              <Select
                className=" text-white"
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
              <Typography variant="h6" className="mb-1 text-gray-200">
                The Password
              </Typography>
              <Input
                type="password"
                value={user.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="********"
                size="lg"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
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
            Update
          </Button>
          <Link to="/admin/users">
            <Button className="mt-6  text-white" fullWidth>
              Go Back
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}
