import { useState } from "react";
import trekkingImg from "../assets/treaking.png";
import t1Img from "../assets/t1.png";
import t2Img from "../assets/t2.png";
import t3Img from "../assets/t3.png";
import leftArrow from "../assets/left arrow.png";
import rightArrow from "../assets/right arrow.png";

const testimonials = [
  {
    text: "Had a wonderful trip across Kerala and Tamil Nadu—everything was well planned and super comfortable. Truly a memorable experience!",
    name: "Maha",
    image: t1Img,
    title: "Amazing Experience"
  },
  {
    text: "Very smooth travel arrangements and friendly service throughout our South India tour. Felt safe, relaxed, and happy the entire journey.",
    name: "Sarah",
    image: t2Img,
    title: "Very smooth"
  },
  {
    text: "From beautiful hill stations to temples, the whole trip was perfectly organized. Great support and hospitality—highly recommended!",
    name: "John",
    image: t3Img,
    title: "Highly recommended!"
  }
];

const ClientTestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Headers */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="title-cursive">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1f2937]">
            What Our Clients Say!
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 relative min-h-[500px] max-w-7xl mx-auto">
          {/* Left Side: Big Image (Even Bigger) */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-end relative px-4 lg:pr-12">
             {/* Left Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-0 md:left-[-20px] lg:left-[-30px] top-1/2 -translate-y-1/2 z-30 transition-transform hover:scale-110 active:scale-95"
            >
              <img src={leftArrow} alt="Previous" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] object-contain" />
            </button>

            <div className="w-full max-w-[700px] aspect-[1.6/1] flex justify-center items-center overflow-hidden">
              <img 
                src={trekkingImg} 
                alt="Trekking Experience" 
                className="w-full h-full object-contain select-none scale-100 lg:scale-110"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left px-4 relative">
            {/* Right Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-0 md:right-[-20px] lg:right-[-60px] top-1/2 -translate-y-1/2 z-30 transition-transform hover:scale-110 active:scale-95"
            >
              <img src={rightArrow} alt="Next" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] object-contain" />
            </button>

            <div className={`flex flex-col items-center lg:items-start space-y-6 max-w-md transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
              {/* Profile Image with Brush Border */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-4 border-white">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-[-6px] border-2 border-orange-400/40 border-dashed rounded-full animate-spin-slow" />
              </div>

              <div className="space-y-4">
                <h4 className="text-xl md:text-2xl font-bold text-orange-500 leading-tight">
                  {testimonials[current].title}
                </h4>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed italic">
                  "{testimonials[current].text}"
                </p>
                
                <div className="pt-2">
                  <h5 className="text-lg md:text-xl font-bold text-[#1f2937]">
                    {testimonials[current].name}
                  </h5>
                  <div className="flex justify-center lg:justify-start gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#ff5c35] text-xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonialsSection;
