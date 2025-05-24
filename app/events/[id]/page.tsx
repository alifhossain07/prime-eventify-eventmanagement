'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/Providers/AuthProvider';
 // adjust path

const MySwal = withReactContent(Swal);

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

export default function EventDetails({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const { user } = useContext(AuthContext);
const [userRole, setUserRole] = useState<string | null>(null);

useEffect(() => {
  const fetchUserRole = async () => {
    if (user?.email) {
      try {
        const res = await fetch(`http://localhost:5000/users/getUserRole?email=${user.email}`);
        const data = await res.json();
        setUserRole(data.role); // role = 'user', 'admin', or 'organizer'
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    }
  };

  fetchUserRole();
}, [user?.email]);


  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch('http://localhost:5000/eventdata');
      const events: Event[] = await res.json();
      const found = events.find((e) => e.id.toString() === params.id);
      if (!found) return notFound();
      setEvent(found);
    };

    fetchEvent();
  }, [params.id]);

  if (!event) return <div className="text-center py-20 text-white">Loading...</div>;

  const handleBooking = async () => {
  if (!user) {
    Swal.fire('Login Required', 'Please log in to book the event.', 'info');
    return;
  }

  if (userRole === 'Organizer') {
    Swal.fire('Access Denied', 'Organizers cannot book events.', 'warning');
    return;
  }

  const confirm = await MySwal.fire({
    title: `Book "${event.eventTitle}"?`,
    html: `Ticket Price: <strong>$${event.ticketPrice}</strong>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Proceed to Payment',
    cancelButtonText: 'Cancel',
  });

  if (confirm.isConfirmed) {
    const { value: phone } = await MySwal.fire({
      title: 'Enter your payment number',
      input: 'tel',
      inputPlaceholder: 'e.g. 017XXXXXXXX',
      confirmButtonText: 'Complete Payment',
      showCancelButton: true,
    });

    if (phone) {
      await MySwal.fire({
        title: 'Payment Completed!',
        text: 'Your ticket has been booked.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      const registeredEvent = {
        eventId: event.id,
        eventTitle: event.eventTitle,
        price: event.ticketPrice,
        demoPaymentNumber: phone,
        userEmail: user.email,
      };

      await fetch('http://localhost:5000/bookEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registeredEvent),
      });
    }
  }
};

  return (
    <div className="min-h-screen text-white px-4 py-10">
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
                <span className="font-semibold text-white">Featured:</span> {event.featuredEvent ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">Event Details</h2>
            <p className="text-base text-gray-300 leading-relaxed">
              {event.DetailedDescription}
            </p>
          </div>

          <button
           
            onClick={handleBooking}
            className="mt-10 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Book this Event
          </button>
        </div>
      </div>
    </div>
  );
}
