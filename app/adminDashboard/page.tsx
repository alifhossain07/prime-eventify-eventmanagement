"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProtectedRoute from "../Providers/ProtectedRoute";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Event {
  _id: string;
  eventTitle: string;
  category: string;
  userEmail: string;
  date: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("https://prime-eventify-server.vercel.app/users/")
      .then((res) => res.json())
      .then(setUsers);

    fetch("https://prime-eventify-server.vercel.app/eventdata/")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  // Delete User handler
  const handleDeleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete user!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://prime-eventify-server.vercel.app/users/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setUsers((prev) => prev.filter((user) => user._id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      } catch  {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  // Delete Event handler
  const handleDeleteEvent = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete event!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://prime-eventify-server.vercel.app/eventdata/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setEvents((prev) => prev.filter((event) => event._id !== id));
          Swal.fire("Deleted!", "Event has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete event.", "error");
        }
      } catch  {
        Swal.fire("Error!", "Failed to delete event.", "error");
      }
    }
  };

  return (
    <ProtectedRoute>
    <div className="p-8">
      <div className="w-10/12 mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Admin Dashboard</h1>

        {/* USERS */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">All Users</h2>
          <div className="overflow-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EVENTS */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">All Events</h2>
          <div className="overflow-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Organizer Email</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border-t">
                    <td className="px-4 py-2">{event.eventTitle}</td>
                    <td className="px-4 py-2">{event.category}</td>
                    <td className="px-4 py-2">{event.userEmail}</td>
                    <td className="px-4 py-2">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
