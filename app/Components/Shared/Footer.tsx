import React from 'react';
import { FaWhatsapp, FaEnvelope, FaFacebook } from 'react-icons/fa';
import Logo from "@/public/images/LogoUnic.png";
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Section */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col space-y-5 mt-10">
          {/* Logo or Icon */}
          <div className="text-4xl font-bold"> <Image src={Logo} alt="logo" width={400} height={400} /></div>
          <div>
            
            <p className="lg:text-lg text-md">Your All In One Event Management Solution</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-6 md:mt-0">
          {/* Navigation Links */}
          <nav className="flex space-x-4">
            <Link href="/" className="lg:text-xl text-lg hover:text-gray-400">Home</Link>
            <Link href="/events" className="lg:text-xl text-lg hover:text-gray-400">Events</Link>
           
            <Link href="#" className="lg:text-xl text-lg hover:text-gray-400">About Us</Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/8801788889947"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaWhatsapp size={40} />
            </a>

            {/* Email Link */}
            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=cseacademicsolutions@gmail.com&su=Inquiry%20for%20Services&body=Dear%20CSE%20Academic%20Solutions,%0A%0AI%20am%20in%20need%20of%20your%20services.%20Could%20you%20please%20provide%20more%20information%20about%20the%20services%20you%20offer?%0A%0AThank%20you."
  aria-label="Email"
  className="hover:text-gray-400"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaEnvelope size={40} />
</a>



            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/cseacademicsolutions"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaFacebook size={40} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black py-4 text-white text-center text-sm">
        Copyright © 2025 - All rights reserved by Alif Hossain
      </div>
    </footer>
  );
};

export default Footer;