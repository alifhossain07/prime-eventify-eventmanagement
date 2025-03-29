"use client";

import React, { useState, useEffect, useRef } from "react";
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import axios from "axios";
import Image from "next/image";
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
        
        <div className="">
        <Flicking circular={true} plugins={plugins} ref={flickingRef}>
          {[
            {
              image: "/images/Mediore.webp",
              category: "Web Based Project",
              name: "Mediore - A Medicine Store Management System",
              description:
                "A complete medicine stock and sales management system with order tracking.",
              link: "https://mediore-client.web.app/",
            },
            {
              image: "/images/LabReportC.webp",
              category: "Lab Report",
              name: "Visual Programming Lab Report Focused On Problem Solving (C#)",
              description:
                "An advanced Visual Programming Lab Report with Intermediate C# Problems.",
              pdf: "https://drive.google.com/file/d/1RKGvUn_w7EZN4v_F-OYP7VStsyoNa2Ix/view?usp=drive_link",
            },
            {
              image: "/images/aiwebdev.webp",
              category: "Report",
              name: "The Role of Artificial Intelligence in Web Development",
              description:
                "The Role of Artificial Intelligence in Web Development: Applications and Implications.",
              pdf: "https://drive.google.com/file/d/1hMugLDObi5_rs88D1u9GV3C8eczQmkc-/view?usp=sharing",
            },
            {
              image: "/images/emperaltravels.jpeg",
              category: "Web Based Project",
              name: "Emperal Travels - A Travel Agency Management System",
              description:
                "A complete and scalable Travel Management System. Can be Editable based on Needs.",
              link: "https://emperal-travels-server.web.app/",
            },
            {
              image: "/images/Algorithm.webp",
              category: "Assignment",
              name: "Algorithm for finding the LCM of Two numbers(Discrete Mathematics) ",
              description:
                "A well-documented assignemt of Algorithm for finding the LCM of Two numbers with problem solving.",
              pdf: "https://drive.google.com/file/d/1INGGU-JkZRv4qnIsC_Ea8XIBHv7nnLxi/view?usp=drive_link",
            },
            {
              image: "/images/WordFormationPPT.webp",
              category: "Presentation",
              name: "Word Formation, Suffix, and Prefixes ( ENG 102)",
              description:
                "A PowerPoint presentation on Word Formation, Suffix, and Prefixes in English Comprehension and Speaking.",
              pdf: "https://drive.google.com/file/d/1FdyBA5bY_4LbLRo_jqKIXBx4sHtcm4ZP/view?usp=sharing",
            },
          ].map((project, index) => (
            <div key={index} className="card-panel  is-small">
              <Image layout="responsive" src={project.image} alt={project.category} width={500} height={300} />
              <h2 className="lg:text-lg text-md font-semibold mt-3 font-text tracking-wider mb-3">{project.category}</h2>
              <h3 className="lg:text-xl text-lg font-title font-bold">{project.name}</h3>
              <p className="text-gray-600 mt-2 font-text text-sm mb-3">{project.description}</p>
              
                
              
            </div>
          ))}
        </Flicking>
        </div>
        <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={moveLeft}
          className="bg-green-400 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        >
          ←
        </button>
        <button
          onClick={moveRight}
          className="bg-green-400 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        >
          →
        </button>
      </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
