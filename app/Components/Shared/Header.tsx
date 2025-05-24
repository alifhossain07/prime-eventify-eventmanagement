"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/app/Providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";


const Header = () => {
  // @ts-expect-error:mylifemyrules
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, log out',
    cancelButtonText: 'No, stay logged in'
  }).then((result) => {
    if (result.isConfirmed) {
      logOut();
      Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
    }
  });
};
  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    if (!user || !user.role) return "/dashboard"; // fallback

    switch (user.role.toLowerCase()) {
      case "admin":
        return "/adminDashboard";
      case "organizer":
        return "/organizerDashboard";
      case "user":
        return "/userDashboard";
      default:
        return "/dashboard"; // fallback for unknown roles
    }
  };

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
            <Link href="/">
              <li className="hover:text-red-400 cursor-pointer">Home</li>
            </Link>
            <Link href="/aboutus">
              <li className="hover:text-red-400 cursor-pointer">About Us</li>
            </Link>
            <Link href="/events">
              <li className="hover:text-red-400 cursor-pointer">Events</li>
            </Link>
          </ul>

       
          

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
              <div className="dropdown dropdown-end relative">
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar ring-1 ring-gray-300 hover:ring-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out focus:outline-none"
    aria-label="User menu"
  >
    <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
      <Image
        src={user?.photoURL || "https://i.ibb.co/KyWtrr4/avatar.jpg"}
        alt="User Avatar"
        width={36}
        height={36}
        className="object-cover"
        priority
      />
    </div>
  </div>

  <ul
    tabIndex={0}
    className="dropdown-content menu bg-white rounded-lg shadow-md w-64 mt-3 p-5 space-y-4 text-gray-900 ring-1 ring-black ring-opacity-5 z-50"
  >
    {/* User Info */}
    <li className="border-b border-gray-200 pb-4">
      <p className="text-base font-semibold truncate">{user?.displayName || "Unnamed User"}</p>
      <p className="text-sm text-gray-500 truncate select-text">{user?.email}</p>
    </li>

    {/* Actions */}
    <li>
      <Link
        href={getDashboardPath()}
        className="block px-4 py-2 rounded-md text-gray-800 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
        role="menuitem"
      >
        Dashboard
      </Link>
    </li>

    <li>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 rounded-md text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 transition"
        role="menuitem"
      >
        Logout
      </button>
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
