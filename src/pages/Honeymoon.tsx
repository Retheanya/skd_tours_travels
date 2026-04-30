import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { Clock, MapPin, Car, Home, Camera, Mail, Phone, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const honeymoonPackages = [
  {
    id: 1,
    title: "Romantic Munnar Escape",
    destination: "Munnar, Kerala",
    image: "https://images.unsplash.com/photo-1593693397321-28d1b1cb6018?q=80&w=800&auto=format&fit=crop",
    duration: "3 Days",
    rating: 4.8,
    reviews: 124,
    description: "Experience the magic of misty tea gardens and romantic weather with your loved one. A perfect peaceful retreat.",
  },
  {
    id: 2,
    title: "Alleppey Houseboat Honeymoon",
    destination: "Alleppey, Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    duration: "2 Days",
    rating: 4.9,
    reviews: 98,
    description: "Sail through the tranquil backwaters in a premium private houseboat. Enjoy traditional Kerala cuisine and serene views.",
  },
  {
    id: 3,
    title: "Coorg Nature's Lap",
    destination: "Coorg, Karnataka",
    image: "https://images.unsplash.com/photo-1580100586938-02822d99c4a8?q=80&w=800&auto=format&fit=crop",
    duration: "4 Days",
    rating: 4.7,
    reviews: 156,
    description: "Wake up to the aroma of coffee plantations and stunning valley views. Ideal for nature-loving couples.",
  },
  {
    id: 4,
    title: "Ooty Queen of Hills",
    destination: "Ooty, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1589188055621-e3776e033946?q=80&w=800&auto=format&fit=crop",
    duration: "3 Days",
    rating: 4.6,
    reviews: 210,
    description: "A timeless honeymoon destination with botanical gardens, lakes, and heritage trains.",
  },
  {
    id: 5,
    title: "Goa Beach Vibes",
    destination: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    duration: "5 Days",
    rating: 4.9,
    reviews: 342,
    description: "Sun, sand, sea, and sunsets. The perfect recipe for a romantic beach getaway with vibrant nightlife.",
  },
  {
    id: 6,
    title: "French Riviera of the East",
    destination: "Pondicherry",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop",
    duration: "3 Days",
    rating: 4.8,
    reviews: 187,
    description: "Stroll through colonial streets and pristine beaches with your partner in this quiet French town.",
  },
  {
    id: 7,
    title: "Yercaud Peaceful Retreat",
    destination: "Yercaud, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1563820252553-c9cd4ee6ec5f?q=80&w=800&auto=format&fit=crop",
    duration: "2 Days",
    rating: 4.5,
    reviews: 84,
    description: "A hidden gem offering serene lakes and quiet viewpoints, away from the bustling city life.",
  },
  {
    id: 8,
    title: "Chikmagalur Coffee Bliss",
    destination: "Chikmagalur, Karnataka",
    image: "https://images.unsplash.com/photo-1621327732890-dce92aee2ec4?q=80&w=800&auto=format&fit=crop",
    duration: "3 Days",
    rating: 4.8,
    reviews: 143,
    description: "Luxurious stays amidst lush green coffee estates and waterfalls. Perfect for a cozy retreat.",
  },
  {
    id: 9,
    title: "Wayanad Wild Romance",
    destination: "Wayanad, Kerala",
    image: "https://images.unsplash.com/photo-1582498263725-b463da8a5b28?q=80&w=800&auto=format&fit=crop",
    duration: "4 Days",
    rating: 4.7,
    reviews: 165,
    description: "Treehouses, caves, and wildlife for the adventurous couple seeking an offbeat honeymoon.",
  },
  {
    id: 10,
    title: "Kodaikanal Princess of Hills",
    destination: "Kodaikanal, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1585828068970-d0233bceb40d?q=80&w=800&auto=format&fit=crop",
    duration: "3 Days",
    rating: 4.8,
    reviews: 198,
    description: "Pine forests, star-shaped lake, and foggy mornings make it perfectly romantic for newlyweds.",
  }
];

const PackageCard = ({ pkg }: { pkg: any }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-4 md:p-6 mb-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
           {/* Left Image Section */}
           <div className="w-full md:w-2/5 relative group">
              <div 
                className="w-full h-[250px] overflow-hidden rounded-xl"
                // Adding a subtle CSS mask to simulate the "rugged/brush" edge look from the reference
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
              </div>
              
              {/* Bottom White Tag over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg flex justify-between items-center shadow-lg border border-white/20">
                 <span className="flex items-center gap-2 text-sm text-[#F0870D] font-bold tracking-wider">
                    <Clock className="w-4 h-4"/> {pkg.duration}
                 </span>
                 <div className="flex gap-3">
                    <a href="mailto:skttravels22@gmail.com" className="hover:scale-110 transition-transform"><Mail className="w-4 h-4 text-[#F0870D]" /></a>
                    <a href="tel:+919843051148" className="hover:scale-110 transition-transform"><Phone className="w-4 h-4 text-[#F0870D]" /></a>
                 </div>
              </div>
           </div>

           {/* Right Content Section */}
           <div className="w-full md:w-3/5 flex flex-col justify-between py-2">
              <div>
                 <h3 className="mb-3">
                    {pkg.title}
                 </h3>
                 <p className="flex items-center gap-2 mb-6">
                    <MapPin className="w-4 h-4 text-[#F0870D]"/> {pkg.destination}
                 </p>
                 
                 <div className="mb-6">
                    <p className="text-sm font-black text-[#6c757d] uppercase tracking-widest mb-3">Inclusions</p>
                    <div className="flex gap-4">
                       <div className="w-12 h-12 rounded-full bg-[#F0870D] flex items-center justify-center text-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer" title="Hotel">
                         <Home className="w-6 h-6"/>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-[#F0870D] flex items-center justify-center text-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer" title="Transfers">
                         <Car className="w-6 h-6"/>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-[#F0870D] flex items-center justify-center text-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer" title="Sightseeing">
                         <Camera className="w-6 h-6"/>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Bottom Row - Details Button */}
              <div className="flex justify-start items-end mt-4">
                 <button 
                   onClick={() => setShowDetails(!showDetails)} 
                   className="bg-[#F0870D] text-white px-8 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#212529] transition-colors shadow-lg shadow-[#F0870D]/30"
                 >
                    {showDetails ? 'Hide Details' : 'Details'}
                 </button>
              </div>
           </div>
        </div>
        
        {/* Glassmorphism Toggle Section */}
        <div 
          className={`transition-all duration-500 ease-in-out origin-top ${showDetails ? 'max-h-[800px] opacity-100 mt-6 scale-y-100' : 'max-h-0 opacity-0 overflow-hidden scale-y-95'}`}
        >
           <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] relative overflow-hidden">
              {/* Decorative background blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h4 className="text-xl font-bold mb-3">Package Highlights</h4>
              <p className="mb-6">
                {pkg.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-white/60 shadow-sm">
                      <p className="font-bold text-[#F0870D] mb-3 uppercase tracking-wider text-xs">Included</p>
                      <ul className="space-y-2 text-sm text-[#666666]">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#F0870D]"></div> Premium Accommodation</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#F0870D]"></div> Private Cab for Sightseeing</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#F0870D]"></div> Romantic Candlelight Dinner</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#F0870D]"></div> Breakfast & Dinner</li>
                      </ul>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-white/60 shadow-sm">
                      <p className="font-bold text-[#F0870D] mb-3 uppercase tracking-wider text-xs">Itinerary Overview</p>
                      <ul className="space-y-2 text-sm text-[#666666]">
                          <li className="flex items-center gap-2"><span className="text-xs font-bold bg-orange-100 text-[#F0870D] px-1.5 py-0.5 rounded">Day 1</span> Arrival & Leisure</li>
                          <li className="flex items-center gap-2"><span className="text-xs font-bold bg-orange-100 text-[#F0870D] px-1.5 py-0.5 rounded">Day 2</span> Full Day Sightseeing</li>
                          <li className="flex items-center gap-2"><span className="text-xs font-bold bg-orange-100 text-[#F0870D] px-1.5 py-0.5 rounded">Day 3</span> Departure</li>
                      </ul>
                  </div>
              </div>
           </div>
        </div>
    </div>
  );
};

const Honeymoon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Category");
  const [destination, setDestination] = useState("All Destination");
  const [subCategory, setSubCategory] = useState("Honeymoon");
  const [duration, setDuration] = useState("All Durations");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter Logic
  const filteredPackages = honeymoonPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDest = destination === "All Destination" || pkg.destination.includes(destination);
    const matchesDuration = duration === "All Durations" || pkg.duration.includes(duration.replace('Days', 'Day').trim()); // Simple matching
    
    return matchesSearch && matchesDest && matchesDuration;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070&auto=format&fit=crop" 
             alt="Honeymoon Couple" 
             className="w-full h-full object-cover opacity-40" 
           />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-white mb-2">
            Honeymoon Packages
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-white/80 uppercase tracking-widest mt-4">
            <Link to="/" className="hover:text-[#F0870D] transition-colors">Home</Link>
            <span>-</span>
            <span className="text-[#F0870D]">Honeymoon</span>
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
                  <h3 className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <SlidersHorizontal className="w-5 h-5 text-[#F0870D]" /> Filter Packages
                  </h3>

                  <div className="space-y-5">
                     {/* Search */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2">Search :</label>
                        <input 
                          type="text" 
                          placeholder="Type Here" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#F0870D] transition-colors bg-gray-50"
                        />
                     </div>

                     {/* Category */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2">Category :</label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#F0870D] transition-colors bg-gray-50 appearance-none cursor-pointer"
                        >
                          <option>All Category</option>
                          <option>Domestic</option>
                        </select>
                     </div>

                     {/* Destination */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2">Destination :</label>
                        <select 
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#F0870D] transition-colors bg-gray-50 appearance-none cursor-pointer"
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
                        </select>
                     </div>

                     {/* Sub Category */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2">Sub Category :</label>
                        <select 
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#F0870D] transition-colors bg-gray-50 appearance-none cursor-pointer"
                        >
                          <option>Honeymoon</option>
                        </select>
                     </div>

                     {/* Durations */}
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-2">Durations :</label>
                        <select 
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#F0870D] transition-colors bg-gray-50 appearance-none cursor-pointer"
                        >
                          <option>All Durations</option>
                          <option value="2">2 Days</option>
                          <option value="3">3 Days</option>
                          <option value="4">4 Days</option>
                          <option value="5">5 Days</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT LIST AREA */}
            <div className="w-full lg:w-3/4">
               {filteredPackages.length === 0 ? (
                 <div className="bg-white rounded-xl p-10 text-center border border-gray-100 shadow-sm">
                   <h3 className="text-xl text-[#666666] font-bold">No packages found matching your criteria.</h3>
                   <button onClick={() => {setSearchTerm(""); setDestination("All Destination"); setDuration("All Durations");}} className="mt-4 text-[#F0870D] underline font-bold">Clear Filters</button>
                 </div>
               ) : (
                 <div className="flex flex-col">
                   {filteredPackages.map((pkg) => (
                     <PackageCard key={pkg.id} pkg={pkg} />
                   ))}
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
