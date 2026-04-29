import { Home, Heart, Landmark, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import domesticImg from "../assets/domestic.jpg";
import honeymoonImg from "../assets/honeymoon.jpg";
import pilgrimImg from "../assets/pilgrim.jpg";
import travelsImg from "../assets/travels.png";
import viewBtnImg from "../assets/view.png";

const categories = [
  {
    title: "Domestic",
    description: "Discover South India's rich culture, flavors, and thrilling adventures with our domestic tours.",
    image: domesticImg,
    icon: Home,
    color: "text-orange-500",
  },
  {
    title: "Honeymoon",
    description: "Explore dreamy destinations, private retreats, and romantic vibes for your perfect honeymoon.",
    image: honeymoonImg,
    icon: Heart,
    color: "text-orange-500",
  },
  {
    title: "Pilgrimage",
    description: "Dive into the spiritual traditions, sacred temples, and divine experiences across South India.",
    image: pilgrimImg,
    icon: Landmark,
    color: "text-orange-500",
  },
  {
    title: "Travells",
    description: "Efficient and comfortable travel services for all your local and long-distance journeys.",
    image: travelsImg,
    icon: Ticket,
    color: "text-orange-500",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Palm Leaf Decorative (Right Side) */}
      <div className="absolute right-0 top-0 w-[500px] pointer-events-none hidden lg:block mix-blend-multiply z-0">
         <img 
           src="/palm.jpeg" 
           alt="" 
           className="w-full h-auto object-contain transform translate-x-1/4 translate-y-8"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-16">
          <div className="space-y-1">
             <h2 className="mb-1">
               Trusted Travel Agency in Chennai & Coimbatore
             </h2>
             <h3 className="mb-0">
               Explore The World With Us!
             </h3>
          </div>
          <button 
            onClick={() => navigate("/packages")}
            className="bg-[#1f2937] text-white px-7 py-2.5 rounded-lg text-[15px] font-bold hover:bg-orange-500 transition-colors shadow-md transform -translate-y-2"
          >
             All packages
          </button>
        </div>

        {/* Categories Grid (OVAL SHAPES - RESTORED) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer w-[210px]">
              
              {/* Image & Icon Wrapper */}
              <div className="relative w-[210px] mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                 
                 {/* Oval Image Container */}
                 <div className="w-[210px] h-[315px] rounded-[999px] overflow-hidden shadow-2xl">
                    <img 
                      src={cat.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={cat.title} 
                    />
                 </div>
                 
                 {/* Floating Icon Circle overlapping bottom edge */}
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
                       <cat.icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </div>

              {/* Label */}
              <p className="font-extrabold tracking-tight group-hover:text-orange-500 transition-colors text-center mt-2">
                {cat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
