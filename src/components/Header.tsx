import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import planBtn from "../assets/plan.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#", hasDropdown: true },
  { label: "Packages", href: "#", hasDropdown: true },
  { label: "Honeymoon", href: "#", hasDropdown: true },
  { label: "Travells", href: "#" },
  { label: "Service", href: "#" },
  { label: "Contact", href: "#", hasDropdown: true },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "text-[#333]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white shadow-md h-[86.2px] flex items-center`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        
        {/* BRANDING */}
        <Link to="/" className="flex items-center gap-2 group">
           <div className="relative">
              <div className="flex items-center">
                 <span className="text-3xl font-black italic text-[#0066cc]">SKD</span>
                 <span className="text-3xl font-black italic text-[#ff9900] ml-1">Tours</span>
              </div>
              <div className="flex items-center gap-1 -mt-1">
                 <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#333]">And Travells</span>
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
            <Link
              key={link.label}
              to={link.href}
              className={`text-[15px] font-bold transition-all flex items-center gap-1.5 hover:text-orange-500 ${textColor}`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
            </Link>
          ))}
        </nav>

        {/* CONTACT CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block relative">
              <button className="relative z-10 flex items-center justify-center hover:scale-105 transition-transform">
                  <img 
                    src={planBtn} 
                    alt="Plan" 
                    className="w-[175px] h-[60px] object-contain cursor-pointer" 
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
        <div className="fixed inset-0 bg-white z-[110] flex flex-col p-8 pt-24 animate-fade-in text-[#333]">
           <button onClick={() => setMobileOpen(false)} className="absolute top-8 right-8 text-[#333]">
             <X className="w-10 h-10" />
           </button>
           {navLinks.map(link => (
             <Link key={link.label} to={link.href} className="text-2xl font-black py-4 border-b border-gray-100 flex justify-between items-center text-[#333]">
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-6 h-6" />}
             </Link>
           ))}
        </div>
      )}
    </header>
  );
};

export default Header;
