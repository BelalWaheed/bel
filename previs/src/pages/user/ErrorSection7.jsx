import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ErrorSection7() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-[#0f172a] text-center">
      <div className="max-w-lg space-y-6">
        <Typography
          variant="h1"
          color="blue-gray"
          className="!text-5xl font-bold leading-tight dark:text-white"
        >
          404 – Page Not Found
        </Typography>

        <Typography className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
          Oops! It looks like something went wrong. The page you’re looking for
          doesn’t exist.
        </Typography>

        <div className="flex justify-center">
          <Link to="/">
            <Button className="bg-red-700 text-white font-medium px-6 py-3 rounded-md hover:bg-red-800 transition">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorSection7;
