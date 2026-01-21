import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { setUserChanged } from "../../redux/adminSlices/flagsSlice";

function ViewUsers() {
  const { allUsers } = useSelector((state) => state.user);
  const { userChanged } = useSelector((state) => state.flags);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const URL = import.meta.env.VITE_URL;

  const deleteUser = async (id, role) => {
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
        await axios.delete(`${URL}/users/${id}`);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        dispatch(setUserChanged(!userChanged));
      } catch (error) {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    } else {
      Swal.fire("Cancelled", "The user is safe.", "info");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">All Users</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            View and manage registered users
          </p>

          <Link to="/admin/add-user">
            <Button className="mt-7 backdrop-blur-sm bg-blue-400/20 hover:bg-blue-500/30 border border-blue-400 text-blue-200 px-5 py-2 rounded-full transition-all shadow-md">
              Add New User
            </Button>
          </Link>
        </header>

        <div className="overflow-auto scrollbar-hidden rounded-2xl shadow-lg ring-1 ring-gray-800 bg-[#1e293b]">
          <table className="min-w-[800px] w-full">
            <thead className="bg-[#334155] text-sm text-gray-300 uppercase">
              <tr>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-700 hover:bg-[#2d3b52]/70 transition-colors duration-150"
                  >
                    <td className="p-4 text-gray-100">{user.name}</td>
                    <td className="p-4 text-gray-100">{user.email}</td>
                    <td className="p-4 text-emerald-400 font-medium">
                      {user.role}
                    </td>
                    <td className="p-4 flex flex-wrap justify-center gap-2">
                      <Link to={`/admin/edit-user/${user.id}`}>
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
                            ? "opacity-50 "
                            : "px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-sm font-medium transition"
                        }
                      >
                        Delete
                      </Button>

                      <Button
                        size="sm"
                        className="px-4 py-1.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium transition"
                      >
                        Make Admin
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;
