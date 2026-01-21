import { Link, useNavigate } from "react-router-dom";
import { HiUser, HiLogout, HiCog } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { setLogged, setLoggedUser } from "@/redux/userSlices/profileSlice";
import { resetCart } from "@/redux/userSlices/productSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfileMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useAppSelector((state) => state.profile);

  const handleLogout = () => {
    localStorage.removeItem("userI");
    dispatch(setLogged(false));
    dispatch(setLoggedUser(null));
    dispatch(resetCart());
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={loggedUser?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {loggedUser?.name ? getInitials(loggedUser.name) : "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{loggedUser?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {loggedUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <HiUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {loggedUser?.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer">
              <HiCog className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <HiLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
