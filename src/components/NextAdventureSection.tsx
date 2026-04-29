import { MapPin, ShieldCheck } from "lucide-react";
import adventureImg from "../assets/adventure.png";

const NextAdventureSection = () => {
  return (
    <section className="pt-0 -mt-32 md:-mt-48 pb-10 bg-white relative z-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="title-cursive">Latest Adventures Await You</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1f2937] leading-tight">
              Find Your Next Adventure!
            </h3>
          </div>

          <p className="max-w-xl text-lg text-gray-600 leading-relaxed">
            Enjoy trekking, camping & outdoor activities with <strong className="text-[#333]">customized travel packages</strong> from <strong className="text-[#333]">SKT tours and travells</strong>. Explore new destinations, relax & create unforgettable memories on every trip you take with family and friends.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-1">Friendly Guide</h4>
                <p className="text-sm text-gray-500 leading-snug">Great journeys start with great guides.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-1">Safety Travel</h4>
                <p className="text-sm text-gray-500 leading-snug">Your journey, safe and unforgettable.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative flex justify-center items-center">
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
             <img 
               src={adventureImg} 
               alt="Next Adventure composition" 
               className="w-full h-auto object-contain max-w-[600px]"
             />
          </div>
          
          {/* Decorative background shape or shadow if needed */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50/50 rounded-full blur-3xl -z-0" />
        </div>
      </div>
    </section>
  );
};

export default NextAdventureSection;
