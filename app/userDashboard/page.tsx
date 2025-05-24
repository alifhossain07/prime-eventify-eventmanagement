"use client";

import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/Providers/AuthProvider";

const UserDashboard = () => {
      //@ts-expect-error:myLifeMyRules
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // User's registered events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!email) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const resUser = await fetch(`http://localhost:5000/users/user?email=${email}`);
        if (!resUser.ok) throw new Error("Failed to fetch user data from backend");
        const dataUser = await resUser.json();

        setUserData(dataUser);
        setName(dataUser.name || "");
        setPhone(dataUser.phone || "");
        setAddress(dataUser.address || "");

        // Fetch registered events for the user
      
const resEvents = await fetch(`http://localhost:5000/registeredEvents?email=${email}`);

        if (!resEvents.ok) throw new Error("Failed to fetch registered events");
        const dataEvents = await resEvents.json();
        setEvents(dataEvents);

      }
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any) {
        Swal.fire("Error", err.message || "Unknown error", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, phone, address }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

    //   const data = await res.json();
      
        //@ts-expect-error:myLifeMyRules
      setUserData((prev) => ({ ...prev, name, phone, address }));
      setIsEditing(false);
      Swal.fire("Success", "User info updated successfully", "success");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (err: any) {
      Swal.fire("Error", err.message || "Unknown error", "error");
    }
  };

//   Cancel Event
const handleCancelEvent = async (eventId: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to cancel this event?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:5000/registeredEvents/${eventId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to cancel event");
      }

      // Remove the event from state
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));

      Swal.fire("Cancelled!", "The event has been cancelled.", "success");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  }
};

  if (loading) return <p>Loading user data...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8">
      
        <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600">
            {/* @ts-expect-error:myLifeMyRules */}
          Welcome, {userData.name || "User"}!
        </h1>

        <hr className="border-t-2 border-gray-600 mb-8" />

        {/* Personal Information Section */}
        <div className="space-y-8 mb-12">
          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            {!isEditing ? (
              <div className="space-y-4">
                {/* @ts-expect-error:myLifeMyRules */}
                <p><strong>Email:</strong> {userData.email}</p>
                {/* @ts-expect-error:myLifeMyRules */}
                <p><strong>Name:</strong> {userData.name || "N/A"}</p>
                {/* @ts-expect-error:myLifeMyRules */}
                <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
                {/* @ts-expect-error:myLifeMyRules */}
                <p><strong>Address:</strong> {userData.address || "N/A"}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Edit Info
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Phone:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Address:</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-6 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                        {/* @ts-expect-error:myLifeMyRules */}
                      setName(userData.name || "");
                      {/* @ts-expect-error:myLifeMyRules */}
                      setPhone(userData.phone || "");
                      {/* @ts-expect-error:myLifeMyRules */}
                      setAddress(userData.address || "");
                      setIsEditing(false);
                    }}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Registered Events Section */}
        <div className="text-white">
          <h2 className="text-2xl font-semibold mb-6">Registered Events</h2>
          {events.length === 0 ? (
            <p className="text-lg">You have no registered events yet.</p>
          ) : (
            <div className="space-y-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {events.map((event: any) => (
                <div
  key={event._id}
  className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex justify-between items-start gap-4"
>
  <div>
    <h3 className="text-lg font-bold text-red-500">{event.eventTitle}</h3>
    <p><strong>Price:</strong> ৳{event.price}</p>
    <p><strong>Payment Number:</strong> {event.demoPaymentNumber}</p>
    <p><strong>Booking Date:</strong> {new Date(event.bookedAt).toLocaleString()}</p>
  </div>
  <button
    onClick={() => handleCancelEvent(event._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
  >
    Cancel
  </button>
</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
