import { Link } from "react-router-dom";
import Collections from "../../components/user/Collections";
function Home() {
  return (
    <div className="">
      <div className=" ">
        <div className="bg-[url('https://i.ibb.co/KjQVhBPg/main-1.jpg')] bg-center bg-no-repeat h-[calc(100vh-78px)]">
          <div className="text-red-500   h-full flex items-center justify-start ">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="  flex items-center justify-center px-8">
                <div className="max-w-md space-y-4">
                  <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
                    Fall – Winter
                    <br />
                    Collections 2023
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base ">
                    A specialist label creating luxury essentials. Ethically
                    crafted with an unwavering commitment to exceptional
                    quality.
                  </p>
                  <div className="">
                    <Link
                      to={"/products"}
                      className=" px-6 py-3 bg-red-700 text-white font-bold rounded-md text-sm hover:bg-red-700 transition transform hover:scale-105"
                    >
                      SHOP NOW
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:bg-[#0f172a] transition-colors">
        <Collections />
      </div>
    </div>
  );
}

export default Home;
