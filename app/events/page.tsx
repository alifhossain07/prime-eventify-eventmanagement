'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const events = [
  {
    id: 1,
    title: "Music Mania Festival 2025",
    category: "Music",
    date: "June 12, 2025",
    image: "/images/event-music.jpg",
    location: "Dhaka Arena, Bangladesh",
  },
  {
    id: 2,
    title: "TechX Conference",
    category: "Tech",
    date: "July 7, 2025",
    image: "/images/event-tech.jpg",
    location: "Sylhet Innovation Hub",
  },
  {
    id: 3,
    title: "Women in Business Expo",
    category: "Business",
    date: "August 22, 2025",
    image: "/images/event-business.jpg",
    location: "Chattogram Expo Center",
  },
];

const EventsPage = () => {
  const { user, isSignedIn } = useUser();

  return (
    <main className="bg-white text-black min-h-screen px-6 lg:px-24 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-title mb-2">Upcoming Events</h1>
        <p className="text-lg text-gray-600 mb-2">
          Discover events that match your passions and interests.
        </p>
        {isSignedIn && (
          <p className="text-md text-gray-800 font-medium">
            Welcome back, <span className="text-[#A72424]">{user?.firstName}</span>!
          </p>
        )}
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["All", "Music", "Tech", "Business", "Workshop"].map((cat) => (
          <button
            key={cat}
            className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-[#A72424] hover:text-white transition-all"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="relative h-52 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{event.date}</p>
              <p className="text-gray-600 text-sm">{event.location}</p>
              <Link href={`/events/${event.id}`}>
                <button className="mt-4 bg-[#A72424] text-white px-5 py-2 rounded-full text-sm hover:bg-red-600">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default EventsPage;
