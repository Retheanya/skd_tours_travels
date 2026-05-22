import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import chikmangalor1 from "../../assets/chikmangalor1.jpg";
import { CheckCircle, Car, Shield, Clock, MapPin, Star, Phone, Send, X } from "lucide-react";
import { apiService } from "@/lib/api";
import innovaImg from "../../assets/innova.png";
import etiosImg from "../../assets/etios.png";
import desireImg from "../../assets/desire.png";
import worldImg from "../../assets/world.png";

const fleet = [
  {
    name: "Swift Dzire / Toyota Etios",
    image: desireImg,
    seater: "4+1 Seater",
    description: "Perfect for small families or business trips within the city or outstation.",
    price: "Rs. 14 / km",
    pricePerDay: "Rs. 1800",
    features: ["A/C", "Music System", "Professional Driver", "Clean Interiors"],
    isPopular: true
  },
  {
    name: "Toyota Etios (Premium)",
    image: etiosImg,
    seater: "4+1 Seater",
    description: "Comfortable sedan with ample legroom and boot space for your luggage.",
    price: "Rs. 15 / km",
    pricePerDay: "Rs. 2000",
    features: ["A/C", "Ample Boot Space", "Well Maintained", "Safe Driving"]
  },
  {
    name: "Toyota Innova Crysta",
    image: innovaImg,
    seater: "7+1 Seater",
    description: "The ultimate choice for group travels, long journeys, and family outings.",
    price: "Rs. 22 / km",
    pricePerDay: "Rs. 3500",
    features: ["Dual A/C", "Luxury Seating", "Spacious", "Smooth Ride"],
    isPopular: true
  }
];

const services = [
  {
    title: "Outstation Trips",
    desc: "Explore scenic destinations with our reliable outstation taxi services. Round trips or one-way drops available.",
    icon: <MapPin className="w-8 h-8 text-orange-500" />
  },
  {
    title: "Local Sightseeing",
    desc: "Personalized city tours and local sightseeing packages to cover all major attractions in and around Coimbatore.",
    icon: <Star className="w-8 h-8 text-orange-500" />
  },
  {
    title: "Airport Transfers",
    desc: "Timely pickups and drops for Coimbatore International Airport. No more waiting or stress.",
    icon: <Clock className="w-8 h-8 text-orange-500" />
  },
  {
    title: "Corporate Rentals",
    desc: "Professional taxi services for corporate events, business meetings, and employee transportation.",
    icon: <Shield className="w-8 h-8 text-orange-500" />
  }
];

