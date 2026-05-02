import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import pondi4 from "../assets/pondi4.jpg";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0 opacity-80">
           <img 
             src={pondi4} 
             alt="About Us" 
             className="w-full h-full object-cover" 
           />
        </div>
        <div className="absolute inset-0 bg-orange-600/20 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            About Us
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-500 cursor-pointer transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500">About Us</span>
          </div>
        </div>
      </section>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 mb-12 text-center select-none max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#212529] mb-4" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            About <span className="text-orange-500">SKT tours and travels</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-body text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
            Your premier travel partner in South India. Learn about our journey and why thousands trust us with their vacations.
          </p>
        </div>
        <AboutSection />
      </div>
    </Layout>
  );
};

export default About;
