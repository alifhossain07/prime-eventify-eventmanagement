// app/events/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "../Providers/ProtectedRoute";

interface Event {
  id: number;
  userEmail: string;
  userName: string;
  eventTitle: string;
  miniDescription: string;
  DetailedDescription: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category: string;
  ticketPrice: number;
  availableTicket: number;
  featuredEvent: boolean;
  upcomingEvent: boolean;
  image: string;
}

const categories = ["All", "Concerts", "Sports", "Workshops", "Festivals"];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/eventdata");
        const data = await res.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
    }
  };

  return (
    <ProtectedRoute>
    <div className="  text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-6">
        All Events
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-300 ${
              selectedCategory === category
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-red-700 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid w-10/12 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500 transition-shadow"
          >
            <Image
              src={event.image}
              alt={event.eventTitle}
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-red-400">
                {event.eventTitle}
              </h2>
              <p className="text-sm text-gray-400">Organizer: {event.userName}</p>
              <p className="mt-1 text-sm text-gray-300">
                Date: {event.date} | Location: {event.location}
              </p>
              <Link
                href={`/events/${event.id}`}
                className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </ProtectedRoute>
  );
}
