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

export default function AdminProducts() {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const deleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await productApi.delete(id);
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        dispatch(toggleProductChanged());
      } catch {
        Swal.fire("Error", "Something went wrong while deleting.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "The product is safe :)", "info");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            Manage your products efficiently
          </h1>
          <Link to="/admin/products/add">
            <Button className="m-4 backdrop-blur-sm bg-blue-400/20 hover:bg-blue-500/30 border border-blue-400 text-blue-200 px-5 py-2 rounded-full transition-all shadow-md">
              Add New Product
            </Button>
          </Link>
        </header>

        <div className="w-full overflow-auto scrollbar-hidden rounded-2xl shadow-lg ring-1 ring-gray-800 bg-linear-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a]">
          <Table>
            <TableHeader className="bg-[#334155]">
              <TableRow>
                <TableHead className="text-gray-300">Image</TableHead>
                <TableHead className="text-gray-300">Product</TableHead>
                <TableHead className="text-gray-300">Price</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-t border-gray-700 hover:bg-[#2d3b52]/70 transition-colors duration-150"
                  >
                    <TableCell>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={product.image} alt={product.title} />
                        <AvatarFallback>{product.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-gray-100 max-w-xs truncate">
                      {product.title}
                    </TableCell>
                    <TableCell className="text-green-400 font-semibold">
                      ${product.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                        <Link to={`/admin/products/view/${product.id}`}>
                          <Button className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium transition">
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/products/edit/${product.id}`}>
                          <Button className="px-4 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-medium transition">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          onClick={() => deleteProduct(product.id)}
                          className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-sm font-medium transition"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="p-6 text-center text-gray-400">
                    No products available.
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
