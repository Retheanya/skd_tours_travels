import { useEffect, useState } from "react";
import { 
  MapPin, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  Navigation
} from "lucide-react";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";

const slides = [
  {
    image: carousel1,
    title: "Adventure Awaits!",
    subtitle: "Step outside your comfort zone your next adventure is calling.",
    badge: "Let's Travel Dream, Explore, Make memories .",
  },
  {
    image: carousel2,
    title: "Escape The Ordinary!",
    subtitle: "Break free from routine the world is waiting for you.",
    badge: "Let's Travel Dream, Explore, Make memories .",
  },
  {
    image: carousel3,
    title: "Take Only Memories!",
    subtitle: "Travel responsibly leave places better than you found them.",
    badge: "Let's Travel Dream, Explore, Make memories .",
  },
];

const HeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % slides.length);
    }, 8000); 
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (index: number) => setSelectedIndex(index);

  return (
    <section className="relative h-[calc(100vh-86.2px)] w-full overflow-hidden bg-[#0a0a0a]">
      {/* SVG FILTERS */}
      <svg className="hidden">
        <defs>
          <filter id="rough-edge">
             <feTurbulence type="fractalNoise" baseFrequency="0.05 0.5" numOctaves="3" result="noise" />
             <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
          </filter>
          <filter id="torn-border">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
              <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      {/* 1. Backgrounds */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            selectedIndex === index ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img src={slide.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* 3. Main Center Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="max-w-5xl mx-auto text-center space-y-4">
              <div className="flex items-center justify-center gap-4 animate-fade-in-up [animation-delay:0.2s]">
                  <span className="text-white text-lg tracking-widest">★ ★ ★</span>
                  <h2 className="m-0 p-0">
                    {slides[selectedIndex].badge}
                  </h2>
                  <span className="text-white text-lg tracking-widest">★ ★ ★</span>
              </div>
              <h1 className="drop-shadow-2xl animate-fade-in-up [animation-delay:0.5s] text-white">
                {slides[selectedIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic animate-fade-in-up [animation-delay:0.8s] mt-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                {slides[selectedIndex].subtitle}
              </p>
              <div className="flex items-center justify-center gap-6 pt-4 pointer-events-auto animate-fade-in-up [animation-delay:1.1s]">
                  <button onClick={() => setSelectedIndex((p) => (p - 1 + slides.length) % slides.length)} className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all">
                      <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2 items-center">
                      {slides.map((_, i) => (
                          <div key={i} className={`h-1.5 transition-all duration-700 rounded-full ${selectedIndex === i ? "w-8 bg-orange-500" : "w-3 bg-white/30"}`} />
                      ))}
                  </div>
                  <button onClick={() => setSelectedIndex((p) => (p + 1) % slides.length)} className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all">
                      <ChevronRight className="w-4 h-4" />
                  </button>
              </div>
          </div>
      </div>

      {/* 4. Thumbnails (SIZE REDUCED TO 55x55) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 items-end pointer-events-auto">
          {slides.map((slide, i) => (
              <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`relative w-[55px] h-[55px] p-1.5 transition-all duration-700 ${
                      selectedIndex === i ? "scale-110 rotate-3 z-10" : "opacity-50 hover:opacity-100"
                  }`}
              >
                  {/* Jagged Frame Overlay */}
                  <div 
                    className={`absolute inset-0 rounded-sm ${selectedIndex === i ? "bg-orange-500" : "bg-white"}`}
                    style={{ 
                      filter: "url(#torn-border)",
                      clipPath: "polygon(5% 5%, 0% 0%, 100% 5%, 95% 100%, 0% 95%)"
                    }}
                  ></div>
                  
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-sm bg-black">
                     <img 
                       src={slide.image} 
                       className="w-full h-full object-cover" 
                       style={{ clipPath: "polygon(5% 5%, 95% 0%, 100% 90%, 0% 100%)", filter: "url(#torn-border)" }}
                       alt="" 
                     />
                  </div>
              </button>
          ))}
      </div>

      {/* 5. PERFECT SNOWY GRUNGE DIVIDER */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none overflow-hidden h-32">
          <svg viewBox="0 0 1440 200" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
              <path 
                fill="white" 
                d="M1440,110L1440,200L0,200L0,110C10,105 20,115 35,100C45,90 60,110 75,95C90,80 110,120 130,105C150,90 170,115 190,100C210,85 230,115 250,95C270,75 290,120 310,100C330,80 350,110 370,95C390,80 410,115 430,100C450,85 470,115 490,95C510,75 530,115 550,100C570,85 590,115 610,95C630,75 650,115 670,100C690,85 710,115 730,95C750,75 770,115 790,100C810,85 830,115 850,95C870,75 890,115 910,100C930,85 950,115 970,95C990,75 1010,115 1030,100C1050,85 1070,115 1090,95C1110,75 1130,115 1150,100C1170,85 1190,115 1210,95C1230,75 1250,115 1270,100C1290,85 1310,115 1330,95C1350,75 1370,115 1390,100C1410,85 1430,115 1440,100Z"
                style={{ filter: "url(#rough-edge)" }}
              />
          </svg>
      </div>

      {/* 6. BOTTOM DATA BAR */}
      <div className="absolute bottom-0 left-0 right-0 z-50 px-8 pb-0">
          <div className="container mx-auto flex items-end justify-between">
              
              <div className="flex items-center gap-3 mb-14 animate-fade-in-up [animation-delay:1.5s] pointer-events-auto">
                  <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
                              <img src={`https://i.pravatar.cc/150?u=traveller${i}`} className="w-full h-full object-cover" alt="" />
                          </div>
                      ))}
                  </div>
                  <div className="flex flex-col -space-y-1 scale-90 origin-left">
                      <span className="text-orange-400 text-3xl" style={{ fontFamily: "Dancing Script, cursive" }}>Satisfied</span>
                      <span className="text-[#333] text-2xl font-black uppercase tracking-tighter">Clients</span>
                  </div>
              </div>

              <div className="w-full max-w-4xl translate-y-6 animate-fade-in-up [animation-delay:1.8s] pointer-events-auto">
                  <div className="bg-white rounded-t-[2rem] shadow-2xl flex items-stretch overflow-hidden border border-gray-100">
                      <div className="flex-1 p-5 border-r border-gray-100 flex items-center justify-between group">
                          <div>
                              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-0.5">Location</p>
                              <input type="text" placeholder="Where?" className="bg-transparent outline-none text-base font-bold text-[#4B4A4A] placeholder:text-gray-300 w-full" />
                          </div>
                          <MapPin className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <div className="flex-1 p-5 border-r border-gray-100 flex items-center justify-between group">
                          <div>
                              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-0.5">Destinations</p>
                              <select className="bg-transparent outline-none text-base font-bold text-[#4B4A4A] appearance-none cursor-pointer w-full">
                                  <option>All Destination</option>
                              </select>
                          </div>
                          <Navigation className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <div className="flex-1 p-5 border-r border-gray-100 flex items-center justify-between group">
                          <div>
                              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-0.5">Duration</p>
                              <select className="bg-transparent outline-none text-base font-bold text-[#4B4A4A] appearance-none cursor-pointer w-full">
                                  <option>All Duration</option>
                              </select>
                          </div>
                          <Clock className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <button className="bg-orange-500 hover:bg-[#222] transition-all px-12 flex items-center justify-center group">
                          <Search className="w-8 h-8 text-white group-hover:scale-125 transition-transform" />
                      </button>
                  </div>
              </div>

          </div>
      </div>
    </section>
  );
};

export default HeroSection;
