import { useState, useEffect } from "react";
import { Phone, Menu, X, Send } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import planBtn from "../assets/plan.png";
import { NavLink } from "./NavLink";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Honeymoon", href: "/honeymoon" },
  { label: "Travells", href: "/travells" },
  { label: "Service", href: "/service" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    destination: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! Our travel specialists will get back to you soon.");
    setFormData({ name: "", mobile: "", email: "", destination: "", message: "" });
    setIsPlanOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "text-[#333]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 bg-white shadow-md h-[86.2px] flex items-center`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        
        {/* BRANDING */}
        <Link to="/" className="flex items-center gap-2 group">
           <div className="relative">
              <div className="flex items-center">
                 <span className="text-3xl font-black italic text-[#0066cc]">SKT</span>
                 <span className="text-3xl font-black italic text-[#ff9900] ml-1">Tours</span>
              </div>
              <div className="flex items-center gap-1 -mt-1">
                 <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#333]">and travels</span>
                 <div className="flex gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                 </div>
              </div>
           </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              activeClassName="text-orange-500"
              className={`text-[15px] font-bold transition-all flex items-center gap-1.5 hover:text-orange-500 ${textColor}`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CONTACT CTA */}
        <div className="flex items-center gap-4">
          <div className="relative">
              <button onClick={() => setIsPlanOpen(true)} className="relative z-10 flex items-center justify-center hover:scale-105 transition-transform">
                  <img 
                    src={planBtn} 
                    alt="Plan" 
                    className="w-[145px] md:w-[175px] h-[50px] md:h-[60px] object-contain cursor-pointer" 
                  />
              </button>
          </div>
          
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`xl:hidden ${textColor}`}>
            {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-[1000] flex flex-col p-8 pt-24 animate-fade-in text-[#333] overflow-y-auto">
           <button onClick={() => setMobileOpen(false)} className="absolute top-8 right-8 text-[#333]">
             <X className="w-10 h-10" />
           </button>
           {navLinks.map(link => (
             <Link 
               key={link.label} 
               to={link.href} 
               onClick={() => setMobileOpen(false)}
               className="text-2xl font-black py-4 border-b border-gray-100 flex justify-between items-center text-[#333]"
             >
                {link.label}
             </Link>
           ))}
        </div>
      )}

      {/* Pop-up Plan Form Modal in Center */}
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
                    className="w-full md:w-auto bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#222] transition-all shadow-lg hover:-translate-y-0.5"
                  >
                     <Send className="w-4 h-4"/> Send Message
                  </button>
               </div>
            </form>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
