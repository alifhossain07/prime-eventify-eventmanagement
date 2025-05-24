import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "Alif Hossain",
    role: "Organizer",
    testimony: "Prime Eventify made organizing smooth and efficient. Loved the interface!",
    image: "https://i.ibb.co/CKxyvGtH/image.png",
  },
  {
    name: "Sarah Ahmed",
    role: "User",
    testimony: "Great experience! Easy to register and follow event updates.",
    image: "https://i.ibb.co/CKxyvGtH/image.png",
  },
  {
    name: "Junaid Rahman",
    role: "Organizer",
    testimony: "Helped boost our tech summit attendance significantly. Highly recommended.",
    image: "https://i.ibb.co/CKxyvGtH/image.png",
  },
  {
    name: "Rima Sultana",
    role: "User",
    testimony: "Smooth registration and a user-friendly event schedule. Loved it!",
    image: "https://i.ibb.co/CKxyvGtH/image.png",
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 ">
      <div className="w-10/12 mx-auto text-center">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-[#A72424]">Client </span>Experiences
        </h1>
        <p className="text-2xl mt-5 text-gray-300 tracking-wider max-w-3xl mx-auto">
          What our users and organizers say about Prime Eventify.
        </p>

        <Marquee speed={80} pauseOnHover={false} gradient={false} className="mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-[#f1f0f0]/20 hover:bg-[#A72424] gap-24 text-white rounded-xl w-80 mx-4 p-6 shadow-lg transition duration-300"
            >
              <div className="flex py-10 flex-col items-center text-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full mb-4"
                  width={70}
                  height={70}
                />
                <p className="text-sm text-gray-200 mb-3 italic">
                  “{testimonial.testimony}”
                </p>
                <h3 className="font-semibold text-lg text-red-500">{testimonial.name}</h3>
                <span className="text-sm text-[#FFFCF9] mt-1">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
