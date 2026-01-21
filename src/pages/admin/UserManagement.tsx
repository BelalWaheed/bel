import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { toggleUserChanged } from "@/redux/adminSlices/flagsSlice";
import { userApi } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function UserManagement() {
  const { allUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const deleteUser = async (id: string, role: string) => {
    if (role === "admin") {
      Swal.fire("Not Allowed", "You cannot delete an admin user.", "warning");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await userApi.delete(id);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        dispatch(toggleUserChanged());
      } catch {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    } else {
      Swal.fire("Cancelled", "The user is safe.", "info");
    }
  };

  const makeAdmin = async (id: string, currentRole: string) => {
    if (currentRole === "admin") {
      Swal.fire("Info", "This user is already an admin.", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Make Admin?",
      text: "This user will have admin privileges.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make admin!",
    });

    if (result.isConfirmed) {
      try {
        await userApi.update(id, { role: "admin" });
        Swal.fire("Success!", "User is now an admin.", "success");
        dispatch(toggleUserChanged());
      } catch {
        Swal.fire("Error", "Failed to update user role.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">All Users</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            View and manage registered users
          </p>
          <Link to="/admin/users/add">
            <Button className="mt-7 backdrop-blur-sm bg-blue-400/20 hover:bg-blue-500/30 border border-blue-400 text-blue-200 px-5 py-2 rounded-full transition-all shadow-md">
              Add New User
            </Button>
          </Link>
        </header>

        <div className="overflow-auto scrollbar-hidden rounded-2xl shadow-lg ring-1 ring-gray-800 bg-[#1e293b]">
          <Table>
            <TableHeader className="bg-[#334155]">
              <TableRow>
                <TableHead className="text-gray-300">Username</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-t border-gray-700 hover:bg-[#2d3b52]/70 transition-colors duration-150"
                  >
                    <TableCell className="text-gray-100">{user.name}</TableCell>
                    <TableCell className="text-gray-100">{user.email}</TableCell>
                    <TableCell className="text-emerald-400 font-medium">
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Link to={`/admin/users/edit/${user.id}`}>
                          <Button className="px-4 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-medium transition">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => deleteUser(user.id, user.role)}
                          disabled={user.role === "admin"}
                          className={
                            user.role === "admin"
                              ? "opacity-50 cursor-not-allowed"
                              : "px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-sm font-medium transition"
                          }
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => makeAdmin(user.id, user.role)}
                          disabled={user.role === "admin"}
                          className={
                            user.role === "admin"
                              ? "opacity-50 cursor-not-allowed"
                              : "px-4 py-1.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium transition"
                          }
                        >
                          Make Admin
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="p-6 text-center text-gray-400">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
