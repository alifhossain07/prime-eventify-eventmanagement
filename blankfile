"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import UpcomingEventsBg from "@/public/images/UpcomingEventsBg.webp";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="bg-cover py-24 bg-center h-[1700px] lg:h-[800px] items-start justify-center transition-opacity duration-300"
      style={{
        backgroundImage: `url(${UpcomingEventsBg.src})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center 20%",
      }}
    >
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
        
        <div className="flex w-10/12 mx-auto flex-col lg:flex-row items-center justify-center gap-10 mt-16">
          {events.slice(0,4).map((event, index) => (
            <div className="" key={index}>
              {/* Use event data here */}
              <div
            className="w-72 shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">

            <Image
                src={event.image}
                alt="animated_card"
                width={500} // Adjust based on your layout
  height={300} // Adjust based on your layout
  
                className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300"/>
                width={0}

            <div
                className="w-full h-full absolute top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <h2 className="text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize">Beautiful
                    rainbow in nature</h2>
                <p className="text-[1rem] text-white text-center mt-3 opacity-85">Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet</p>
            </div>
        </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
