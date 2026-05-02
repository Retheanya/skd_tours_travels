import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import cmImg from "../assets/cm.jpg";

// Images
import tn1 from "../assets/tn1.jpg";
import tn2 from "../assets/tn2.jpg";
import tn3 from "../assets/tn3.jpg";
import tn4 from "../assets/tn4.jpg";
import tn5 from "../assets/tn5.jpg";
import tn6 from "../assets/tn6.jpg";

import kl1 from "../assets/kl1.jpg";
import kl2 from "../assets/kl2.jpg";
import kl3 from "../assets/kl3.jpg";
import kl4 from "../assets/kl4.jpg";
import kl5 from "../assets/kl5.jpg";
import kl6 from "../assets/kl6.jpg";

import kr1 from "../assets/kr1.jpg";
import kr2 from "../assets/kr2.jpg";
import kr3 from "../assets/kr3.jpg";
import kr4 from "../assets/kr4.jpg";
import kr5 from "../assets/kr5.jpg";
import kr6 from "../assets/kr6.jpg";

import ap1 from "../assets/ap1.jpg";
import ap2 from "../assets/ap2.jpg";
import ap3 from "../assets/ap3.jpg";
import ap4 from "../assets/ap4.jpg";
import ap5 from "../assets/ap5.jpg";
import ap6 from "../assets/ap6.jpg";

import pd1 from "../assets/pd1.jpg";
import pd2 from "../assets/pd2.jpg";
import pd3 from "../assets/pd3.jpg";
import pd4 from "../assets/pd4.jpg";
import pd5 from "../assets/pd5.jpg";
import pd6 from "../assets/pd6.jpg";

const stateData = {
  "tamil-nadu": {
    name: "Tamil Nadu",
    description: "Tamil Nadu is known for temples, hill stations, and beaches",
    images: [tn1, tn2, tn3, tn4, tn5, tn6],
    categories: [
      {
        title: "Hill Stations & Nature",
        items: ["Ooty", "Kodaikanal", "Yercaud", "Coonoor"]
      },
      {
        title: "Temples & Heritage",
        items: ["Madurai", "Rameswaram", "Thanjavur", "Kanchipuram"]
      },
      {
        title: "Beaches & Cities",
        items: ["Chennai", "Mahabalipuram", "Kanyakumari", "Pondicherry"]
      }
    ]
  },
  "kerala": {
    name: "Kerala",
    description: "Kerala = backwaters, greenery, beaches",
    images: [kl1, kl2, kl3, kl4, kl5, kl6],
    categories: [
      {
        title: "Hill Stations",
        items: ["Munnar", "Wayanad", "Thekkady", "Ponmudi"]
      },
      {
        title: "Backwaters & Lakes",
        items: ["Alleppey (Alappuzha)", "Kumarakom", "Ashtamudi"]
      },
      {
        title: "Beaches & Culture",
        items: ["Varkala", "Kovalam", "Trivandrum", "Kochi"]
      }
    ]
  },
  "karnataka": {
    name: "Karnataka",
    description: "(including Goa, Coorg, etc.)",
    images: [kr1, kr2, kr3, kr4, kr5, kr6],
    categories: [
      {
        title: "Hill Stations & Nature",
        items: ["Coorg (Kodagu)", "Chikmagalur", "Agumbe", "Nandi Hills"]
      },
      {
        title: "Heritage & Architecture",
        items: ["Hampi", "Mysore", "Badami", "Belur & Halebidu"]
      },
      {
        title: "Beaches (Goa + Karnataka coast)",
        items: ["Goa", "Gokarna", "Karwar", "Udupi"]
      }
    ]
  },
  "andhra-pradesh": {
    name: "Andhra Pradesh",
    description: "Tourist Places",
    images: [ap1, ap2, ap3, ap4, ap5, ap6],
    categories: [
      {
        title: "Hill & Nature",
        items: ["Araku Valley", "Horsley Hills", "Lambasingi", "Belum Caves"]
      },
      {
        title: "Temples & Spiritual",
        items: ["Tirupati", "Srisailam", "Vijayawada", "Lepakshi"]
      },
      {
        title: "Beaches & Cities",
        items: ["Visakhapatnam (Vizag)", "Rushikonda Beach", "Borra Caves"]
      }
    ]
  },
  "pondicherry": {
    name: "Pondicherry",
    description: "Experience the unique blend of French colonial heritage and Indian culture.",
    images: [pd1, pd2, pd3, pd4, pd5, pd6],
    categories: [
      {
        title: "BEACHES (Main attraction)",
        items: ["Paradise Beach", "Serenity Beach", "Rock Beach (Promenade)", "Eden Beach (Blue Flag)", "Auroville Beach"]
      },
      {
        title: "PILGRIM / SPIRITUAL",
        items: ["Sri Aurobindo Ashram", "Auroville (Matrimandir)", "Manakula Vinayagar Temple", "Basilica of Sacred Heart of Jesus", "Immaculate Conception Cathedral"]
      },
      {
        title: "HILLS / NATURE (Nearby)",
        items: ["Ousteri Lake", "Pichavaram Mangrove Forest", "Gingee Fort", "Yelagiri Hills"]
      },
      {
        title: "HERITAGE / CITY ATTRACTIONS",
        items: ["White Town (French Colony streets)", "Pondicherry Museum", "Bharathi Park & Aayi Mandapam", "Arikamedu (ancient ruins)", "Botanical Garden"]
      },
      {
        title: "ADVENTURE / ACTIVITIES",
        items: ["Chunnambar Boat House", "Scuba Diving", "Surfing (Serenity Beach)", "Jet Ski / Water Sports"]
      }
    ]
  }
};

