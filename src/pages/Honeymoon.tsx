import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { Clock, MapPin, Car, Home, Camera, Mail, Phone, Search, SlidersHorizontal, Eye, X, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Importing Assets for Destinations
import goa1 from "../assets/goa1.jpg";
import goa2 from "../assets/goa2.jpg";
import goa3 from "../assets/goa3.jpg";

import kodaikanal1 from "../assets/kodaikanal1.jpg";
import kodaikanal2 from "../assets/kodaikanal2.jpg";
import kodaikanal3 from "../assets/kodaikanal3.jpg";
import kodaikanal4 from "../assets/kodaikanal4.jpg";

import chikmangalor1 from "../assets/chikmangalor1.jpg";
import chikmangalor2 from "../assets/chikmangalor2.jpg";
import chikmangalor3 from "../assets/chikmangalor3.jpg";
import chikmangalor4 from "../assets/chikmangalor4.jpg";

import yerkad1 from "../assets/yerkad1.jpg";
import yerkad2 from "../assets/yerkad2.jpg";
import yerkad3 from "../assets/yerkad3.jpg";
import yerkad4 from "../assets/yerkad4.jpg";

import mangalor1 from "../assets/mangalor1.jpg";
import mangalor2 from "../assets/mangalor2.jpg";
import mangalor3 from "../assets/mangalor3.jpg";
import mangalor4 from "../assets/mangalor4.jpg";

import waynad1 from "../assets/waynad1.jpg";
import waynad2 from "../assets/waynad2.jpg";
import waynad3 from "../assets/waynad3.jpg";
import waynad4 from "../assets/waynad4.jpg";

import ooty1 from "../assets/ooty1.jpg";
import ooty2 from "../assets/ooty2.jpg";
import oorty3 from "../assets/oorty3.jpg";
import ooty4 from "../assets/ooty4.jpg";

import allapey1 from "../assets/allapey1.jpg";
import allapey2 from "../assets/allapey2.jpg";
import allapey3 from "../assets/allapey3.jpg";
import allapey4 from "../assets/allapey4.jpg";

import coorg1 from "../assets/coorg1.jpg";
import coorg2 from "../assets/coorg2.jpg";
import coorg3 from "../assets/coorg3.jpg";
import coorg4 from "../assets/coorg4.jpg";

import pondi1 from "../assets/pondi1.jpg";
import pondi2 from "../assets/pondi2.jpg";
import pondi3 from "../assets/pondi3.jpg";
import pondi4 from "../assets/pondi4.jpg";

import munnar1 from "../assets/munnar1.jpg";
import munnar2 from "../assets/munnar2.jpg";
import munnar3 from "../assets/munnar3.jpg";
import munnar4 from "../assets/munnar4.jpg";
import hmWebp from "../assets/hm.webp";

const honeymoonPackages = [
  {
    id: 1,
    title: "Romantic Munnar Escape",
    destination: "Munnar, Kerala",
    image: munnar1,
    duration: "3 Days",
    rating: 4.8,
    reviews: 124,
    description: "Experience the magic of misty tea gardens and romantic weather with your loved one. A perfect peaceful retreat.",
    images: [munnar1, munnar2, munnar3, munnar4]
  },
  {
    id: 2,
    title: "Alleppey Houseboat Honeymoon",
    destination: "Alleppey, Kerala",
    image: allapey1,
    duration: "2 Days",
    rating: 4.9,
    reviews: 98,
    description: "Sail through the tranquil backwaters in a premium private houseboat. Enjoy traditional Kerala cuisine and serene views.",
    images: [allapey1, allapey2, allapey3, allapey4]
  },
  {
    id: 3,
    title: "Coorg Nature's Lap",
    destination: "Coorg, Karnataka",
    image: coorg1,
    duration: "4 Days",
    rating: 4.7,
    reviews: 156,
    description: "Wake up to the aroma of coffee plantations and stunning valley views. Ideal for nature-loving couples.",
    images: [coorg1, coorg2, coorg3, coorg4]
  },
  {
    id: 4,
    title: "Ooty Queen of Hills",
    destination: "Ooty, Tamil Nadu",
    image: ooty1,
    duration: "3 Days",
    rating: 4.6,
    reviews: 210,
    description: "A timeless honeymoon destination with botanical gardens, lakes, and heritage trains.",
    images: [ooty1, ooty2, oorty3, ooty4]
  },
  {
    id: 5,
    title: "Goa Beach Vibes",
    destination: "Goa",
    image: goa1,
    duration: "5 Days",
    rating: 4.9,
    reviews: 342,
    description: "Sun, sand, sea, and sunsets. The perfect recipe for a romantic beach getaway with vibrant nightlife.",
    images: [goa1, goa2, goa3]
  },
  {
    id: 6,
    title: "French Riviera of the East",
    destination: "Pondicherry",
    image: pondi1,
    duration: "3 Days",
    rating: 4.8,
    reviews: 187,
    description: "Stroll through colonial streets and pristine beaches with your partner in this quiet French town.",
    images: [pondi1, pondi2, pondi3, pondi4]
  },
  {
    id: 7,
    title: "Yercaud Peaceful Retreat",
    destination: "Yercaud, Tamil Nadu",
    image: yerkad1,
    duration: "2 Days",
    rating: 4.5,
    reviews: 84,
    description: "A hidden gem offering serene lakes and quiet viewpoints, away from the bustling city life.",
    images: [yerkad1, yerkad2, yerkad3, yerkad4]
  },
  {
    id: 8,
    title: "Chikmagalur Coffee Bliss",
    destination: "Chikmagalur, Karnataka",
    image: chikmangalor1,
    duration: "3 Days",
    rating: 4.8,
    reviews: 143,
    description: "Luxurious stays amidst lush green coffee estates and waterfalls. Perfect for a cozy retreat.",
    images: [chikmangalor1, chikmangalor2, chikmangalor3, chikmangalor4]
  },
  {
    id: 9,
    title: "Wayanad Wild Romance",
    destination: "Wayanad, Kerala",
    image: waynad1,
    duration: "4 Days",
    rating: 4.7,
    reviews: 165,
    description: "Treehouses, caves, and wildlife for the adventurous couple seeking an offbeat honeymoon.",
    images: [waynad1, waynad2, waynad3, waynad4]
  },
  {
    id: 10,
    title: "Kodaikanal Princess of Hills",
    destination: "Kodaikanal, Tamil Nadu",
    image: kodaikanal1,
    duration: "3 Days",
    rating: 4.8,
    reviews: 198,
    description: "Pine forests, star-shaped lake, and foggy mornings make it perfectly romantic for newlyweds.",
    images: [kodaikanal1, kodaikanal2, kodaikanal3, kodaikanal4]
  },
  {
    id: 11,
    title: "Mangalore Coastal Delight",
    destination: "Mangalore",
    image: mangalor1,
    duration: "3 Days",
    rating: 4.7,
    reviews: 130,
    description: "Enjoy pristine beaches, ancient temples, and amazing seafood on your romantic getaway to Mangalore.",
    images: [mangalor1, mangalor2, mangalor3, mangalor4]
  }
];

const getItinerary = (durationStr: string) => {
  const days = parseInt(durationStr.match(/\d+/)?.[0] || "3", 10);
  const itinerary = [];
  
  if (days === 2) {
     itinerary.push({ day: "Day 1", title: "Arrival & Sightseeing" });
     itinerary.push({ day: "Day 2", title: "Leisure & Departure" });
  } else if (days === 3) {
     itinerary.push({ day: "Day 1", title: "Arrival & Leisure" });
     itinerary.push({ day: "Day 2", title: "Full Day Sightseeing" });
     itinerary.push({ day: "Day 3", title: "Departure" });
  } else if (days === 4) {
     itinerary.push({ day: "Day 1", title: "Arrival & Explore" });
     itinerary.push({ day: "Day 2", title: "Sightseeing Tour" });
     itinerary.push({ day: "Day 3", title: "Adventure & Leisure" });
     itinerary.push({ day: "Day 4", title: "Departure" });
  } else if (days === 5) {
     itinerary.push({ day: "Day 1", title: "Arrival & Briefing" });
     itinerary.push({ day: "Day 2", title: "Major Sightseeing" });
     itinerary.push({ day: "Day 3", title: "Local Market & Shopping" });
     itinerary.push({ day: "Day 4", title: "Relaxing Getaway" });
     itinerary.push({ day: "Day 5", title: "Departure" });
  } else {
     itinerary.push({ day: "Day 1", title: "Arrival & Leisure" });
     for (let i = 2; i < days; i++) {
        itinerary.push({ day: `Day ${i}`, title: `Sightseeing & Activities` });
     }
     itinerary.push({ day: `Day ${days}`, title: "Departure" });
  }
  return itinerary;
};

const PackageCard = ({ pkg, onPreview }: { pkg: any, onPreview: (img: string) => void }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-4 md:p-6 mb-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
           {/* Left Image Section */}
           <div className="w-full md:w-2/5 relative group cursor-pointer" onClick={() => onPreview(pkg.image)}>
              <div 
                className="w-full h-[250px] overflow-hidden rounded-xl relative group"
                style={{
                  maskImage: "paint(squircle)", // Fallback smooth
                  WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"black\" d=\"M41.5,-63.1C55.4,-57.4,69.5,-49,78.2,-36.4C86.9,-23.7,90.2,-6.8,87.6,9.5C85,25.8,76.5,41.4,63.9,51.8C51.3,62.1,34.5,67.1,17.9,70C1.2,73,-15.4,73.8,-30.2,68.8C-45,63.8,-58,52.8,-66.6,39.2C-75.3,25.5,-79.6,9.1,-77.8,-6.6C-76,-22.3,-68,-37.4,-56.3,-47.9C-44.5,-58.4,-29,-64.3,-14,-69.1C1,-73.9,17.1,-77.7,27.5,-68.8Z\" transform=\"translate(100 100) scale(1.1)\" /></svg>')",
                  WebkitMaskSize: "cover",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat"
                }}
              >
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Overlay Preview */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-8 h-8 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Bottom White Tag over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg flex justify-between items-center shadow-lg border border-white/20" onClick={(e) => e.stopPropagation()}>
                 <span className="flex items-center gap-2 text-sm text-orange-500 font-bold tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>
                    <Clock className="w-4 h-4"/> {pkg.duration}
                 </span>
                 <div className="flex gap-3">
                    <a href="mailto:skttravels22@gmail.com" className="hover:scale-110 transition-transform"><Mail className="w-4 h-4 text-orange-500" /></a>
                    <a href="tel:+919843051148" className="hover:scale-110 transition-transform"><Phone className="w-4 h-4 text-orange-500" /></a>
                 </div>
              </div>
           </div>

           {/* Right Content Section */}
           <div className="w-full md:w-3/5 flex flex-col justify-between py-2">
              <div>
                 <h3 className="text-3xl font-bold mb-3 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                    {pkg.title}
                 </h3>
                 <p className="flex items-center gap-2 mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                    <MapPin className="w-4 h-4 text-orange-500"/> {pkg.destination}
                 </p>
                 
                 <div className="mb-6">
                    <p className="text-sm font-bold text-[#6c757d] uppercase tracking-widest mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>Inclusions</p>
                    <div className="flex gap-4">
                       <Link to="/" className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer" title="Home">
                         <Home className="w-6 h-6"/>
                       </Link>
                       <Link to="/travells" className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer" title="Transfers">
                         <Car className="w-6 h-6"/>
                       </Link>
                       <a href="https://www.instagram.com/skt_tours_and_travels_cbe?igsh=MWgzOGZxZzVtdTdxaQ==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer" title="Instagram">
                         <Instagram className="w-6 h-6"/>
                       </a>
                    </div>
                 </div>
              </div>

              {/* Bottom Row - Details Button */}
              <div className="flex justify-start items-end mt-4">
                 <button 
                   onClick={() => setShowDetails(!showDetails)} 
                   className="bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#222] transition-all shadow-lg hover:-translate-y-0.5"
                   style={{ fontFamily: "'Jost', sans-serif" }}
                 >
                    {showDetails ? 'Hide Details' : 'Details'}
                 </button>
              </div>
           </div>
        </div>
        
        {/* Glassmorphism Toggle Section */}
        <div 
          className={`transition-all duration-500 ease-in-out origin-top ${showDetails ? 'max-h-[1000px] opacity-100 mt-6 scale-y-100' : 'max-h-0 opacity-0 overflow-hidden scale-y-95'}`}
        >
           <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] relative overflow-hidden">
              {/* Decorative background blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h4 className="text-2xl font-bold mb-3 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>Package Highlights</h4>
              <p className="mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                {pkg.description}
              </p>

              {/* Image Gallery */}
              {pkg.images && pkg.images.length > 0 && (
                <div className="mb-6">
                  <p className="font-bold text-orange-500 mb-3 uppercase tracking-wider text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Package Gallery</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {pkg.images.map((img: string, idx: number) => (
                       <div 
                         key={idx} 
                         onClick={() => onPreview(img)}
                         className="w-full h-[120px] overflow-hidden rounded-xl border border-white/40 shadow-sm transition-transform duration-500 hover:scale-105 hover:shadow-md cursor-pointer relative group"
                       >
                          <img src={img} alt={`${pkg.title} ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Eye className="w-6 h-6 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <div className="bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-white/60 shadow-sm">
                      <p className="font-bold text-orange-500 mb-3 uppercase tracking-wider text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Included</p>
                      <ul className="space-y-2 text-sm text-[#666666]">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Premium Accommodation</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Private Cab for Sightseeing</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Romantic Candlelight Dinner</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Breakfast & Dinner</li>
                      </ul>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-white/60 shadow-sm">
                      <p className="font-bold text-orange-500 mb-3 uppercase tracking-wider text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Itinerary Overview</p>
                      <ul className="space-y-2 text-sm text-[#666666]">
                          {getItinerary(pkg.duration).map((item, idx) => (
                             <li key={idx} className="flex items-center gap-2">
                               <span className="text-xs font-bold bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded" style={{ fontFamily: "'Jost', sans-serif" }}>{item.day}</span> {item.title}
                             </li>
                          ))}
                      </ul>
                  </div>
              </div>
           </div>
        </div>
    </div>
  );
};

const Honeymoon = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [category, setCategory] = useState("All Category");
  const [destination, setDestination] = useState(searchParams.get('dest') || "All Destination");
  const [subCategory, setSubCategory] = useState("Honeymoon");
  const [duration, setDuration] = useState(searchParams.get('duration') || "All Durations");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, destination, duration]);

  // Unique distinct durations present in honeymoonPackages
  const allDurations = Array.from(new Set(honeymoonPackages.map(pkg => pkg.duration))).sort();

  // Filter Logic
  const filteredPackages = honeymoonPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDest = destination === "All Destination" || pkg.destination.includes(destination);
    const matchesDuration = duration === "All Durations" || pkg.duration === duration;
    
    return matchesSearch && matchesDest && matchesDuration;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const displayedPackages = filteredPackages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Layout>
      {/* Lightbox / Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
           <button 
             onClick={() => setPreviewImage(null)}
             className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/20 backdrop-blur-md"
           >
             <X className="w-6 h-6" />
           </button>
           <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl flex items-center justify-center relative select-none" onClick={(e) => e.stopPropagation()}>
              <img src={previewImage} alt="Enlarged Preview" className="w-full h-full object-contain rounded-2xl shadow-2xl" />
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0 opacity-80">
           <img 
             src={hmWebp} 
             alt="Honeymoon Couple" 
             className="w-full h-full object-cover" 
           />
        </div>
        <div className="absolute inset-0 bg-orange-600/20 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Honeymoon
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-500 cursor-pointer transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500">Honeymoon</span>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar and List */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDEBAR FILTER FORM */}
            <div className="w-full lg:w-1/4">
               <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sticky top-28">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                    <SlidersHorizontal className="w-5 h-5 text-orange-500" /> Filter Packages
                  </h3>

                  <div className="space-y-5">
                     {/* Search */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Search :</label>
                        <input 
                          type="text" 
                          placeholder="Type Here" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors bg-gray-50"
                          style={{ fontFamily: "'Jost', sans-serif" }}
                        />
                     </div>

                     {/* Category */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Category :</label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors bg-gray-50 appearance-none cursor-pointer"
                          style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                          <option>All Category</option>
                          <option>Domestic</option>
                        </select>
                     </div>

                     {/* Destination */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Destination :</label>
                        <select 
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors bg-gray-50 appearance-none cursor-pointer"
                          style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                          <option>All Destination</option>
                          <option value="Munnar">Munnar</option>
                          <option value="Alleppey">Alleppey</option>
                          <option value="Coorg">Coorg</option>
                          <option value="Ooty">Ooty</option>
                          <option value="Goa">Goa</option>
                          <option value="Pondicherry">Pondicherry</option>
                          <option value="Yercaud">Yercaud</option>
                          <option value="Chikmagalur">Chikmagalur</option>
                          <option value="Wayanad">Wayanad</option>
                          <option value="Kodaikanal">Kodaikanal</option>
                          <option value="Mangalore">Mangalore</option>
                        </select>
                     </div>

                     {/* Sub Category */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Sub Category :</label>
                        <select 
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors bg-gray-50 appearance-none cursor-pointer"
                          style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                          <option>Honeymoon</option>
                        </select>
                     </div>

                     {/* Durations */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Durations :</label>
                        <select 
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors bg-gray-50 appearance-none cursor-pointer"
                          style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                          <option>All Durations</option>
                          {allDurations.map((dur, idx) => (
                             <option key={idx} value={dur}>{dur}</option>
                          ))}
                        </select>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT LIST AREA */}
            <div className="w-full lg:w-3/4">
               {displayedPackages.length === 0 ? (
                 <div className="bg-white rounded-xl p-10 text-center border border-gray-100 shadow-sm">
                   <h3 className="text-2xl text-[#212529] font-bold" style={{ fontFamily: "'Cormorant Infant', serif" }}>No packages found matching your criteria.</h3>
                   <button onClick={() => {setSearchTerm(""); setDestination("All Destination"); setDuration("All Durations");}} className="mt-4 text-orange-500 underline font-bold" style={{ fontFamily: "'Jost', sans-serif" }}>Clear Filters</button>
                 </div>
               ) : (
                 <div className="flex flex-col">
                   {displayedPackages.map((pkg) => (
                     <PackageCard key={pkg.id} pkg={pkg} onPreview={setPreviewImage} />
                   ))}

                   {/* Dynamic Pagination */}
                   {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-3 mt-8 pb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                         <button
                           disabled={currentPage === 1}
                           onClick={() => {
                             setCurrentPage(prev => prev - 1);
                             window.scrollTo({ top: 0, behavior: "smooth" });
                           }}
                           className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-orange-500 hover:text-orange-500 bg-white disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700 transition-all cursor-pointer"
                         >
                           Previous
                         </button>
                         
                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center border transition-all cursor-pointer ${currentPage === page ? 'bg-orange-500 border-orange-500 text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-500'}`}
                            >
                              {page}
                            </button>
                         ))}

                         <button
                           disabled={currentPage === totalPages}
                           onClick={() => {
                             setCurrentPage(prev => prev + 1);
                             window.scrollTo({ top: 0, behavior: "smooth" });
                           }}
                           className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-orange-500 hover:text-orange-500 bg-white disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700 transition-all cursor-pointer"
                         >
                           Next
                         </button>
                      </div>
                   )}
                 </div>
               )}
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Honeymoon;
