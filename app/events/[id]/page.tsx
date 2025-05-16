// app/events/[id]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";

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

export async function generateStaticParams() {
  const res = await fetch("http://localhost:5000/eventdata");
  const data: Event[] = await res.json();

  return data.map((event) => ({ id: event.id.toString() }));
}

export default async function EventDetails({ params }: { params: { id: string } }) {
  const res = await fetch("http://localhost:5000/eventdata");
  const events: Event[] = await res.json();
  const event = events.find((e) => e.id.toString() === params.id);

  if (!event) return notFound();

  return (
    <div className="min-h-screen  text-white px-4 py-10">
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-red-600">
        <Image
          src={event.image}
          alt={event.eventTitle}
          width={1600}
          height={600}
          className="w-full h-[500px] object-cover rounded-t-2xl"
        />
        <div className="p-10">
          <h1 className="text-5xl font-extrabold text-red-500 mb-6">
            {event.eventTitle}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Organizer:</span> {event.userName}
              </p>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Category:</span> {event.category}
              </p>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Date & Time:</span> {event.date} at {event.time}
              </p>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Location:</span> {event.location}
              </p>
            </div>

            <div>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Capacity:</span> {event.capacity}
              </p>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Tickets Available:</span> {event.availableTicket}
              </p>
              <p className="text-lg text-gray-400 mb-1">
                <span className="font-semibold text-white">Price:</span> ${event.ticketPrice}
              </p>
              <p className="text-lg text-gray-400">
                <span className="font-semibold text-white">Featured:</span> {event.featuredEvent ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">Event Details</h2>
            <p className="text-base text-gray-300 leading-relaxed">
              {event.DetailedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
