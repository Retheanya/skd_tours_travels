import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import chikmangalor1 from "../assets/chikmangalor1.jpg";
import { CheckCircle, Car, Shield, Clock, MapPin, Star, Phone } from "lucide-react";
import innovaImg from "../assets/innova.png";
import etiosImg from "../assets/etios.png";
import desireImg from "../assets/desire.png";

const fleet = [
  {
    name: "Swift Dzire / Toyota Etios",
    image: desireImg,
    seater: "4+1 Seater",
    description: "Perfect for small families or business trips within the city or outstation.",
    price: "Rs. 14 / km",
    features: ["A/C", "Music System", "Professional Driver", "Clean Interiors"],
    isPopular: true
  },
  {
    name: "Toyota Etios (Premium)",
    image: etiosImg,
    seater: "4+1 Seater",
    description: "Comfortable sedan with ample legroom and boot space for your luggage.",
    price: "Rs. 15 / km",
    features: ["A/C", "Ample Boot Space", "Well Maintained", "Safe Driving"]
  },
  {
    name: "Toyota Innova Crysta",
    image: innovaImg,
    seater: "7+1 Seater",
    description: "The ultimate choice for group travels, long journeys, and family outings.",
    price: "Rs. 22 / km",
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
                SKT Tours and Travels offers top-notch taxi services in Coimbatore and beyond. Whether you're planning a trip to the hills of Ooty, the serenity of Kodaikanal, or just need a ride to the airport, we have the perfect vehicle for you.
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
            {fleet.map((car, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow group">
                <div className="h-56 bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
                  <img 
                    src={car.image} 
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
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Starting from</p>
                      <p className="text-2xl font-black text-[#222]">{car.price}</p>
                    </div>
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-[#222] transition-colors">
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
          <h3 className="text-3xl md:text-5xl text-white mb-8">
            Ready to <span className="text-orange-500">Start Your Journey?</span>
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
            <button className="bg-white text-[#222] px-10 py-5 rounded-2xl font-black text-lg uppercase hover:scale-105 transition-all shadow-xl">
              Inquiry Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h3 className="mb-2 text-center">Common Queries</h3>
          <h3 className="text-3xl md:text-4xl mb-12 text-center">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h3>
          <div className="space-y-6">
            {[
              { q: "What types of taxi services do you offer?", a: "We offer local sightseeing, outstation trips, airport transfers, and corporate rentals with a wide range of vehicles including sedans and SUVs." },
              { q: "Do you provide 24/7 taxi services in Coimbatore?", a: "Yes, our taxi services are available 24/7. We recommend booking in advance for airport pickups and late-night travel." },
              { q: "How are outstation taxi fares calculated?", a: "Outstation fares are typically calculated based on kilometers traveled, with a minimum daily distance requirement. Tolls, parking, and driver beta are extra." },
              { q: "Are your drivers professional and verified?", a: "Absolutely. All our drivers undergo background checks and are experienced in both local and long-distance driving to ensure your safety." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-black text-[#333] mb-3 flex items-center gap-3 uppercase italic tracking-tighter">
                  <span className="text-orange-500">Q.</span> {faq.q}
                </h3>
                <p className="leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Travells;
