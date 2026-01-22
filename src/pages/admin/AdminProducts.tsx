import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { toggleProductChanged } from "@/redux/adminSlices/flagsSlice";
import { productApi } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/useTranslation";

export default function AdminProducts() {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const deleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: t("admin.deleteConfirmTitle"),
      text: t("admin.deleteConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("admin.yesDelete"),
      cancelButtonText: t("admin.noCancel"),
    });

    if (result.isConfirmed) {
      try {
        await productApi.delete(id);
        Swal.fire(t("admin.deleted"), t("admin.productDeleted"), "success");
        dispatch(toggleProductChanged());
      } catch {
        Swal.fire(t("admin.error"), "Something went wrong while deleting.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(t("admin.cancelled"), t("admin.safe"), "info");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2 gradient-text">
            {t("admin.manageProducts")}
          </h1>
          <Link to="/admin/products/add">
            <Button className="mt-4 rounded-full btn-premium">
              {t("admin.addNewProduct")}
            </Button>
          </Link>
        </header>

        <div className="w-full overflow-hidden rounded-2xl shadow-card bg-card border border-border">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground">{t("admin.image")}</TableHead>
                <TableHead className="text-muted-foreground">{t("admin.product")}</TableHead>
                <TableHead className="text-muted-foreground">{t("admin.price")}</TableHead>
                <TableHead className="text-muted-foreground">{t("admin.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-t border-border hover:bg-secondary/20 transition-colors duration-150"
                  >
                    <TableCell>
                      <Avatar className="h-12 w-12 bg-white p-1 shadow-sm">
                        <AvatarImage src={product.image} alt={product.title} className="object-contain" />
                        <AvatarFallback>{product.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-foreground max-w-xs truncate font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell className="text-primary font-semibold">
                      ${product.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                        <Link to={`/admin/products/view/${product.id}`}>
                          <Button size="sm" variant="outline" className="rounded-full hover:bg-secondary border-primary/20 hover:border-primary/50 text-foreground">
                            {t("common.view")}
                          </Button>
                        </Link>
                        <Link to={`/admin/products/edit/${product.id}`}>
                          <Button size="sm" variant="outline" className="rounded-full hover:bg-secondary border-yellow-500/20 hover:border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                            {t("common.edit")}
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                        >
                          {t("common.delete")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="p-6 text-center text-muted-foreground">
                    {t("admin.noProducts")}
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
