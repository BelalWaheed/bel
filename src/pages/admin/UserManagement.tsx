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
import { useTranslation } from "@/hooks/useTranslation";

export default function UserManagement() {
  const { allUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const deleteUser = async (id: string, role: string) => {
    if (role === "admin") {
      Swal.fire(t("admin.error"), t("admin.cannotDeleteAdmin"), "warning");
      return;
    }

    const result = await Swal.fire({
      title: t("admin.deleteConfirmTitle"),
      text: t("admin.areYouSureUser"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("admin.yesDelete"),
      cancelButtonText: t("admin.noCancel"),
    });

    if (result.isConfirmed) {
      try {
        await userApi.delete(id);
        Swal.fire(t("admin.deleted"), t("admin.userDeleted"), "success");
        dispatch(toggleUserChanged());
      } catch {
        Swal.fire(t("admin.error"), "Failed to delete user.", "error");
      }
    } else {
      Swal.fire(t("admin.cancelled"), t("admin.safe"), "info");
    }
  };

  const makeAdmin = async (id: string, currentRole: string) => {
    if (currentRole === "admin") {
      Swal.fire("Info", t("admin.alreadyAdmin"), "info");
      return;
    }

    const result = await Swal.fire({
      title: t("admin.makeAdmin"),
      text: "This user will have admin privileges.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t("admin.makeAdmin"),
    });

    if (result.isConfirmed) {
      try {
        await userApi.update(id, { role: "admin" });
        Swal.fire("Success!", t("admin.userPromoted"), "success");
        dispatch(toggleUserChanged());
      } catch {
        Swal.fire("Error", "Failed to update user role.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2 gradient-text">{t("admin.manageUsers")}</h1>
          <Link to="/admin/users/add">
            <Button className="mt-7 rounded-full btn-premium">
              {t("admin.addNewUser")}
            </Button>
          </Link>
        </header>

        <div className="overflow-hidden rounded-2xl shadow-card bg-card border border-border">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground">{t("admin.username")}</TableHead>
                <TableHead className="text-muted-foreground">{t("admin.email")}</TableHead>
                <TableHead className="text-muted-foreground">{t("admin.role")}</TableHead>
                <TableHead className="text-muted-foreground text-center">{t("admin.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-t border-border hover:bg-secondary/20 transition-colors duration-150"
                  >
                    <TableCell className="text-foreground font-medium">{user.name}</TableCell>
                    <TableCell className="text-foreground">{user.email}</TableCell>
                    <TableCell className="text-emerald-500 font-medium">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Link to={`/admin/users/edit/${user.id}`}>
                          <Button size="sm" variant="outline" className="rounded-full hover:bg-secondary border-yellow-500/20 hover:border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                             {t("admin.edit")}
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => deleteUser(user.id, user.role)}
                          disabled={user.role === "admin"}
                          className={
                            user.role === "admin"
                              ? "opacity-50 cursor-not-allowed hidden"
                              : "rounded-full bg-red-500 hover:bg-red-600 text-white"
                          }
                        >
                          {t("admin.delete")}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => makeAdmin(user.id, user.role)}
                          disabled={user.role === "admin"}
                          className={
                            user.role === "admin"
                              ? "opacity-50 cursor-not-allowed hidden"
                              : "rounded-full bg-teal-600 hover:bg-teal-700 text-white"
                          }
                        >
                          {t("admin.makeAdmin")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="p-6 text-center text-muted-foreground">
                    {t("admin.noUsers")}
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
