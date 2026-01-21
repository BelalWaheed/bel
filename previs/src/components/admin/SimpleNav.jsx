import { Navbar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function SimpleNav() {
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="  mx-auto max-w-screen-xl rounded-2xl shadow-lg overflow-hidden bg-gradient-to-l from-[#0f172a] to-[#1e293b] px-4 py-3"
    >
      <div className=" w-full flex mdflex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-16">
          <Typography
            as={Link}
            to=""
            variant="h6"
            className="text-2xl sm:text-3xl cursor-pointer hover:underline pt-serif-bold-italic "
          >
            Admin Dashboard
          </Typography>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-lg sm:text-2xl">
            <Typography
              as={Link}
              to="users"
              className="cursor-pointer text-2xl hover:underline pt-serif-bold-italic"
            >
              Users
            </Typography>
            <Typography
              as={Link}
              to="products"
              className="cursor-pointer text-2xl hover:underline pt-serif-bold-italic"
            >
              Products
            </Typography>
          </div>
        </div>

        <div className="flex justify-end md:justify-start">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default SimpleNav;
