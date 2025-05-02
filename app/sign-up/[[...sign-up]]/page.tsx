"use client";

import Image from "next/image";
// import { useState } from "react";
import RegisterImage from "@/public/images/register.webp"; // Adjust the path as necessary
// import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {


  
//   const [role, setRole] = useState("User"); // Default role
//   const roles = ["Admin", "Organizer", "User"]; // Available roles

  return (
    <div className="flex h-[700px] bg-[#1b1b1b]">
      {/* Left Section: Full-Screen Image */}
      <div className="w-1/2 h-[700px] relative">
        <Image
          src={RegisterImage}
          alt="Registration Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#383B39]">
        <SignUp></SignUp>
      </div>
    </div>
  );
};

export default SignUpPage;
