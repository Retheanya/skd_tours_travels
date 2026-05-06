import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { apiService } from "@/lib/api";
import { getImageBySlug, getImagesByStatePrefix } from "@/lib/imageMap";

import cmImg from "../../assets/cm.jpg";

const stateData = {
  "tamil-nadu": {
    name: "Tamil Nadu",
    description: "Tamil Nadu is known for temples, hill stations, and beaches",
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPackages = async () => {
      try {
        setLoading(true);
        const packages = await apiService.getPackages();
        const found = packages.find((p: any) => p.slug === stateName);
        if (found) {
          const localMatch = stateName ? stateData[stateName as keyof typeof stateData] : null;
          const apiImages = found.images && found.images.length > 0 ? found.images : [];
          const fallbackImages = stateName ? getImagesByStatePrefix(stateName) : [];
          setData({
            ...found,
            images: apiImages.length > 0 ? apiImages : fallbackImages
          });
        } else {
          const localMatch = stateName ? stateData[stateName as keyof typeof stateData] : null;
          if (localMatch) {
            const fallbackImages = stateName ? getImagesByStatePrefix(stateName) : [];
            setData({
              ...localMatch,
              slug: stateName,
              images: fallbackImages
            });
          } else {
            setData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching packages in StatePackage:", error);
        const localMatch = stateName ? stateData[stateName as keyof typeof stateData] : null;
        if (localMatch) {
          const fallbackImages = stateName ? getImagesByStatePrefix(stateName) : [];
          setData({
            ...localMatch,
            slug: stateName,
            images: fallbackImages
          });
        } else {
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [stateName]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[400px] py-20 bg-[#fafafa]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600 font-body" style={{ fontFamily: "'Jost', sans-serif" }}>Loading package details...</p>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return <Navigate to="/packages" replace />;
  }

  // Use custom uploaded image (base64 or URL) from database as first priority
  const heroImageSrc = data.imageUrl || getImageBySlug(data.slug) || cmImg;

  return (
    <Layout>
      {/* 1. Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0 opacity-80">
           <img 
             src={heroImageSrc} 
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
            {data.categories && data.categories.map((category: any, idx: number) => (
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
                    {category.items && category.items.map((item: string, itemIdx: number) => (
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
               {data.images.map((img: string, idx: number) => {
                 // Try to resolve relative paths like "../../assets/kr1.jpg" using the imageMap
                 let resolvedSrc = img;
                 if (img && !img.startsWith("data:") && !img.startsWith("http")) {
                   const match = img.match(/\/([^/]+)\.\w+$/);
                   const filename = match ? match[1] : null;
                   const mapKey = filename || img.replace(/^.*[\\/]/, "").split(".")[0];
                   const imageMap = (window as any).__imageMap || {};
                   const dynamicallyResolved = imageMap[mapKey] || getImageBySlug(mapKey);
                   if (dynamicallyResolved) {
                     resolvedSrc = dynamicallyResolved;
                   }
                 }

                 return (
                   <div 
                     key={idx}
                     className="relative group w-[130px] h-[130px] sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[320px] lg:h-[320px] transition-transform duration-500 hover:scale-110 hover:z-10 animate-fade-in-up shadow-xl"
                     style={{
                       clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                       animationDelay: `${idx * 100}ms`
                     }}
                   >
                     <img 
                       src={resolvedSrc} 
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = heroImageSrc;
                       }}
                       alt={`Gallery image ${idx + 1}`} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                   </div>
                 );
               })}
             </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default StatePackage;
