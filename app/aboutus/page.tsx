'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";


const teamMembers = [
  {
  name: "Alif Hossain",
  role: "Founder & CEO",
  img: "https://i.ibb.co/wNPtP5L1/2.png",
  bio: "Drives the vision and growth of the company with innovation and leadership."
},
{
  name: "Jarin Tusnim Roja",
  role: "Head of Operations",
  img: "https://i.ibb.co/VWWXfS44/3.png",
  bio: "Optimizes daily operations to ensure smooth and efficient workflows."
},
{
  name: "Ashraful Alam",
  role: "Head of Marketing",
  img: "/images/team-3.jpg",
  bio: "Crafts and leads impactful marketing strategies to grow the brand."
},
{
  name: "Tafhim Ovi",
  role: "Logistics Manager",
  img: "/images/team-3.jpg",
  bio: "Manages logistics to ensure timely and efficient delivery operations."
}

];

const AboutPage = () => {
  return (
    <main className=" text-white font-sans">
     
{/* Header */}
      <section className="bg-gray-900 py-32 text-center">
        <h1 className="text-5xl font-bold tracking-wide mb-4">
          Get to Know <span className="text-[#E53935]">Prime Eventify</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300 font-light">
          Empowering you to create, manage, and experience events like never before. We blend modern technology, beautiful design, and a passion for connection.
        </p>
      </section>

      {/* Our Story */}
      <section className="flex flex-col md:flex-row items-center gap-12 py-16 px-6 lg:px-24 bg-[#222326]">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Our Story
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Prime Eventify was born out of the desire to make event management seamless and exciting for everyone. From small workshops to massive festivals, we help organizers and attendees create lasting memories with ease and style. Our commitment is to innovation, community, and simplicity—making every event impactful.
          </p>
        </div>
        <div className="flex-1 w-full h-64 relative rounded-xl overflow-hidden shadow-lg min-w-[300px]">
          <Image
            src="https://i.ibb.co/CKxyvGtH/image.png"
            alt="Event crowd"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* What We Value */}
      <section className="py-16 px-6 lg:px-24 bg-[#18191A]">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          What Makes Us Different
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-[#23272b] rounded-xl p-8 shadow-lg border border-[#2D2D2D]">
            <div className="text-4xl mb-4 text-[#E53935]">🚀</div>
            <h3 className="font-bold text-xl mb-2 text-white">Modern & Intuitive</h3>
            <p className="text-gray-300">A clean, responsive interface designed for all devices and all users.</p>
          </div>
          <div className="bg-[#23272b] rounded-xl p-8 shadow-lg border border-[#2D2D2D]">
            <div className="text-4xl mb-4 text-[#E53935]">🤝</div>
            <h3 className="font-bold text-xl mb-2 text-white">Community-Focused</h3>
            <p className="text-gray-300">We foster connections and celebrate diversity at every event.</p>
          </div>
          <div className="bg-[#23272b] rounded-xl p-8 shadow-lg border border-[#2D2D2D]">
            <div className="text-4xl mb-4 text-[#E53935]">🔒</div>
            <h3 className="font-bold text-xl mb-2 text-white">Reliable & Secure</h3>
            <p className="text-gray-300">Your data and your experience are always our top priorities.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-24 bg-black">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#23272b] rounded-xl shadow-lg p-8 w-72 text-center border border-[#2D2D2D] hover:scale-105 transition-transform"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#E53935]">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-[#E53935] font-semibold mb-2">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#18191A] py-16 px-6 lg:px-24 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Ready to Create Your Next Event?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Join Prime Eventify and be part of a vibrant community of organizers and attendees. Let’s make every event extraordinary.
        </p>
        <Link href="/sign-up">
          <button className="bg-[#E53935] hover:bg-[#A72424] transition-all px-8 py-3 rounded-full font-semibold text-white text-lg shadow-lg">
            Get Started
          </button>
        </Link>
      </section>
      
      
    </main>
  );
};

export default AboutPage;
