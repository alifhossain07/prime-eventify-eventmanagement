"use client";
import React from "react";
import UpcomingEventsBg from "@/public/images/UpcomingEventsBg.webp";
import Image from "next/image";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Marketing Strategy",
      description:
        "A marketing strategy is a plan to reach target customers...",
    },
    {
      title: "Event Planning",
      description:
        "Event planning involves coordinating every detail of an event...",
    },
    {
      title: "Digital Marketing",
      description:
        "Digital marketing involves promoting products or services using digital channels...",
    },
  ];
  // Declare plugins as a constant

  return (
    <div
      className="bg-cover py-24 bg-center h-[1700px] lg:h-[800px] items-start justify-center transition-opacity duration-300"
      style={{
        backgroundImage: `url(${UpcomingEventsBg.src})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center 20%", // 20% from the top, adjust as needed
      }}
    >
      {/* Background Image Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-40 hover:opacity-60 transition-opacity duration-300 z-0"></div> */}

      <div className="w-10/12 mx-auto">
        <div className="text-center space-y-9">
          <h1 className="text-white font-title2 font-bold text-4xl tracking-wider">
            Next on the <span className="text-red-500">Scene</span>
          </h1>
          <p className="text-white text-xl font-text tracking-wide leading-relaxed w-7/12 mx-auto">
            Something amazing is coming your way! Get ready to dive into
            unforgettable experiences that will spark inspiration and leave you
            craving more.
          </p>
        </div>

        {/* Upcoming Events Carousel */}
        <div className="flex w-10/12 mx-auto flex-col lg:flex-row items-center justify-center gap-32 mt-16">
        <div
            className="w-full sm:w-[80%] lg:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">

            <img
                src="https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498366.jpg?t=st=1728230691~exp=1728234291~hmac=4670c1df1a791e3506bdebcdc7aecc5d09bfd2ed8fff51551b39ad3f5f237899&w=996"
                alt="animated_card"
                className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300"/>

            <div
                className="w-full h-full absolute top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <h2 className="text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize">Beautiful
                    rainbow in nature</h2>
                <p className="text-[1rem] text-white text-center mt-3 opacity-85">Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet</p>
            </div>
        </div>


        <div
            className="w-full sm:w-[80%] lg:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">

            <img
                src="https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498366.jpg?t=st=1728230691~exp=1728234291~hmac=4670c1df1a791e3506bdebcdc7aecc5d09bfd2ed8fff51551b39ad3f5f237899&w=996"
                alt="animated_card"
                className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300"/>

            <div
                className="w-full h-full absolute top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <h2 className="text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize">Beautiful
                    rainbow in nature</h2>
                <p className="text-[1rem] text-white text-center mt-3 opacity-85">Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet</p>
            </div>
        </div>
         </div>   



      </div>

      {/* Upcoming Events Carousel */}
    </div>
  );
};

export default UpcomingEvents;
