
import React from 'react';
import UpcomingEventsBg from '@/public/images/UpcomingEventsBg.webp';

const UpcomingEvents = () => {
    return (
        <div
      className="relative bg-cover py-24 bg-center h-[1700px] lg:h-[800px] flex items-start justify-center transition-opacity duration-300"
      style={{
        backgroundImage: `url(${UpcomingEventsBg.src})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center 20%", // 20% from the top, adjust as needed
      }}
    >
      {/* Background Image Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-40 hover:opacity-60 transition-opacity duration-300 z-0"></div> */}
      <div className="text-center space-y-9">
        <h1 className="text-white  font-title2 font-bold text-4xl tracking-wider">
          Next on the <span className="text-red-500">Scene</span>
        </h1>
        <p className="text-white text-xl font-text tracking-wide leading-relaxed w-7/12 mx-auto ">
        Something amazing is coming your way! Get ready to dive into unforgettable experiences that will spark inspiration and leave you craving more.
        </p>
      </div>





      
    </div>
    );
};

export default UpcomingEvents;