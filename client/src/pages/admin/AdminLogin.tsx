import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "@/lib/api";
import { toast } from "sonner";
import { ADMIN_PATH } from "@/lib/config";
import characterImg from "@/assets/admin.png";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically inject the Inter font to document head for admin pages only
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await apiService.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Welcome back, Administrator!");
      navigate(`/${ADMIN_PATH}/dashboard`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid credentials provided.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="admin-page-container min-h-screen w-full flex flex-col md:flex-row bg-white relative overflow-hidden select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .admin-page-container, .admin-page-container * {
          font-family: 'Inter', sans-serif !important;
          color: #000000 !important;
        }
        .admin-page-container .text-orange-primary, 
        .admin-page-container .text-orange-primary * {
          color: #F97316 !important;
        }
        .admin-page-container input::placeholder {
          color: #000000 !important;
          opacity: 0.5 !important;
        }
      `}</style>

      {/* LEFT FORM SECTION */}
      <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col justify-between p-5 xs:p-8 sm:p-12 md:p-16 lg:p-24 bg-white z-20 min-h-screen">
        {/* Empty placeholder for alignment */}
        <div className="hidden md:block"></div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto md:mx-0 my-auto">
          {/* Avatar Icon */}
          <div className="mb-6 flex justify-start">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center border-4 border-black/10 shadow-lg relative overflow-hidden">
              <svg 
                className="w-10 h-10 text-[#F97316] opacity-90" 
                fill="none" 
                stroke="#F97316" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Welcome Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-black uppercase mb-10">
            WELCOME
          </h1>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="relative border-b-2 border-[#F97316] py-2 transition-all">
              <label className="block text-xs font-bold text-black uppercase tracking-widest mb-1">
                Username
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skt.com"
                className="w-full bg-transparent text-sm text-black font-semibold outline-none border-none py-1.5" 
              />
            </div>

            <div className="relative border-b-2 border-black py-2 transition-all">
              <div className="w-full">
                <label className="block text-xs font-bold text-black uppercase tracking-widest mb-1">
                  Password
                </label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="adminpass"
                  className="w-full bg-transparent text-sm text-black font-semibold outline-none border-none py-1.5 pr-10" 
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-2 text-black hover:text-[#F97316] focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-black" /> : <Eye className="w-5 h-5 text-black" />}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F97316] hover:bg-[#e0650d] text-black font-extrabold py-4 rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg shadow-[#F97316]/20 active:scale-[0.98]"
            >
              <span className="text-black font-black">{isSubmitting ? "Verifying..." : "LOGIN"}</span>
            </button>
          </form>
        </div>

        {/* Footer Brand placeholder */}
        <div className="pt-8"></div>
      </div>

      {/* RIGHT ILLUSTRATION WAVE SECTION */}
      <div className="w-full md:w-[50%] lg:w-[55%] relative h-[500px] md:h-screen bg-white overflow-hidden flex items-center justify-center">
        {/* High-Fidelity SVG Wave exactly duplicating the shape in the mockup */}
        <svg 
          className="absolute inset-0 w-full h-full select-none pointer-events-none" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
        >
          <path 
            d="M950,0 C800,150 700,300 550,430 C450,530 550,850 600,1000 L1000,1000 L1000,0 Z" 
            fill="#F97316" 
          />
        </svg>

        {/* Perfectly aligned combined Lamp and Character container */}
        <div className="relative z-10 w-full max-w-[420px] lg:max-w-[480px] h-full flex flex-col items-center justify-center pt-2 md:pt-4">
          
          {/* Green Hanging Lamp */}
          <div className="flex flex-col items-center select-none mb-6">
            {/* Cable line */}
            <div className="w-[3px] h-[100px] md:h-[130px] bg-black opacity-85 shadow-sm" />
            {/* Green Lamp Canopy */}
            <div className="w-20 h-10 bg-black rounded-t-full relative flex justify-center shadow-lg border-b border-black/40">
              {/* Glowing Bulb */}
              <div className="absolute -bottom-4 w-8 h-8 rounded-full bg-[#fde047] opacity-90 blur-[2px] animate-pulse flex items-center justify-center shadow-[0_0_20px_#fde047]">
                <div className="w-4 h-4 rounded-full bg-white opacity-80" />
              </div>
            </div>
          </div>

          {/* Character Illustration */}
          <div className="w-full aspect-square flex items-center justify-center px-4 animate-floating">
            <img 
              src={characterImg} 
              alt="Admin Login Character" 
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
