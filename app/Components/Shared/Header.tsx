"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/app/Providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
// @ts-expect-error:mylifemyrules
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-black text-white">
      <div className="w-11/12 justify-between hidden lg:flex mx-auto p-5">
        {/* Logo */}
        <div>
          <Image src="/images/LogoUnic.png" alt="Logo" width={400} height={0} />
        </div>

        {/* Nav and Actions */}
        <div className="flex items-center gap-10">
          {/* Nav Links */}
          <ul className="flex items-center font-title2 text-xl tracking-wide gap-8">
            <Link href="/"><li className="hover:text-red-400 cursor-pointer">Home</li></Link>
            <Link href="/aboutus"><li className="hover:text-red-400 cursor-pointer">About Us</li></Link>
            <Link href="/events"><li className="hover:text-red-400 cursor-pointer">Events</li></Link>
          </ul>

          {/* Search Bar */}
          <div className="relative md:flex hidden">
            <input
              className="py-1.5 pr-4 border-2 w-80 bg-gray-100 text-black border-text pl-10 rounded-full outline-none focus:border-[#A72424]"
              placeholder="Find Event by Category. eg. music"
            />
            <IoIosSearch className="absolute top-[9px] left-3 text-[#424242] text-[1.3rem]" />
          </div>

          {/* User Dropdown */}
          <div>
            {!user ? (
              <Link href="/sign-in">
                <button className="relative cursor-pointer inline-flex items-center px-8 py-1 overflow-hidden text-lg font-medium border-2 rounded-full hover:text-white group hover:bg-[#A72424]">
                  <span className="relative text-[1rem] group-hover:pr-4 font-title2 text-lg transition-all duration-400">
                    Sign In
                  </span>
                </button>
              </Link>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={user?.photoURL || "https://i.ibb.co/KyWtrr4/avatar.jpg"}
                      alt="User Avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li><span className="font-bold">{user.displayName}</span></li>
                  <li><span className="text-sm text-gray-500">{user.email}</span></li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOut} className="text-red-500 hover:text-red-700">Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
