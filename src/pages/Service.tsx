import Layout from "@/components/Layout";
import { useEffect } from "react";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import serviceImg1 from "../assets/service.png";
import serviceImg2 from "../assets/service2.png";

const serviceCategories = [
  {
    icon: "https://aspireholidays.in/assets/img/icon/service-2.png",
    title: "Hotel",
    desc: "Your Home Away from Home Awaits! Creating Memories One Stay at a Time - Relax, we'll take care of the rest. Unwind in style and luxury, because you deserve the finest."
  },
  {
    icon: "https://aspireholidays.in/assets/img/icon/service-4.png",
    title: "Travel Insurance",
    desc: "Your Safety Net in Every Adventure! Travel with Confidence, Knowing We've Got Your Back - Because peace of mind is the ultimate travel essential."
  },
  {
    icon: "https://aspireholidays.in/assets/img/icon/service-5.png",
    title: "Ticket",
    desc: "Your Ticket to Anywhere, Simplified! Fly High with Ease - We'll handle the logistics, so you can focus on the memories. Your journey begins with a single ticket."
  }
];

const Service = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* 1. Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-[#222]">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-orange-600/20 z-10" />
        <div className="relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-[0.2em] uppercase" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Services
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Home</span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500">Services</span>
          </div>
        </div>
      </section>

      {/* 2. Introduction Section (Using serviceImg1) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative group">
                <div className="relative z-10">
                   <img 
                    src={serviceImg1} 
                    alt="South India Travel" 
                    className="w-full h-auto rounded-[60px] shadow-2xl border-[15px] border-white transition-transform duration-700 group-hover:scale-[1.02]" 
                   />
                   <div className="absolute -bottom-10 -right-10 bg-orange-500 w-48 h-48 rounded-full flex flex-col items-center justify-center text-white shadow-2xl animate-floating border-8 border-white">
                      <p className="text-4xl font-black">10+</p>
                      <p className="text-xs font-bold uppercase tracking-widest">Years of Trust</p>
                   </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-10 -left-10 w-32 h-32 opacity-10 bg-[radial-gradient(#f97316_2px,transparent_2px)] [background-size:16px_16px]" />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: "#F0870D", fontSize: "28px" }}>
                Discover the Magic of South India
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-8 text-[#212529] leading-tight" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                Expert Travel <br />
                <span className="text-orange-500">Service Solutions</span>
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-body">
                SKT Tours and Travels is exclusively dedicated to showcasing the unparalleled beauty of South India. From the mist-covered tea gardens of Munnar to the architectural marvels of Hampi, we provide specialized travel services that ensure you experience the true essence of the South.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['Local Expertise', 'Custom South India Tours', 'Temple Pilgrimage Specialists', '24/7 Ground Support'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[#333] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="bg-[#222] text-white px-12 py-5 rounded-2xl font-black text-sm uppercase hover:bg-orange-500 transition-all shadow-xl hover:-translate-y-1">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The "Perfect Vacation" Grid Section (Exact Replica of Screenshot) */}
      <section className="py-24 bg-[#fdfaf7] relative overflow-hidden">
        {/* Dotted Map Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/world-map.png')` }} />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: "#F0870D", fontSize: "28px" }}>
            Let us help you plan your next adventure
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-24 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Perfect Vacation Come True
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {serviceCategories.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="mb-10 relative">
                  <div className="w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    {/* Placeholder for illustrations from screenshot */}
                    <img 
                      src={s.icon} 
                      alt={s.title} 
                      className="w-full h-full object-contain filter drop-shadow-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.iconify.design/heroicons:cube-transparent.svg?color=%23f97316`;
                      }}
                    />
                  </div>
                </div>
                <h4 className="text-2xl font-black mb-6 text-[#212529] uppercase tracking-tighter" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                  {s.title}
                </h4>
                <p className="text-gray-500 leading-relaxed font-body text-[15px] px-4 max-w-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Long Image Section (Using serviceImg2) */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center transition-transform duration-[3s] scale-110"
          style={{ backgroundImage: `url(${serviceImg2})` }}
        />
        <div className="relative z-20 text-center text-white px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-10 max-w-4xl mx-auto leading-tight" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Experience the Serenity of <br />
            <span className="text-orange-500">South Indian Coastal Paradise</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-body opacity-90">
            From the backwaters of Kerala to the shores of Gokarna, discover the finest coastal getaways with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-orange-500 text-white px-12 py-5 rounded-full font-black text-lg uppercase hover:bg-white hover:text-[#222] transition-all shadow-2xl hover:scale-105">
              Book Your Trip
            </button>
            <a href="tel:+919843051148" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-5 rounded-full font-black text-lg uppercase hover:bg-white hover:text-orange-500 transition-all shadow-2xl">
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* 5. Stats & Partners (Inspired by Aspire) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { label: "Happy Clients", value: "5000+" },
              { label: "Destinations", value: "200+" },
              { label: "Tours Done", value: "1500+" },
              { label: "Experience", value: "10 Yrs" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-5xl font-black text-[#222] mb-2">{stat.value}</p>
                <p className="text-sm font-bold text-orange-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Form Section (Aspire Style) */}
      <section className="py-24 bg-[#fdfaf7]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-[60px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 bg-[#222] p-12 text-white">
              <h4 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Cormorant Infant', serif" }}>Contact Info</h4>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="font-bold text-sm uppercase text-gray-400 mb-1">Our Office</p>
                    <p className="text-sm opacity-80">123 Travel Lane, Coimbatore,<br/>Tamil Nadu, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="font-bold text-sm uppercase text-gray-400 mb-1">Phone</p>
                    <p className="text-sm opacity-80">+91 98430 51148</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="font-bold text-sm uppercase text-gray-400 mb-1">Email</p>
                    <p className="text-sm opacity-80">info@skttours.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 p-12 md:p-20">
              <h4 className="text-4xl font-bold mb-10 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>Get in Touch</h4>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Your Name" className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all" />
                  <input type="email" placeholder="Email" className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all" />
                </div>
                <input type="tel" placeholder="Mobile Number" className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all" />
                <textarea placeholder="Message" rows={5} className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all resize-none" />
                <button className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#222] transition-all shadow-lg text-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Service;
