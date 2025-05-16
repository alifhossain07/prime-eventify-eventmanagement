"use client";

import { useEffect, useState } from "react";
// import Link from "next/link";
import Image from "next/image";

interface Event {
  id?: number;
  userEmail: string;
  userName: string;
  eventTitle: string;
  date: string;
  location: string;
  capacity: number;
  availableTicket: number;
  category: string;
  ticketPrice: number;
  image: string;
}

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    date: "",
    time: "",
    location: "",
    capacity: 0,
    category: "",
    ticketPrice: 0,
    image: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/eventdata");
        const data = await res.json();
        const filtered = data.filter(
          (event: Event) => event.userEmail === "alifhossain56782@gmail.com"
        );
        setEvents(filtered);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleInput = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      userEmail: "alifhossain56782@gmail.com",
      userName: "Alif Hossain",
      availableTicket: formData.capacity,
    };
    try {
      const res = await fetch("http://localhost:5000/eventdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (res.ok) {
        alert("Event added successfully!");
        setShowModal(false);
        window.location.reload();
      } else {
        alert("Failed to add event.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">Organizer Dashboard</h1>

      {/* Events List */}
      {loading ? (
        <p className="text-center text-gray-400">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md border border-red-600"
            >
              <Image
                src={event.image}
                alt={event.eventTitle}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-red-400">
                  {event.eventTitle}
                </h2>
                <p className="text-gray-400 text-sm">Date: {event.date}</p>
                <p className="text-gray-400 text-sm mb-2">Location: {event.location}</p>
                <p className="text-sm text-gray-300">Capacity: {event.capacity}</p>
                <p className="text-sm text-gray-300 mb-4">Available: {event.availableTicket}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Event Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-red-600 rounded-full shadow-lg hover:bg-red-700 font-bold"
        >
          + Add New Event
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
          <div className="bg-gray-900 p-8 rounded-xl max-w-lg w-full relative border border-red-600">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-red-400 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-red-500 mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="eventTitle" required onChange={handleInput} placeholder="Event Title" className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="date" type="date" required onChange={handleInput} className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="time" type="time" required onChange={handleInput} className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="location" required onChange={handleInput} placeholder="Location" className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="category" required onChange={handleInput} placeholder="Category" className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="capacity" type="number" required onChange={handleInput} placeholder="Capacity" className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="ticketPrice" type="number" required onChange={handleInput} placeholder="Ticket Price" className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />
              <input name="image" required onChange={handleInput} placeholder="Image URL" className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white" />

              <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
