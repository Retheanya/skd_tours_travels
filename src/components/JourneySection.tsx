import { Phone, Plane } from "lucide-react";
import skdImg from "../assets/skd.png";

const JourneySection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Image with floating card */}
        <div className="relative flex justify-center items-center">
          <div className="w-full max-w-[600px] relative z-0">
             <img 
               src={skdImg} 
               alt="SKD Tours" 
               className="w-full h-auto object-contain" 
             />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-6 relative px-4 lg:px-8">
          <div className="space-y-3">
            <h2>Your Journey Starts Here!</h2>
            <h3>Stressfree Holidays with SKD Tours</h3>
          </div>

          <p className="max-w-lg mb-8">
            <strong className="text-[#333]">SKD Tours</strong> is one of the <strong className="text-[#333]">best travel agency in South India</strong>. We make your next trip is truly special. Our friendly and experienced team plans everything based on your needs, so you can enjoy a holiday with great memories.
          </p>

          <div className="flex gap-12 sm:gap-16 py-8 border-t border-gray-100 border-b w-max pr-8">
            <div>
              <h3 className="text-4xl sm:text-[42px] font-bold text-[#1f2937] mb-1" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                15<span className="text-[#1f2937] text-2xl font-serif">+</span>
              </h3>
              <p className="text-[13px] font-semibold text-[#666]">Years Experience</p>
            </div>
            <div>
              <h3 className="text-4xl sm:text-[42px] font-bold text-[#1f2937] mb-1" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                100<span className="text-[#1f2937] text-2xl font-serif">%</span>
              </h3>
              <p className="text-[13px] font-semibold text-[#666]">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-4xl sm:text-[42px] font-bold text-[#1f2937] mb-1" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                4,000<span className="text-[#1f2937] text-2xl font-serif">+</span>
              </h3>
              <p className="text-[13px] font-semibold text-[#666]">Packages</p>
            </div>
          </div>

          <div className="pt-4">
              <button className="bg-[#f97316] hover:bg-[#222] text-white px-8 py-3.5 rounded-md font-bold transition-all duration-300 text-[15px]">
                More About
              </button>
          </div>
          
          <div className="absolute right-[-40px] bottom-[-20px] text-gray-200 rotate-[-15deg] hidden lg:block opacity-50">
            <Plane className="w-24 h-24" strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
