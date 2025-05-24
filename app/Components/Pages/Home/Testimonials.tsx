import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "James Hetfield",
    role: "Organizer",
    testimony: "Prime Eventify made organizing smooth and efficient. Loved the interface!",
    image: "https://i.ibb.co/XyH3Mwv/men1.jpg",
  },
  {
    name: "Sarah Ahmed",
    role: "User",
    testimony: "Great experience! Easy to register and follow event updates.",
    image: "https://i.ibb.co/x1Gk5d5/pp1.jpg",
  },
  {
    name: "Junaid Rahman",
    role: "Organizer",
    testimony: "Helped boost our tech summit attendance significantly. Highly recommended.",
    image: "https://i.ibb.co/fFdTNq2/pp2.jpg",
  },
  {
    name: "Rima Sultana",
    role: "User",
    testimony: "Smooth registration and a user-friendly event schedule. Loved it!",
    image: "https://i.ibb.co/YTSfwN0/women1.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 bg-gray-900">
      <div className="w-10/12 mx-auto text-center">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-[#A72424]">Client </span>Experiences
        </h1>
        <p className="text-2xl mt-5 text-gray-300 tracking-wider max-w-3xl mx-auto">
          What our users and organizers say about Prime Eventify.
        </p>

        <Marquee speed={100} pauseOnHover={false} gradient={false} className="mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/10 hover:bg-[#A72424] cursor-pointer text-white rounded-xl w-80 mx-4 p-6 shadow-lg transition duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-2 py-8 px-4">
                <div className="  overflow-hidden">
  <Image
    src={testimonial.image}
    alt={testimonial.name}
    width={240}
    height={240}
    className="object-cover rounded-full w-24 h-24 mb-4 border-2 border-[#A72424] shadow-lg"
  />
</div>
                <p className="text-sm text-gray-200 italic leading-relaxed">
                  “{testimonial.testimony}”
                </p>
                <h3 className="font-semibold text-lg text-[#FF4C4C]">{testimonial.name}</h3>
                <p className="text-sm text-gray-100 tracking-wide">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
