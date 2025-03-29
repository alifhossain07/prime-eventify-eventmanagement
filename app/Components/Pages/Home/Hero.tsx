import React from "react";
import HeroImage from "@/public/images/HeroImage.webp";
import { FaCalendarAlt, FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";
import "@/app/Components/Pages/Home/Homepage.css"
const Hero = () => {
  return (
    <div>
      <div
        className="hero bg-cover bg-left-bottom bg-no-repeat h-[650px]"
        style={{
          backgroundImage:
            `url(${HeroImage.src})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="bg-black/70 absolute left-56 text-white px-16 py-16 border-radius ">
            <h1 className="text-center mb-10 text-3xl font-title2 tracking-wider">Plan Your <span className="text-red-500">Perfect Event</span></h1>
            <div className="flex tracking-wider font-text gap-10 ">
                <div className="flex flex-col items-center gap-4">
                <FaCalendarAlt className="text-red-500 text-5xl" />
                    <h1>Event Scheduling</h1>
                </div>
                <div className="flex flex-col items-center gap-4">
                <FaUserFriends className="text-red-500 text-5xl" />
                    <h1>Guest Management</h1>
                </div>
                <div className="flex flex-col items-center gap-4">
                <FaMapMarkerAlt className="text-red-500 text-5xl" />
                    <h1>Venue Selection</h1>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
