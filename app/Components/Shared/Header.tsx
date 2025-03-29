import React from "react";
import Logo from "@/public/images/LogoUnic.png";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
const Header = () => {
  return (
    <div className="bg-black text-white">
      {/* Desktop Header */}
      <div className="w-11/12 justify-between hidden lg:flex mx-auto p-5">
        <div>
          <Image src={Logo} alt="alt" width={400} height={0} />
        </div>

        <div className="flex items-center gap-10">
        <div className="">
            <ul className="flex items-center font-title2 text-xl tracking-wide gap-8 ">
              <li className="hover:text-red-400 cursor-pointer">Home</li>
              <li className="hover:text-red-400 cursor-pointer">About Us</li>
              <li className="hover:text-red-400 cursor-pointer">Events</li>
            </ul>
          </div>
          <div className="relative md:flex hidden">
            <input
              className="py-1.5 pr-4 border-2 w-80 bg-gray-100 text-black border-text pl-10 rounded-full outline-none focus:border-2 focus:border-[#A72424]"
              placeholder="Find Event by Category. eg. music"
            />
            <IoIosSearch className="absolute top-[9px] left-3 text-[#424242] text-[1.3rem]" />
          </div>
          
          <div>
            <button className="relative inline-flex items-center px-8 py-1 overflow-hidden text-lg font-medium  border-2  rounded-full hover:text-white group hover:bg-[#A72424]">
              <span className="absolute left-0 block w-full h-0 transition-all  opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative text-[1rem] group-hover:pr-4 font-title2 text-lg transition-all duration-400">
                Sign In
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
