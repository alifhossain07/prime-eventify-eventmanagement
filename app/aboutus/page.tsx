'use client'; // Only if using app router

import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="bg-white text-black min-h-screen font-sans">
      <section className="bg-black text-white py-20 text-center">
        <h1 className="text-5xl font-title mb-4">About Prime Eventify</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-300">
          Your trusted partner in seamless event experiences. Whether youre an attendee or an organizer, we empower you to be part of something unforgettable.
        </p>
      </section>

      <section className="py-16 px-6 lg:px-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Prime Eventify is a modern event management platform that connects organizers and attendees with smart tools and engaging experiences. From small workshops to large festivals, we make event handling easy, interactive, and impactful.
          </p>
        </div>
        <div className="w-full h-72 relative">
          <Image
            src="/images/about-event.jpg" // Replace with your image
            alt="People attending an event"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6 lg:px-24 text-center">
        <h2 className="text-3xl font-semibold mb-6">What Drives Us</h2>
        <p className="text-lg max-w-4xl mx-auto text-gray-700">
          We believe events create impact. Our mission is to simplify event journeys through powerful tech, beautiful design, and meaningful user experience — for both organizers and attendees.
        </p>
      </section>

      <section className="py-16 px-6 lg:px-24">
        <h2 className="text-3xl font-semibold mb-8 text-center">Meet the Team</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {["Alif", "Sarah", "Junaid"].map((name, idx) => (
            <div
              key={idx}
              className="text-center bg-white shadow-xl rounded-xl p-6 border border-gray-200"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={`/images/team-${idx + 1}.jpg`} // Replace with real photos
                  alt={`${name}'s photo`}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-xl">{name}</h3>
              <p className="text-gray-500">Co-Founder</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-16 px-6 lg:px-24 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Journey</h2>
        <p className="text-lg text-gray-300 mb-8">
          Be a part of the experience — as an organizer or a passionate attendee.
        </p>
        <Link href="/sign-up">
          <button className="bg-[#A72424] hover:bg-red-600 transition-all px-8 py-3 rounded-full font-semibold text-white text-lg">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
};

export default AboutPage;
