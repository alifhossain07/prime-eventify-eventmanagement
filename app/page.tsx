import Features from "./Components/Pages/Home/Features";
import Hero from "./Components/Pages/Home/Hero";
import Testimonials from "./Components/Pages/Home/Testimonials";
import UpcomingEvents from "./Components/Pages/Home/UpcomingEvents";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Features />
      <UpcomingEvents />
      <Testimonials />
    </div>
  );
}
