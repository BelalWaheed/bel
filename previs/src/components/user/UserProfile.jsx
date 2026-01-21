import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogged } from "../../redux/userSlices/profileSlice";

export default function UserProfile() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.profile);
  const logout = () => {
    localStorage.removeItem("userI");
    dispatch(setLogged(false));
    navigate("/");
  };
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          {loggedUser?.gender === "male" ? (
            <Avatar
              variant="circular"
              size="md"
              alt="tania andrew"
              withBorder={true}
              color="blue-gray"
              className=" p-0.5"
              src="https://i.ibb.co/JWJ9wnxY/male.png"
            />
          ) : (
            <Avatar
              variant="circular"
              size="md"
              alt="tania andrew"
              withBorder={true}
              color="blue-gray"
              className=" p-0.5"
              src="https://i.ibb.co/xSmDKcN4/female-avatar-girl-face-woman-user-9-svgrepo-com.png"
            />
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <Link to="profile">
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
          >
            <Typography variant="small" className="font-normal">
              {loggedUser.name} Profile
            </Typography>
          </MenuItem>
        </Link>

        {loggedUser.role === "admin" && (
          <Link to="admin">
            <MenuItem
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
            >
              <Typography variant="small" className="font-normal">
                Admin Panel
              </Typography>
            </MenuItem>
          </Link>
        )}
        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
        >
          <Typography
            onClick={logout}
            as="button"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Sign out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