const StatePackage = () => {
  const { stateName } = useParams();
  const data = stateName ? stateData[stateName as keyof typeof stateData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stateName]);

  if (!data) {
    return <Navigate to="/packages" replace />;
  }

  return (
    <Layout>
      {/* 1. Standard Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0 opacity-80">
           <img 
             src={cmImg} 
             alt={data.name} 
             className="w-full h-full object-cover" 
           />
        </div>
        <div className="absolute inset-0 bg-orange-600/20 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            {data.name}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-500 cursor-pointer transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <Link to="/packages" className="hover:text-orange-500 cursor-pointer transition-colors">Packages</Link>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500">{data.name}</span>
          </div>
        </div>
      </section>

      {/* 2. Content Details Section */}
      <section className="py-16 bg-[#fafafa] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              Explore <span className="text-orange-500">{data.name}</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-body max-w-2xl mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 justify-items-center mt-10">
            {data.categories.map((category, idx) => (
              <div 
                key={idx} 
                className="relative group w-full max-w-[320px] mx-auto select-none animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Decorative rotating ring graphic */}
                <div className="absolute -inset-3 sm:-inset-5 border-[2px] border-dashed border-orange-400 rounded-full opacity-60 animate-[spin_20s_linear_infinite] group-hover:opacity-100 group-hover:border-orange-500 group-hover:scale-105 transition-all duration-500 pointer-events-none"></div>
                <div className="absolute -inset-1 sm:-inset-2 border-[1px] border-orange-300 rounded-full opacity-40 animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>

                <div className="bg-[#ffdfbf] rounded-full aspect-square p-6 md:p-8 flex flex-col items-center justify-center text-center border-4 border-white shadow-[0_4px_25px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_45px_rgba(249,115,22,0.25)] group-hover:-translate-y-2 transition-all duration-500 w-full h-full relative z-10 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                  
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-orange-600 mb-3 sm:mb-4 shadow-lg transition-colors duration-300 shrink-0 relative z-20 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black mb-2 text-[#212529] px-2 relative z-20" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                    {category.title}
                  </h4>
                  <div className="flex flex-col gap-1 text-xs sm:text-sm font-bold text-gray-700 font-body px-2 relative z-20" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {category.items.map((item, itemIdx) => (
                      <span key={itemIdx}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Hexagon Images Gallery Section */}
      {data.images && data.images.length > 0 && (
        <section className="py-16 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-display text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                  Glimpses of <span className="text-orange-500">{data.name}</span>
                </h2>
             </div>
             
             <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-[90%] lg:max-w-7xl mx-auto">
               {data.images.map((img, idx) => (
                 <div 
                   key={idx}
                   className="relative group w-[130px] h-[130px] sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[320px] lg:h-[320px] transition-transform duration-500 hover:scale-110 hover:z-10 animate-fade-in-up shadow-xl"
                   style={{
                     clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                     animationDelay: `${idx * 100}ms`
                   }}
                 >
                   <img 
                     src={img} 
                     alt={`Gallery image ${idx + 1}`} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default StatePackage;
