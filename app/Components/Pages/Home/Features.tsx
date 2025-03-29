import Image from "next/image";
import React from "react";
import HostEvent from "@/public/images/hostevent.webp";
import JoinEvent from "@/public/images/joinevent.webp";

const Features = () => {
  return (
    <div className="py-24">
      <div className="text-center space-y-9">
        <h1 className="text-white  font-title2 font-bold text-4xl tracking-wider">
          Step Into <span className="text-red-500"> The Experience</span>
        </h1>
        <p className="text-white text-xl font-text tracking-wide leading-relaxed w-7/12 mx-auto ">
          Dive into exciting events! Whether you’re here to organize or
          participate, this is your gateway to unforgettable moments.
        </p>
      </div>

      {/* Option Cards */}
      <div className="flex flex-col lg:flex-row  items-center justify-center gap-32 mt-16">
        {/* card 1 */}
        <div>
          <div className="w-96 h-[400px] relative overflow-hidden group cursor-pointer rounded-md">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>
            {/*  image  */}
            <Image
              src={HostEvent}
              alt="animated_card"
              className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"
              width={0}
              height={0}
            />

            {/*  text  */}
            <div className="absolute top-[50%] space-y-3 transform group-hover:translate-y-[-30%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
              <h1 className="text-[1.5rem] font-bold font-title2  text-white text-center capitalize">
                <span className="text-red-500"> Host</span> Your Event
              </h1>
              <p className="text-center z-[1-] w-10/12 mx-auto opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[1rem]">
                Bring your vision to life by creating and managing unforgettable
                events.
              </p>
              <button className="bg-red-500 z-[1-] opacity-0 cursor-pointer group-hover:z-20 group-hover:opacity-100  px-4 py-3 mt-3 hover:bg-transparent font-title2 transition-all duration-1000 text-white rounded-md text-[0.9rem]  relative shadow-lg before:absolute before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent hover:before:w-full hover:before:h-full hover:before:border-red-500 hover:before:transition-all  hover:before:duration-1000 after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-red-500 after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-1000">
                Organize Now 
              </button>
            </div>

            {/*  bottom shadow  */}
            <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.5)] h-[100%] absolute bottom-0 left-0 right-0"></div>
          </div>
        </div>



        {/* card 2 */}
        <div>
          <div className="w-96  h-[400px] relative overflow-hidden group cursor-pointer rounded-md">
            {/*  image  */}
            <Image
              src={JoinEvent}
              alt="animated_card"
              className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"
              width={0}
              height={0}
            />

            {/*  text  */}
            <div className="absolute top-[50%] space-y-3 transform group-hover:translate-y-[-30%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
              <h1 className="text-[1.5rem] font-title2  font-bold text-white text-center capitalize">
                <span className="text-red-500 font-bold"> Join</span> the
                Celebration
              </h1>
              <p className="text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white w-10/12 mx-auto text-[1rem]">
                Dive into exciting events and be part of the fun and excitement!
              </p>
              <button className="bg-red-500 z-[1-] cursor-pointer opacity-0 group-hover:z-20 group-hover:opacity-100  px-4 py-3 mt-3 hover:bg-transparent font-title2 transition-all duration-1000 text-white rounded-md text-[0.9rem]  relative shadow-lg before:absolute before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent hover:before:w-full hover:before:h-full hover:before:border-red-500 hover:before:transition-all  hover:before:duration-1000 after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-red-500 after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-1000">
              Explore Events
              </button>
            </div>

            {/*  bottom shadow  */}
            <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.5)] h-[100%] absolute bottom-0 left-0 right-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
