"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "../Providers/ProtectedRoute";

interface Event {
  _id?: string;
  userEmail: string;
  userName: string;
  eventTitle: string;
  date: string;
  time?: string;
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
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  // Listen to Firebase auth state change to get current user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        setUserName(user.displayName || "");
      } else {
        setUserEmail(null);
        setUserName("");
        setEvents([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch events when userEmail is available
  useEffect(() => {
    if (userEmail) {
      fetchEvents();
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  [userEmail]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://prime-eventify-server.vercel.app/eventdata");
      const data = await res.json();
      // Filter events by logged in user email
      const filtered = data.filter(
        (event: Event) => event.userEmail === userEmail
      );
      setEvents(filtered);
    } catch (error) {
      console.error("Fetch error:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditModal = (event: Event) => {
    setFormData({
      eventTitle: event.eventTitle,
      date: event.date,
      time: event.time || "",
      location: event.location,
      capacity: event.capacity,
      category: event.category,
      ticketPrice: event.ticketPrice,
      image: event.image,
    });
    setEditId(event._id || null);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      alert("User not logged in.");
      return;
    }

    const newEvent = {
      ...formData,
      userEmail,
      userName,
      availableTicket: formData.capacity,
    };

    try {
      let res;
      if (isEdit && editId) {
        res = await fetch(`https://prime-eventify-server.vercel.app/eventdata/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      } else {
        res = await fetch("https://prime-eventify-server.vercel.app/eventdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      }

      if (res.ok) {
        alert(isEdit ? "Event updated!" : "Event added!");
        setShowModal(false);
        setFormData({
          eventTitle: "",
          date: "",
          time: "",
          location: "",
          capacity: 0,
          category: "",
          ticketPrice: 0,
          image: "",
        });
        setIsEdit(false);
        setEditId(null);
        fetchEvents();
      } else {
        alert("Operation failed.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`https://prime-eventify-server.vercel.app/eventdata/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Event deleted.");
          fetchEvents();
        } else {
          alert("Failed to delete event.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
        Organizer Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400">No events found.</p>
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
              <div className="p-4 space-y-1">
                <h2 className="text-xl font-semibold text-red-400">
                  {event.eventTitle}
                </h2>
                <p className="text-gray-400 text-sm">Date: {event.date}</p>
                <p className="text-gray-400 text-sm">Location: {event.location}</p>
                <p className="text-sm text-gray-300">Capacity: {event.capacity}</p>
                <p className="text-sm text-gray-300">
                  Available: {event.availableTicket}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEditModal(event)}
                    className="flex-1 py-2 bg-yellow-500 text-black rounded font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id!)}
                    className="flex-1 py-2 bg-red-700 text-white rounded font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Event Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setFormData({
              eventTitle: "",
              date: "",
              time: "",
              location: "",
              capacity: 0,
              category: "",
              ticketPrice: 0,
              image: "",
            });
          }}
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
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              {isEdit ? "Edit Event" : "Add New Event"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="eventTitle"
                required
                value={formData.eventTitle}
                onChange={handleInput}
                placeholder="Event Title"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleInput}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="time"
                type="time"
                required
                value={formData.time}
                onChange={handleInput}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="location"
                required
                value={formData.location}
                onChange={handleInput}
                placeholder="Location"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="category"
                required
                value={formData.category}
                onChange={handleInput}
                placeholder="Category"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="capacity"
                type="number"
                required
                value={formData.capacity}
                onChange={handleInput}
                placeholder="Capacity"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="ticketPrice"
                type="number"
                required
                value={formData.ticketPrice}
                onChange={handleInput}
                placeholder="Ticket Price"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />
              <input
                name="image"
                required
                value={formData.image}
                onChange={handleInput}
                placeholder="Image URL"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white"
              />

              <button
                type="submit"
                className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                {isEdit ? "Update Event" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
