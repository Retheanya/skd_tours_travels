import Header from "./Header";
import Footer from "./Footer";
import { ReactNode, useState, useEffect } from "react";
import { ChevronRight, Phone, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="pt-[86.2px]">
        {children}
      </main>
      
      {/* 1. Global Sticky Enquiry Button */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 right-0 z-[100] transition-all duration-500 transform ${
          showSticky ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: '49.5px', height: '138px' }}
      >
        <Link to="/contact" className="w-full h-full bg-orange-500 text-white rounded-l-2xl shadow-2xl font-black text-[14px] [writing-mode:vertical-rl] tracking-widest uppercase flex flex-col items-center justify-center hover:bg-[#222] transition-colors group select-none">
            Enquiry Now
        </Link>
      </div>

      {/* 2. Floating Action Buttons (Bottom Right) */}
      <div className={`fixed bottom-8 right-8 z-[100] flex flex-col gap-4 transition-all duration-500 ${showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Phone Button */}
          <a 
            href="tel:+919362266666" 
            className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl hover:bg-[#222] transition-all hover:-translate-y-2 group"
          >
              <Phone className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
          </a>

          {/* Scroll To Top */}
          <button 
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-white text-orange-500 border-2 border-orange-500 flex items-center justify-center shadow-2xl hover:bg-orange-500 hover:text-white transition-all hover:-translate-y-2 group"
          >
              <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
