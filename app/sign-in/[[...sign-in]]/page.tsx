import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';
import LoginImage from '@/public/images/login.webp'; // Adjust the path as necessary
import { SignIn } from '@clerk/nextjs'
const SignInPage = () => {
    return (
        <div className="flex h-[700px]  bg-[#1b1b1b]">
        {/* Left Section: Full-Screen Image */}
        <div className="w-1/2 h-[700px] relative">
          <Image
            src={LoginImage} // Replace with your image path
            alt="Background"
           height={0}
            className="object-cover w-full h-full"
            width={0}
           
          />
        </div>
  
        {/* Right Section: Login Form */}
        <div className="w-1/2 flex items-center justify-center bg-#1b1b1b]">
        <SignIn />
        </div>
      </div>
    );
};

export default SignInPage;