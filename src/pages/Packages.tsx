import Layout from "@/components/Layout";
import PackagesSection from "@/components/PackagesSection";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import coorg3 from "../assets/coorg3.jpg";

const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0 opacity-80">
           <img 
             src={coorg3} 
             alt="Our Packages" 
             className="w-full h-full object-cover" 
           />
        </div>
        <div className="absolute inset-0 bg-orange-600/20 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Packages
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-500 cursor-pointer transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500">Packages</span>
          </div>
        </div>
      </section>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 mb-12 text-center select-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#212529', fontFamily: "'Cormorant Infant', serif" }}>
            Our Exclusive <span className="text-orange-500">Tour Packages</span>
          </h1>
          <p className="max-w-2xl mx-auto font-body text-gray-600 text-base sm:text-lg" style={{ fontFamily: "'Jost', sans-serif" }}>
            Discover the best of South India with our carefully curated travel experiences. 
            From backwaters to temples, we cover it all.
          </p>
        </div>
        <PackagesSection />
      </div>
    </Layout>
  );
};

export default Packages;
