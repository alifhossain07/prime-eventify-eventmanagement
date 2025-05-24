"use client";

import React, { useState, useEffect, useRef } from "react";
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import axios from "axios";
import Image from "next/image";
import { WiDirectionLeft } from "react-icons/wi";
import { WiDirectionRight } from "react-icons/wi";
import UpcomingEventsBg from "@/public/images/UpcomingEventsBg.webp";
import "@/app/Components/Pages/Home/Homepage.css";

const UpcomingEvents = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flickingRef = useRef<any>(null);
  const isAnimating = useRef(false);

  const plugins = [new Perspective({ rotate: 0.5 })];

  const moveLeft = async () => {
    if (flickingRef.current && !isAnimating.current) {
      isAnimating.current = true;
      await flickingRef.current.prev().catch(() => {});
      isAnimating.current = false;
    }
  };

  const moveRight = async () => {
    if (flickingRef.current && !isAnimating.current) {
      isAnimating.current = true;
      await flickingRef.current.next().catch(() => {});
      isAnimating.current = false;
    }
  };

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/eventdata");
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
      className="bg-cover py-24 bg-center h-[1700px] lg:h-[900px] items-start justify-center transition-opacity duration-300"
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

        <div className=" mt-20">
          <Flicking circular={true} plugins={plugins} ref={flickingRef}>
            {events.slice(0, 5).map((project, index) => (
              <div key={index} className="card-panel   is-small">
                <div className="shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-4xl relative cursor-pointer group">
                  <div className="relative w-full h-full group">
                    <Image
                     // @ts-expect-error: we need to fix this type error
                      src={project.image}
                      width={500}
                      height={300}
                      loading="eager"
                      alt="animated_card"
                      className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  </div>

                  <div className="w-full h-full absolute bg-black/30 top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <h2 className="text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize">
                         {/* @ts-expect-error: we need to fix this type error */}
                      {project.eventTitle}
                    </h2>
                    <p className="text-[1rem] text-white text-center mt-3 opacity-85">
                        {/* @ts-expect-error: we need to fix this type error */}
                      {project.miniDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Flicking>
        </div>
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={moveLeft}
            className="bg-red-500 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          >
            <WiDirectionLeft className="text-2xl" />
          </button>
          <button
            onClick={moveRight}
            className="bg-red-500 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          >
            <WiDirectionRight className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