const Travells = () => {
  const [taxis, setTaxis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const data = await apiService.getTaxis();
        setTaxis(data);
      } catch (err) {
        console.error("Error fetching taxis:", err);
      }
    };
    fetchTaxis();
  }, []);

  const [isPlanOpen, setIsPlanOpen] = useState(false);

  const getCarImage = (car: any) => {
    if (car.imageUrl && car.imageUrl.startsWith("data:image/")) {
      return car.imageUrl;
    }
    const nameLower = (car.name || "").toLowerCase();
    if (nameLower.includes("dzire") || nameLower.includes("desire")) {
      return desireImg;
    }
    if (nameLower.includes("etios")) {
      return etiosImg;
    }
    if (nameLower.includes("innova")) {
      return innovaImg;
    }
    return car.imageUrl || car.image;
  };
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    destination: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Car booking modal state
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [carBookingData, setCarBookingData] = useState({
    name: "",
    mobile: "",
    email: "",
    destination: "",
    pickupDate: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCarBookingData({ ...carBookingData, [e.target.name]: e.target.value });
  };

  const handleOpenCarBooking = (car: any) => {
    setSelectedCar(car);
    setCarBookingData({
      name: "",
      mobile: "",
      email: "",
      destination: "",
      pickupDate: "",
      message: `I would like to book a ${car.name} (${car.seater}) for a trip.`
    });
    setIsCarModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiService.createTravelInquiry({
        ...formData,
        type: "general"
      });
      alert("Thank you for your message! Our travel specialists will get back to you soon.");
      setFormData({ name: "", mobile: "", email: "", destination: "", message: "" });
      setIsPlanOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Your inquiry has been logged.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiService.createTravelInquiry({
        name: carBookingData.name,
        mobile: carBookingData.mobile,
        email: carBookingData.email,
        destination: carBookingData.destination,
        pickupDate: carBookingData.pickupDate,
        carType: selectedCar ? selectedCar.name : "",
        message: carBookingData.message,
        type: "car_booking"
      });
      alert("Thank you! Your taxi booking inquiry has been sent. We will confirm your ride shortly.");
      setCarBookingData({ name: "", mobile: "", email: "", destination: "", pickupDate: "", message: "" });
      setIsCarModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Your inquiry has been logged.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 z-0 opacity-80">
           <img 
             src={chikmangalor1} 
             alt="Travells" 
             className="w-full h-full object-cover" 
           />
        </div>
        <div className="absolute inset-0 bg-orange-600/20 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Travells
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-500 cursor-pointer transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500">Travells</span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="mb-2">Our Services</h2>
              <h3 className="text-3xl md:text-4xl mb-6">
                Best Coimbatore <span className="text-[#f97316]">Taxi Services</span> for All Your Needs
              </h3>
              <p className="leading-relaxed mb-6">
                SKD Tours and Travels offers top-notch taxi services in Coimbatore and beyond. Whether you're planning a trip to the hills of Ooty, the serenity of Kodaikanal, or just need a ride to the airport, we have the perfect vehicle for you.
              </p>
              <p className="leading-relaxed mb-8">
                Our fleet is well-maintained, our drivers are professional and experienced, and our pricing is transparent with no hidden costs. Experience the joy of hassle-free travel with our doorstep pickup and drop services.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Verified Drivers', 'Clean Vehicles', '24/7 Support', 'Fair Pricing'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="font-bold text-[#333]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img 
                  src={innovaImg} 
                  alt="Taxi Service" 
                  className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-orange-500 rounded-2xl z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-2">Choose Your Ride</h2>
          <h3 className="text-3xl md:text-4xl mb-4">
            Our <span className="text-orange-500">Fleet</span>
          </h3>
          <p className="max-w-2xl mx-auto mb-16">
            Choose from our range of comfortable vehicles tailored to fit your group size and budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(taxis && taxis.length > 0 ? taxis : fleet).map((car: any, idx: number) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow group">
                <div className="h-56 bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
                  <img 
                    src={getCarImage(car)} 
                    alt={car.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {car.isPopular && (
                    <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="p-8 text-left">
                  <h3 className="text-xl font-black text-[#222] mb-1">{car.name}</h3>
                  <p className="text-orange-500 font-bold mb-4">{car.seater}</p>
                  <p className="text-sm mb-6 leading-relaxed">
                    {car.description}
                  </p>
                  <div className="space-y-2 mb-8">
                    {car.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-auto">
                    {/* Prices: stacked vertically on mobile/tablet, stacked on desktop too */}
                    <div className="flex flex-col gap-1 lg:flex-none lg:block">
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-wide">Starting from</p>
                        <p className="text-lg lg:text-2xl font-black text-[#222] whitespace-nowrap lg:whitespace-normal leading-tight">{car.price}</p>
                      </div>
                      {car.pricePerDay && (
                        <div className="lg:mt-2">
                          <p className="text-[9px] text-gray-400 uppercase font-black tracking-wide">Per Day</p>
                          <p className="text-lg lg:text-2xl font-black text-[#222] whitespace-nowrap lg:whitespace-normal leading-tight">{car.pricePerDay}</p>
                        </div>
                      )}
                    </div>
                    {/* Book Now: full-width on mobile/tablet, auto on desktop */}
                    <button
                      onClick={() => handleOpenCarBooking(car)}
                      className="w-full lg:w-auto bg-orange-500 text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-black text-sm uppercase hover:bg-[#222] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="mb-2 text-center">Taxi Solutions</h3>
          <h3 className="text-3xl md:text-4xl mb-16 text-center">
            Comprehensive <span className="text-orange-500">Solutions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#f9f9f9] hover:bg-orange-500 group transition-all duration-500 border border-transparent hover:translate-y-[-10px]">
                <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-[#222] mb-4 group-hover:text-white transition-colors uppercase italic tracking-tighter">
                  {service.title}
                </h3>
                <p className="group-hover:text-white/90 transition-colors leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#222]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-2 text-white/90">Book Your Trip</h2>
          <h3 className="text-3xl md:text-5xl mb-8 font-display" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            <span className="text-white" style={{ color: '#ffffff' }}>Ready to </span>
            <span className="text-orange-500">Start Your Journey?</span>
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            Contact us today to book your taxi and experience the best travel service in Coimbatore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="tel:+919362266666" 
              className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-black text-lg uppercase hover:scale-105 transition-all shadow-xl flex items-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Call +91 93622 66666
            </a>
            <button onClick={() => setIsPlanOpen(true)} className="bg-white text-[#222] px-10 py-5 rounded-2xl font-black text-lg uppercase hover:scale-105 transition-all shadow-xl">
              Inquiry Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section (Chat-style UI) */}
      <section className="py-20 bg-[#fafafa]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Common Queries</span>
            <h3 className="text-3xl md:text-5xl font-bold font-display text-[#212529] mt-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-10 max-w-3xl mx-auto select-none relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-[0.04] bg-center bg-no-repeat bg-cover pointer-events-none z-0"
              style={{ backgroundImage: `url(${worldImg})` }}
            />
            <div className="relative z-10 flex flex-col gap-10">
              {[
                { q: "What types of taxi services do you offer?", a: "We offer local sightseeing, outstation trips, airport transfers, and corporate rentals with a wide range of vehicles including sedans and SUVs." },
                { q: "Do you provide 24/7 taxi services in Coimbatore?", a: "Yes, our taxi services are available 24/7. We recommend booking in advance for airport pickups and late-night travel." },
                { q: "How are outstation taxi fares calculated?", a: "Outstation fares are typically calculated based on kilometers traveled, with a minimum daily distance requirement. Tolls, parking, and driver beta are extra." },
                { q: "Are your drivers professional and verified?", a: "Absolutely. All our drivers undergo background checks and are experienced in both local and long-distance driving to ensure your safety." }
              ].map((faq, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  {/* Question bubble (User-style, right-aligned, brand color) */}
                  <div className="flex justify-end w-full animate-fade-in-up" style={{ animationDelay: `${idx * 200}ms` }}>
                    <div className="bg-orange-500 text-white rounded-3xl px-6 py-4 max-w-[85%] md:max-w-[70%] shadow-md select-text relative hover:scale-[1.02] transition-all duration-300">
                      <p className="text-sm md:text-base font-semibold leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {faq.q}
                      </p>
                      <svg className="absolute bottom-[-10px] right-6 w-5 h-4" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0 L20 0 L10 16 Z" fill="#f97316" />
                      </svg>
                    </div>
                  </div>

                  {/* Answer bubble (Bot-style, left-aligned, light background) */}
                  <div className="flex justify-start w-full animate-fade-in-up" style={{ animationDelay: `${idx * 200 + 100}ms` }}>
                    <div className="bg-gray-100 text-[#212529] rounded-3xl px-6 py-4 max-w-[85%] md:max-w-[70%] border border-gray-200/60 shadow-sm select-text relative hover:scale-[1.02] transition-all duration-300">
                      <p className="text-sm md:text-base leading-relaxed text-gray-800" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {faq.a}
                      </p>
                      <svg className="absolute bottom-[-10px] left-6 w-5 h-4" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0 L20 0 L10 16 Z" fill="#f3f4f6" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Plan Form Modal */}
      {isPlanOpen && (
        <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsPlanOpen(false)}>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsPlanOpen(false)} className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-all border border-gray-200">
               <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase font-bold text-orange-500 tracking-[0.2em] mb-2 block" style={{ fontFamily: "'Jost', sans-serif" }}>
               Connect with Us
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
               Plan Your Journey
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "'Jost', sans-serif" }}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Full Name</label>
                     <input 
                       type="text" 
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleChange}
                       placeholder="Enter Name"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Mobile Number</label>
                     <input 
                       type="tel" 
                       name="mobile"
                       required
                       value={formData.mobile}
                       onChange={handleChange}
                       placeholder="Enter Mobile"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Email ID</label>
                     <input 
                       type="email" 
                       name="email"
                       required
                       value={formData.email}
                       onChange={handleChange}
                       placeholder="Enter Email"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Destination</label>
                     <input 
                       type="text" 
                       name="destination"
                       required
                       value={formData.destination}
                       onChange={handleChange}
                       placeholder="Enter Destination"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-[#212529] mb-1.5">Your Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist you?"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all"
                  ></textarea>
               </div>
               <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#222] transition-all shadow-lg hover:-translate-y-0.5"
                  >
                     <Send className="w-4 h-4"/> {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
               </div>
            </form>

          </div>
        </div>
      )}
      {/* Pop-up Car Booking Modal */}
      {isCarModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsCarModalOpen(false)}>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsCarModalOpen(false)} className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-all border border-gray-200">
               <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase font-bold text-orange-500 tracking-[0.2em] mb-2 block" style={{ fontFamily: "'Jost', sans-serif" }}>
               Book a Ride
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
               Rent <span className="text-orange-500">{selectedCar.name}</span>
            </h3>

            <form onSubmit={handleCarSubmit} className="space-y-4" style={{ fontFamily: "'Jost', sans-serif" }}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Full Name</label>
                     <input 
                       type="text" 
                       name="name"
                       required
                       value={carBookingData.name}
                       onChange={handleCarChange}
                       placeholder="Enter Name"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Mobile Number</label>
                     <input 
                       type="tel" 
                       name="mobile"
                       required
                       value={carBookingData.mobile}
                       onChange={handleCarChange}
                       placeholder="Enter Mobile"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Email ID</label>
                     <input 
                       type="email" 
                       name="email"
                       required
                       value={carBookingData.email}
                       onChange={handleCarChange}
                       placeholder="Enter Email"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#212529] mb-1.5">Destination / Tourist Spots</label>
                     <input 
                       type="text" 
                       name="destination"
                       required
                       value={carBookingData.destination}
                       onChange={handleCarChange}
                       placeholder="Enter Tourist Spots / Destination"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-[#212529] mb-1.5">Pick-up Date & Time</label>
                  <input 
                    type="text" 
                    name="pickupDate"
                    required
                    value={carBookingData.pickupDate}
                    onChange={handleCarChange}
                    placeholder="e.g. May 15, 2026 at 10:00 AM"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-[#212529] mb-1.5">Special Requirements</label>
                  <textarea 
                    name="message"
                    rows={3}
                    required
                    value={carBookingData.message}
                    onChange={handleCarChange}
                    placeholder="Any specific requests or routes?"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all"
                  ></textarea>
               </div>
               <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#222] transition-all shadow-lg hover:-translate-y-0.5"
                  >
                     <Send className="w-4 h-4"/> {isSubmitting ? "Sending..." : "Book Car Now"}
                  </button>
               </div>
            </form>

          </div>
        </div>
      )}
    </Layout>
  );
};

export default Travells;
