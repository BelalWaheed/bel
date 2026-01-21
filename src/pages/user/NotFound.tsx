import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-[#0f172a] text-center">
      <div className="max-w-lg space-y-6">
        <h1 className="text-5xl font-bold leading-tight text-foreground">
          404 – Page Not Found
        </h1>

        <p className="text-muted-foreground text-base md:text-lg">
          Oops! It looks like something went wrong. The page you're looking for
          doesn't exist.
        </p>

        <div className="flex justify-center">
          <Link to="/">
            <Button className="bg-red-700 hover:bg-red-800 text-white font-medium px-6 py-3 rounded-md transition">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
