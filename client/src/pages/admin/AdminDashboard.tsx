import { useState, useEffect } from "react";
import { apiService, TourPackage, HoneymoonPackage, Inquiry, TravelInquiry, TaxiItem } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Edit3, 
  Plus, 
  LogOut, 
  CheckSquare, 
  Eye, 
  FolderPlus, 
  LayoutDashboard, 
  Map, 
  Mail, 
  Car, 
  Users, 
  ShieldCheck, 
  Calendar, 
  Menu, 
  X,
  ChevronRight,
  Heart,
  Luggage
} from "lucide-react";
import { ADMIN_PATH } from "@/lib/config";
import innovaImg from "../../assets/innova.png";
import etiosImg from "../../assets/etios.png";
import desireImg from "../../assets/desire.png";

type ActiveView = "overview" | "packages" | "honeymoons" | "inquiries" | "travel_bookings" | "users" | "taxis";

const AdminDashboard = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [taxis, setTaxis] = useState<TaxiItem[]>([]);
  const [honeymoons, setHoneymoons] = useState<HoneymoonPackage[]>([]);

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
    return car.imageUrl;
  };

  // Selected taxi for adding/editing
  const [selectedTaxi, setSelectedTaxi] = useState<TaxiItem | null>(null);
  const [isTaxiEditing, setIsTaxiEditing] = useState(false);
  const [isTaxiFormOpen, setIsTaxiFormOpen] = useState(false);

  // Form states for creating/editing taxis
  const [taxiForm, setTaxiForm] = useState({
    name: "",
    seater: "",
    description: "",
    price: "",
    imageUrl: "",
    featuresString: "",
    isPopular: false,
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [travelInquiries, setTravelInquiries] = useState<TravelInquiry[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Selected package for adding/editing
  const [selectedPkg, setSelectedPkg] = useState<TourPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Honeymoon specific CRUD state
  const [selectedHoneymoon, setSelectedHoneymoon] = useState<HoneymoonPackage | null>(null);
  const [isHoneymoonEditing, setIsHoneymoonEditing] = useState(false);
  const [isHoneymoonFormOpen, setIsHoneymoonFormOpen] = useState(false);
  const [honeymoonForm, setHoneymoonForm] = useState({
    slug: "",
    name: "",
    description: "",
    imageUrl: "",
    subtitle: "",
    price: "",
    duration: "",
    images: [] as string[],
    category: "",
    subCategory: "",
  });

  const handleOpenHoneymoonCreateForm = () => {
    setHoneymoonForm({
      slug: "",
      name: "",
      description: "",
      imageUrl: "",
      subtitle: "",
      price: "",
      duration: "",
      images: [],
      category: "Domestic",
      subCategory: "Honeymoon",
    });
    setSelectedHoneymoon(null);
    setIsHoneymoonEditing(false);
    setIsHoneymoonFormOpen(true);
  };

  const handleOpenHoneymoonEditForm = (pkg: HoneymoonPackage) => {
    setSelectedHoneymoon(pkg);
    setHoneymoonForm({
      slug: pkg.slug,
      name: pkg.name,
      description: pkg.description,
      imageUrl: pkg.imageUrl,
      subtitle: pkg.subtitle || "",
      price: pkg.price || "",
      duration: pkg.duration || "",
      images: pkg.images || [],
      category: pkg.category || "Domestic",
      subCategory: pkg.subCategory || "Honeymoon",
    });
    setIsHoneymoonEditing(true);
    setIsHoneymoonFormOpen(true);
  };

  const handleSaveHoneymoon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isHoneymoonEditing && selectedHoneymoon?._id) {
        await apiService.updateHoneymoon(selectedHoneymoon._id, honeymoonForm);
        toast.success("Honeymoon package updated successfully!");
      } else {
        await apiService.createHoneymoon(honeymoonForm);
        toast.success("Honeymoon package created successfully!");
      }
      setIsHoneymoonFormOpen(false);
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save honeymoon package.");
    }
  };

  const handleDeleteHoneymoon = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this honeymoon package?")) return;
    try {
      await apiService.deleteHoneymoon(id);
      toast.success("Honeymoon package deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete honeymoon package.");
    }
  };

  // Form states for creating/editing packages
  const [pkgForm, setPkgForm] = useState({
    slug: "",
    name: "",
    description: "",
    imageUrl: "",
    subtitle: "",
    price: "",
    images: [] as string[],
  });

  const [categoriesForm, setCategoriesForm] = useState<string>("");

  useEffect(() => {
    // Inject the premium Inter font to document head for admin dashboard
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Access denied. Please log in first.");
      navigate(`/${ADMIN_PATH}/login`);
      return;
    }
    fetchData();

    return () => {
      document.head.removeChild(link);
    };
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [pkgData, inqData, travelData, userData, taxiData, honeymoonData] = await Promise.all([
        apiService.getPackages(),
        apiService.getInquiries(),
        apiService.getTravelInquiries(),
        apiService.getUsers(),
        apiService.getTaxis(),
        apiService.getHoneymoons()
      ]);
      setPackages(pkgData);
      setInquiries(inqData);
      setTravelInquiries(travelData);
      setUsers(userData);
      setTaxis(taxiData);
      setHoneymoons(honeymoonData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch live dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------------
  // Taxi CRUD logic
  // --------------------------------------------------------
  const handleOpenTaxiCreateForm = () => {
    setTaxiForm({
      name: "",
      seater: "",
      description: "",
      price: "",
      imageUrl: "",
      featuresString: "",
      isPopular: false,
    });
    setSelectedTaxi(null);
    setIsTaxiEditing(false);
    setIsTaxiFormOpen(true);
  };

  const handleOpenTaxiEditForm = (taxi: TaxiItem) => {
    setSelectedTaxi(taxi);
    setTaxiForm({
      name: taxi.name,
      seater: taxi.seater,
      description: taxi.description,
      price: taxi.price,
      imageUrl: taxi.imageUrl,
      featuresString: (taxi.features || []).join(", "),
      isPopular: !!taxi.isPopular,
    });
    setIsTaxiEditing(true);
    setIsTaxiFormOpen(true);
  };

  const handleSaveTaxi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedFeatures = taxiForm.featuresString
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        name: taxiForm.name,
        seater: taxiForm.seater,
        description: taxiForm.description,
        price: taxiForm.price,
        imageUrl: taxiForm.imageUrl,
        features: parsedFeatures,
        isPopular: taxiForm.isPopular,
      };

      if (isTaxiEditing && selectedTaxi?._id) {
        await apiService.updateTaxi(selectedTaxi._id, payload);
        toast.success("Taxi updated successfully!");
      } else {
        await apiService.createTaxi(payload);
        toast.success("Taxi created successfully!");
      }

      setIsTaxiFormOpen(false);
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save taxi details.");
    }
  };

  const handleDeleteTaxi = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this taxi vehicle?")) return;
    try {
      await apiService.deleteTaxi(id);
      toast.success("Taxi vehicle deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete taxi vehicle.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
    navigate(`/${ADMIN_PATH}/login`);
  };

  // --------------------------------------------------------
  // Package CRUD logic
  // --------------------------------------------------------
  const handleOpenCreateForm = () => {
    setPkgForm({
      slug: "",
      name: "",
      description: "",
      imageUrl: "",
      subtitle: "",
      price: "",
      images: [],
    });
    setCategoriesForm("");
    setSelectedPkg(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (pkg: TourPackage) => {
    setSelectedPkg(pkg);
    setPkgForm({
      slug: pkg.slug,
      name: pkg.name,
      description: pkg.description,
      imageUrl: pkg.imageUrl,
      subtitle: pkg.subtitle || "",
      price: (pkg as any).price || "",
      images: pkg.images || [],
    });

    const plainCategories = pkg.categories
      .map((cat) => `${cat.title}: ${cat.items.join(", ")}`)
      .join("\n");
    setCategoriesForm(plainCategories);

    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedCategories = categoriesForm
        .split("\n")
        .map((line) => {
          const [title, itemsStr] = line.split(":");
          if (!title || !itemsStr) return null;
          return {
            title: title.trim(),
            items: itemsStr.split(",").map((i) => i.trim()).filter(Boolean),
          };
        })
        .filter(Boolean) as any[];

      if (parsedCategories.length === 0) {
        toast.error("Please add at least one valid category (Format: Title: Item1, Item2)");
        return;
      }

      const payload = {
        ...pkgForm,
        categories: parsedCategories,
      };

      if (isEditing && selectedPkg?._id) {
        const updated = await apiService.updatePackage(selectedPkg._id, payload);
        toast.success(`Successfully updated package: ${updated.name}`);
      } else {
        const created = await apiService.createPackage(payload);
        toast.success(`Successfully added new package: ${created.name}`);
      }

      setIsFormOpen(false);
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save the package.");
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await apiService.deletePackage(id);
      toast.success("Package deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the package.");
    }
  };

  // --------------------------------------------------------
  // Inquiry CRUD logic
  // --------------------------------------------------------
  const handleUpdateStatus = async (id: string, status: "pending" | "viewed" | "resolved") => {
    try {
      await apiService.updateInquiryStatus(id, status);
      toast.success(`Inquiry status updated to ${status}.`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update inquiry status.");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await apiService.deleteInquiry(id);
      toast.success("Inquiry deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the inquiry.");
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page-container min-h-screen flex items-center justify-center bg-gray-50">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          .admin-page-container, .admin-page-container * {
            font-family: 'Inter', sans-serif !important;
            color: #000000 !important;
          }
          .admin-page-container .text-[#F97316], 
          .admin-page-container .text-[#F97316] * {
            color: #F97316 !important;
          }
        `}</style>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold tracking-wider text-sm">Loading Administration Console...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "overview" as ActiveView, label: "Overview", icon: LayoutDashboard },
    { id: "packages" as ActiveView, label: "Tour Packages", icon: Map },
    { id: "honeymoons" as ActiveView, label: "Honeymoon Packages", icon: Heart },
    { id: "taxis" as ActiveView, label: "Manage Taxis", icon: Car },
    { id: "inquiries" as ActiveView, label: "General Inquiries", icon: Mail },
    { id: "travel_bookings" as ActiveView, label: "Taxi Bookings", icon: Car },
    { id: "users" as ActiveView, label: "System Admins", icon: Users },
  ];

  return (
    <div 
      className="admin-page-container min-h-screen bg-gray-50 flex flex-col md:flex-row relative text-gray-800"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Infant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        .admin-page-container, .admin-page-container * {
          font-family: 'Inter', sans-serif !important;
          color: #000000 !important;
        }
        .admin-page-container .text-[#F97316],
        .admin-page-container .text-[#F97316] *,
        .admin-page-container .text-orange-600,
        .admin-page-container .text-orange-600 *,
        .admin-page-container .text-amber-600,
        .admin-page-container .text-amber-600 * {
          color: #F97316 !important;
        }
        .admin-page-container .text-white,
        .admin-page-container .text-white *,
        .admin-page-container .bg-\[\#F97316\],
        .admin-page-container .bg-\[\#F97316\] * {
          color: #ffffff !important;
        }
        /* Logo Typography & Color Overrides */
        .admin-page-container .brand-font,
        .admin-page-container .brand-font * {
          font-family: 'Cormorant Infant', serif !important;
        }
        .admin-page-container .logo-blue,
        .admin-page-container .logo-blue * {
          color: #0066cc !important;
        }
        .admin-page-container .logo-orange,
        .admin-page-container .logo-orange * {
          color: #ff9900 !important;
        }
        .admin-page-container .logo-grey,
        .admin-page-container .logo-grey * {
          color: #555555 !important;
        }
        /* Slugs in light grey */
        .admin-page-container .admin-slug-text,
        .admin-page-container .admin-slug-text * {
          color: #94a3b8 !important;
        }
        /* Live Control Console text color to use #F97316 */
        .admin-page-container .live-console-title,
        .admin-page-container .live-console-title * {
          color: #F97316 !important;
        }
        /* Green badge for RESOLVED and CAR_BOOKING */
        .admin-page-container .resolved-badge,
        .admin-page-container .resolved-badge *,
        .admin-page-container .car-booking-badge,
        .admin-page-container .car-booking-badge * {
          background-color: #22c55e !important;
          border-color: #22c55e !important;
          color: #ffffff !important;
        }
        /* Red badge for PENDING */
        .admin-page-container .pending-badge,
        .admin-page-container .pending-badge * {
          background-color: #ef4444 !important;
          border-color: #ef4444 !important;
          color: #ffffff !important;
        }
        /* Card borders to use #F97316 */
        .admin-page-container main [class*="border-gray-"],
        .admin-page-container main [class*="border-gray-"] *,
        .admin-page-container main .border {
          border-color: #F97316 !important;
        }
      `}</style>
      {/* 1. DESKTOP SIDEBAR - Clean White with Grey Borders */}
      <aside className={`hidden ${isDesktopSidebarOpen ? 'md:flex' : 'md:hidden'} flex-col w-64 bg-white border-r border-gray-200/80 p-6 justify-between h-screen sticky top-0 z-30 shadow-sm transition-all duration-300`}>
        <div>
          <div className="flex flex-col mb-10 border-b border-gray-100 pb-6 select-none brand-font">
            <div className="flex items-center justify-between w-full">
              <div className="relative flex flex-col">
                <div className="flex items-center">
                  <span className="text-[28px] font-black italic logo-blue leading-none">SKD</span>
                  <span className="text-[28px] font-black italic logo-orange leading-none ml-1">Tours</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase logo-grey leading-none">and travels</span>
                  <div className="flex gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsDesktopSidebarOpen(false)}
                className="p-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] border border-orange-100 transition-all flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 active:scale-95 shrink-0 self-start"
                title="Collapse Sidebar"
              >
                <Luggage className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 text-left ${
                    isActive 
                      ? "bg-[#F97316] text-white shadow-md shadow-[#F97316]/20 scale-[1.02]" 
                      : "text-slate-600 hover:bg-orange-50/50 hover:text-[#F97316]"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Action */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 border border-red-100 mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout Session</span>
        </button>
      </aside>

      {/* 2. MOBILE HEADER & SIDEBAR */}
      <header className="md:hidden bg-white text-slate-800 border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm brand-font">
          <div className="flex flex-col select-none">
            <div className="flex items-center">
              <span className="text-[22px] font-black italic logo-blue leading-none">SKD</span>
              <span className="text-[22px] font-black italic logo-orange leading-none ml-1">Tours</span>
            </div>
            <div className="flex items-center gap-0.5 mt-0.5">
              <span className="text-[8px] font-black tracking-[0.2em] uppercase logo-grey leading-none">and travels</span>
              <div className="flex gap-0.5 ml-0.5">
                <span className="w-1 h-1 rounded-full bg-[#60a5fa]"></span>
                <span className="w-1 h-1 rounded-full bg-[#fb923c]"></span>
                <span className="w-1 h-1 rounded-full bg-[#4ade80]"></span>
              </div>
            </div>
          </div>
        {!isMobileSidebarOpen && (
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-all text-[#F97316]"
            title="Open Menu"
          >
            <Luggage className="w-7 h-7" />
          </button>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm md:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
          <aside 
            className="w-64 bg-white p-6 flex flex-col justify-between h-full shadow-2xl relative animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-50 rounded-lg text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex flex-col mb-8 border-b border-gray-100 pb-6 select-none brand-font">
                <div className="flex items-center">
                  <span className="text-[28px] font-black italic logo-blue leading-none">SKD</span>
                  <span className="text-[28px] font-black italic logo-orange leading-none ml-1">Tours</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase logo-grey leading-none">and travels</span>
                  <div className="flex gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 text-left ${
                        isActive 
                          ? "bg-[#F97316] text-white shadow-md shadow-[#F97316]/20" 
                          : "text-slate-600 hover:bg-orange-50/50 hover:text-[#F97316]"
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all border border-red-100"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </aside>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Dynamic header welcome */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {!isDesktopSidebarOpen && (
              <button 
                onClick={() => setIsDesktopSidebarOpen(true)}
                className="p-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] border border-orange-100 transition-all flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                title="Open Sidebar Menu"
              >
                <Luggage className="w-6 h-6 animate-pulse" />
              </button>
            )}
            <div>
              <span className="live-console-title text-xs uppercase font-extrabold text-[#F97316] tracking-widest block mb-1">
                Live Control Console
              </span>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {activeView === "overview" && "Dashboard Overview"}
                {activeView === "packages" && "Manage Tour Packages"}
                {activeView === "honeymoons" && "Honeymoon Packages"}
                {activeView === "taxis" && "Manage Taxis"}
                {activeView === "inquiries" && "General Inquiries"}
                {activeView === "travel_bookings" && "Taxi Bookings"}
                {activeView === "users" && "System Administrators"}
              </h1>
            </div>
          </div>
        </div>

        {/* SECTION 1: OVERVIEW & LIVE COUNT CARDS */}
        {activeView === "overview" && (
          <div className="space-y-10 animate-fade-in">
            {/* Real metric cards connected directly to backend counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              
              {/* Card 1: General Inquiries Count */}
              <div 
                onClick={() => setActiveView("inquiries")}
                className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">General Inquiries</span>
                  <span className="text-3xl font-extrabold text-slate-800 block">{inquiries.length}</span>
                  <span className="text-[11px] font-semibold text-white bg-[#F97316] px-2.5 py-1 rounded-full mt-2 inline-block border border-[#F97316]">
                    {inquiries.filter(i => i.status === "pending" || !i.status).length} Pending
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                  <Mail className="w-6 h-6" />
                </div>
              </div>

              {/* Card 2: System Users Count */}
              <div 
                onClick={() => setActiveView("users")}
                className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">System Admins</span>
                  <span className="text-3xl font-extrabold text-slate-800 block">{users.length}</span>
                  <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Authorized Only
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Card 3: Taxi / Travel bookings Count */}
              <div 
                onClick={() => setActiveView("travel_bookings")}
                className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Taxi Bookings</span>
                  <span className="text-3xl font-extrabold text-slate-800 block">{travelInquiries.length}</span>
                  <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Travel Form
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                  <Car className="w-6 h-6" />
                </div>
              </div>

              {/* Card 4: Packages Count */}
              <div 
                onClick={() => setActiveView("packages")}
                className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Tour Packages</span>
                  <span className="text-3xl font-extrabold text-slate-800 block">{packages.length}</span>
                  <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                    South India
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                  <Map className="w-6 h-6" />
                </div>
              </div>

              {/* Card 5: Honeymoon Packages Count */}
              <div 
                onClick={() => setActiveView("honeymoons")}
                className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Honeymoon Packages</span>
                  <span className="text-3xl font-extrabold text-slate-800 block">{honeymoons.length}</span>
                  <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Romantic Stays
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                  <Heart className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Visual Feed Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent general inquiries list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <h3 className="font-extrabold text-slate-800 text-lg">Recent General Inquiries</h3>
                  <button onClick={() => setActiveView("inquiries")} className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div key={inq._id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex justify-between items-center gap-4">
                      <div className="truncate">
                        <p className="font-bold text-slate-800 text-sm">{inq.name}</p>
                        <p className="text-xs text-gray-400 truncate">{inq.destination} — {inq.email}</p>
                      </div>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        inq.status === "resolved" 
                          ? "resolved-badge" 
                          : "pending-badge"
                      }`}>
                        {inq.status || "pending"}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">No general inquiries logged yet.</p>
                  )}
                </div>
              </div>

              {/* Recent taxi/travel bookings list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <h3 className="font-extrabold text-slate-800 text-lg">Recent Taxi Bookings</h3>
                  <button onClick={() => setActiveView("travel_bookings")} className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {travelInquiries.slice(0, 4).map((inq) => (
                    <div key={inq._id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex justify-between items-center gap-4">
                      <div className="truncate">
                        <p className="font-bold text-slate-800 text-sm">{inq.name}</p>
                        <p className="text-xs text-gray-400 truncate">{inq.carType || "Standard"} — {inq.pickupDate || "Not Specified"}</p>
                      </div>
                      <span className="car-booking-badge text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border">
                        {inq.type || "Taxi Form"}
                      </span>
                    </div>
                  ))}
                  {travelInquiries.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">No taxi bookings logged yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: TOUR PACKAGES VIEW */}
        {activeView === "packages" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-500">
                Create and manage direct South India travel packages
              </p>
              <button 
                onClick={handleOpenCreateForm}
                className="bg-[#F97316] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#e0650d] transition-all shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text">
              {packages.map((pkg) => (
                <div key={pkg._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 flex flex-col hover:shadow-md transition-shadow">
                  <h4 className="font-extrabold text-xl text-slate-800 mb-1 leading-tight">
                    {pkg.name}
                  </h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="admin-slug-text font-bold text-xs uppercase">Slug: {pkg.slug}</span>
                    {(pkg as any).price && (
                      <span className="text-[#F97316] font-extrabold text-sm">{(pkg as any).price}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-slate-400">Direct Package</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenEditForm(pkg)}
                        className="p-2.5 rounded-xl border border-gray-200/60 hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50/50 text-slate-700 transition-all bg-white cursor-pointer shadow-sm active:scale-95"
                        title="Edit Package"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => handleDeletePackage(pkg._id!)}
                        className="p-2.5 rounded-xl border border-gray-200/60 hover:border-red-500 hover:text-red-600 hover:bg-red-50/50 text-slate-700 transition-all bg-white cursor-pointer shadow-sm active:scale-95"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {packages.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-10 col-span-3">No state packages configured.</p>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2.2: HONEYMOON PACKAGES VIEW */}
        {activeView === "honeymoons" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-500">
                Create and manage romantic Honeymoon tour packages
              </p>
              <button 
                onClick={handleOpenHoneymoonCreateForm}
                className="bg-[#F97316] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#e0650d] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Honeymoon Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text">
              {honeymoons.map((pkg) => (
                <div key={pkg._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 flex flex-col hover:shadow-md transition-shadow">
                  <h4 className="font-extrabold text-xl text-slate-800 mb-1 leading-tight">
                    {pkg.name}
                  </h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="admin-slug-text font-bold text-xs uppercase">Slug: {pkg.slug}</span>
                    {pkg.price && (
                      <span className="text-[#F97316] font-extrabold text-sm">{pkg.price}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-slate-400">Duration: {pkg.duration || "N/A"}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenHoneymoonEditForm(pkg)}
                        className="p-2.5 rounded-xl border border-gray-200/60 hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50/50 text-slate-700 transition-all bg-white cursor-pointer shadow-sm active:scale-95"
                        title="Edit Package"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteHoneymoon(pkg._id!)}
                        className="p-2.5 rounded-xl border border-gray-200/60 hover:border-red-500 hover:text-red-600 hover:bg-red-50/50 text-slate-700 transition-all bg-white cursor-pointer shadow-sm active:scale-95"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {honeymoons.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-10 col-span-3">No honeymoon packages configured.</p>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2.5: TAXIS CRUD VIEW */}
        {activeView === "taxis" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-500">
                Create and manage direct taxi / rental vehicles in fleet
              </p>
              <button 
                onClick={handleOpenTaxiCreateForm}
                className="bg-[#F97316] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#e0650d] transition-all shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add Taxi Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text">
              {taxis.map((car) => (
                <div key={car._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 flex flex-col hover:shadow-md transition-shadow animate-fade-in">
                  <div className="h-44 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-gray-100 mb-4">
                    <img 
                      src={getCarImage(car)} 
                      alt={car.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h4 className="font-extrabold text-xl text-slate-800 mb-1 leading-tight">
                    {car.name}
                  </h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#F97316] font-bold text-xs uppercase">{car.seater}</span>
                    <span className="text-gray-900 font-extrabold text-sm">{car.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {car.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(car.features || []).map((feat, fIdx) => (
                      <span key={fIdx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                        {feat}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-slate-400">Taxi Car</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenTaxiEditForm(car)}
                        className="p-2.5 rounded-xl border border-gray-200/60 hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50/50 text-slate-700 transition-all bg-white cursor-pointer shadow-sm active:scale-95"
                        title="Edit Vehicle"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTaxi(car._id!)}
                        className="p-2.5 rounded-xl border border-gray-200/60 hover:border-red-500 hover:text-red-600 hover:bg-red-50/50 text-slate-700 transition-all bg-white cursor-pointer shadow-sm active:scale-95"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {taxis.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-10 col-span-3">No taxi vehicles configured.</p>
              )}
            </div>
          </div>
        )}

        {/* SECTION 3: GENERAL INQUIRIES VIEW */}
        {activeView === "inquiries" && (
          <div className="space-y-6 animate-fade-in">
            <p className="text-sm font-semibold text-gray-500">
              Review and update incoming client travel inquiries
            </p>

            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inq) => (
                <div key={inq._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 select-text">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="font-extrabold text-lg text-slate-800">{inq.name}</h4>
                      <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full border ${
                        inq.status === "resolved" 
                          ? "resolved-badge" 
                          : inq.status === "viewed" 
                          ? "bg-blue-50 text-blue-700 border-blue-200" 
                          : "pending-badge"
                      }`}>
                        {inq.status || "pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      <strong className="text-[#F97316]">Contact:</strong> {inq.mobile} | {inq.email}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      <strong className="text-[#F97316]">Destination:</strong> {inq.destination}
                    </p>
                    <p className="bg-gray-50/80 border border-gray-100 p-4 rounded-xl text-sm text-gray-600 leading-relaxed max-w-2xl">
                      {inq.message}
                    </p>
                  </div>

                  <div className="flex md:flex-col justify-end items-center gap-3 md:border-l md:border-gray-100 md:pl-6">
                    <button 
                      onClick={() => handleUpdateStatus(inq._id!, "viewed")}
                      className="p-2.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:text-blue-600 text-gray-500 transition-colors bg-gray-50"
                      title="Mark as Viewed"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(inq._id!, "resolved")}
                      className="p-2.5 rounded-xl border border-gray-100 hover:border-green-200 hover:text-green-600 text-gray-500 transition-colors bg-gray-50"
                      title="Mark as Resolved"
                    >
                      <CheckSquare className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteInquiry(inq._id!)}
                      className="p-2.5 rounded-xl border border-gray-100 hover:border-red-200 hover:text-red-600 text-gray-500 transition-colors bg-gray-50"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-10">No customer inquiries logged yet.</p>
              )}
            </div>
          </div>
        )}

        {/* SECTION 4: TAXI BOOKINGS VIEW */}
        {activeView === "travel_bookings" && (
          <div className="space-y-6 animate-fade-in">
            <p className="text-sm font-semibold text-gray-500">
              Manage custom taxi and travel transport booking requests
            </p>

            <div className="grid grid-cols-1 gap-4">
              {travelInquiries.map((inq) => (
                <div key={inq._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-200/60 hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 select-text">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="font-extrabold text-lg text-slate-800">{inq.name}</h4>
                      <span className="car-booking-badge text-[10px] uppercase font-black px-2.5 py-1 rounded-full border">
                        {inq.type || "Taxi Booking"}
                      </span>
                    </div>
                    
                    {/* Detailed transport fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                      <div>
                        <strong className="text-[#F97316]">Contact:</strong> {inq.mobile} | {inq.email}
                      </div>
                      <div>
                        <strong className="text-[#F97316]">Route:</strong> {inq.destination}
                      </div>
                      {inq.price && (
                        <div className="col-span-2">
                          <strong className="text-[#F97316]">Quoted Price:</strong> <span className="font-extrabold text-[#F97316]">{inq.price}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#F97316]" />
                        <strong className="text-[#F97316]">Pickup Date:</strong> {inq.pickupDate || "Not Specified"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-[#F97316]" />
                        <strong className="text-[#F97316]">Car Type:</strong> {inq.carType || "Standard Sedan"}
                      </div>
                    </div>

                    <p className="bg-gray-50/80 border border-gray-100 p-4 rounded-xl text-sm text-gray-600 leading-relaxed max-w-2xl">
                      {inq.message}
                    </p>
                  </div>
                </div>
              ))}
              {travelInquiries.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-10">No travel or taxi bookings registered yet.</p>
              )}
            </div>
          </div>
        )}

        {/* SECTION 5: REGISTERED USERS VIEW */}
        {activeView === "users" && (
          <div className="space-y-6 animate-fade-in">
            <p className="text-sm font-semibold text-gray-500">
              Monitor active systems administrator profile databases
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.map((user, idx) => (
                <div key={user._id || idx} className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex items-center gap-4 select-text">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316] shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="truncate">
                    <h4 className="font-extrabold text-slate-800 text-base leading-snug">{user.name}</h4>
                    <p className="text-sm text-gray-400 truncate mb-1">{user.email}</p>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">
                      {user.role || "Administrator"}
                    </span>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-10 col-span-2">No users found.</p>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Pop-up Package Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 z-[2000] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100 select-none animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-600 p-2 rounded-full transition-all">
               <span className="text-xl leading-none">&times;</span>
            </button>

            <span className="text-xs uppercase font-extrabold text-[#F97316] tracking-[0.2em] mb-2 block">
               Management Console
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-slate-800">
               {isEditing ? "Update" : "Add"} <span className="text-[#F97316]">Package</span>
            </h3>

            <form onSubmit={handleSavePackage} className="space-y-4 select-text">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug (e.g. kerala)</label>
                     <input 
                       type="text" 
                       required
                       value={pkgForm.slug}
                       onChange={(e) => setPkgForm({ ...pkgForm, slug: e.target.value })}
                       placeholder="e.g. kerala"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Package Name</label>
                     <input 
                       type="text" 
                       required
                       value={pkgForm.name}
                       onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })}
                       placeholder="e.g. Kerala Paradise"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Sub-title</label>
                     <input 
                       type="text" 
                       value={pkgForm.subtitle}
                       onChange={(e) => setPkgForm({ ...pkgForm, subtitle: e.target.value })}
                       placeholder="e.g. Explore backwaters and beaches"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Price (e.g. ₹12,500)</label>
                     <input 
                       type="text" 
                       value={pkgForm.price}
                       onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })}
                       placeholder="e.g. ₹12,500"
                       className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition-all" 
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                  <textarea 
                    rows={3}
                    required
                    value={pkgForm.description}
                    onChange={(e) => setPkgForm({ ...pkgForm, description: e.target.value })}
                    placeholder="Provide a detailed itinerary summary..."
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition-all"
                  ></textarea>
               </div>
               <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1.5">Upload Package Image</label>
                   <div className="flex flex-col sm:flex-row items-center gap-4 border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                     {pkgForm.imageUrl && (
                       <img 
                         src={pkgForm.imageUrl} 
                         alt="Package Preview" 
                         className="w-16 h-16 rounded-xl object-cover border border-gray-200" 
                       />
                     )}
                     <div className="flex-1 w-full">
                       <input 
                         type="file" 
                         accept="image/*"
                         onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                             const reader = new FileReader();
                             reader.onloadend = () => {
                               setPkgForm({ ...pkgForm, imageUrl: reader.result as string });
                               toast.success("Image uploaded successfully!");
                             };
                             reader.readAsDataURL(file);
                           }
                         }}
                         className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#F97316] hover:file:bg-orange-100"
                       />
                       <p className="text-[10px] text-gray-400 mt-1">Accepts any PNG, JPG or WEBP image format directly.</p>
                     </div>
                   </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                     Package Categories (Format: Title: Item1, Item2)
                   </label>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1.5">Manage Package Gallery Images</label>
                   
                   {/* Grid of current gallery images */}
                   {pkgForm.images && pkgForm.images.length > 0 && (
                     <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                       {pkgForm.images.map((imgUrl, imgIdx) => (
                         <div key={imgIdx} className="relative group rounded-lg overflow-hidden aspect-square border border-gray-200 shadow-sm bg-gray-50">
                           <img 
                             src={imgUrl} 
                             alt={`Gallery Preview ${imgIdx + 1}`} 
                             className="w-full h-full object-cover" 
                           />
                           <button 
                             type="button"
                             onClick={() => {
                               const updatedImages = pkgForm.images.filter((_, idx) => idx !== imgIdx);
                               setPkgForm({ ...pkgForm, images: updatedImages });
                               toast.success("Gallery image removed from package!");
                             }}
                             className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity cursor-pointer"
                           >
                             Delete
                           </button>
                         </div>
                      ))}
                     </div>
                   )}

                   {/* Gallery Uploader */}
                   <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                     <input 
                       type="file" 
                       multiple
                       accept="image/*"
                       onChange={(e) => {
                         const files = Array.from(e.target.files || []);
                         if (files.length > 0) {
                           let loadedCount = 0;
                           const loadedImages: string[] = [];
                           files.forEach((file) => {
                             const reader = new FileReader();
                             reader.onloadend = () => {
                               loadedImages.push(reader.result as string);
                               loadedCount++;
                               if (loadedCount === files.length) {
                                 setPkgForm({ 
                                   ...pkgForm, 
                                   images: [...(pkgForm.images || []), ...loadedImages] 
                                 });
                                 toast.success(`Successfully added ${files.length} gallery image(s)!`);
                               }
                             };
                             reader.readAsDataURL(file);
                           });
                         }
                       }}
                       className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#F97316] hover:file:bg-orange-100"
                     />
                     <p className="text-[10px] text-gray-400 mt-1">Select one or more images to append to the package's slideshow gallery.</p>
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      Package Categories (Format: Title: Item1, Item2)
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={categoriesForm}
                    onChange={(e) => setCategoriesForm(e.target.value)}
                    placeholder={`Highlights: 3N Munnar, 1N Alleppey Houseboat\nSightseeing: Cochin, Periyar Tiger Reserve`}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition-all font-mono"
                  ></textarea>
                  <p className="text-xs text-gray-400 mt-1">
                     Format strictly on multiple lines: <code className="bg-gray-100 px-1 py-0.5 rounded">Category Title: Item 1, Item 2</code>
                  </p>
               </div>
               <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full md:w-auto bg-[#F97316] text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#e0650d] transition-all shadow-lg duration-200"
                  >
                     <FolderPlus className="w-4 h-4" /> {isEditing ? "Update Details" : "Create New Package"}
                  </button>
               </div>
            </form>

          </div>
        </div>
      )}
      {/* 4. TAXI CREATION/EDIT POPUP MODAL */}
      {isTaxiFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 border border-gray-200 shadow-2xl relative max-h-[90vh] overflow-y-auto select-none animate-scale-in">
            <button 
              onClick={() => setIsTaxiFormOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-slate-800 text-2xl mb-2">
              {isTaxiEditing ? "Edit Taxi Vehicle" : "Add Taxi Vehicle"}
            </h3>
            <p className="text-gray-400 text-xs mb-6 font-semibold uppercase tracking-wider">
              Manage SKD fleet details and pricing
            </p>

            <form onSubmit={handleSaveTaxi} className="space-y-5 select-text">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Vehicle Name</label>
                  <input 
                    type="text" 
                    required
                    value={taxiForm.name}
                    onChange={(e) => setTaxiForm({ ...taxiForm, name: e.target.value })}
                    placeholder="e.g. Toyota Innova Crysta"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Seater capacity</label>
                  <input 
                    type="text" 
                    required
                    value={taxiForm.seater}
                    onChange={(e) => setTaxiForm({ ...taxiForm, seater: e.target.value })}
                    placeholder="e.g. 7+1 Seater"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Pricing text</label>
                  <input 
                    type="text" 
                    required
                    value={taxiForm.price}
                    onChange={(e) => setTaxiForm({ ...taxiForm, price: e.target.value })}
                    placeholder="e.g. Rs. 22 / km"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                    <input 
                      type="checkbox"
                      checked={taxiForm.isPopular}
                      onChange={(e) => setTaxiForm({ ...taxiForm, isPopular: e.target.checked })}
                      className="w-4.5 h-4.5 accent-[#F97316] rounded"
                    />
                    Most Popular Vehicle
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={taxiForm.description}
                  onChange={(e) => setTaxiForm({ ...taxiForm, description: e.target.value })}
                  placeholder="Short marketing description of vehicle..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Features (Comma Separated)</label>
                <input 
                  type="text" 
                  value={taxiForm.featuresString}
                  onChange={(e) => setTaxiForm({ ...taxiForm, featuresString: e.target.value })}
                  placeholder="e.g. A/C, Music System, Well Maintained"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Upload Vehicle Cover Image</label>
                <div className="border border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 flex flex-col sm:flex-row items-center gap-4">
                  {taxiForm.imageUrl && (
                    <img 
                      src={taxiForm.imageUrl} 
                      alt="Uploaded Preview" 
                      className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white shadow-sm shrink-0" 
                    />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setTaxiForm({ ...taxiForm, imageUrl: reader.result as string });
                            toast.success("Vehicle image uploaded successfully!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#F97316] hover:file:bg-orange-100 cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Accepts any PNG, JPG or WEBP image format directly.</p>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#e0650d] text-white py-4 rounded-xl font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer mt-2"
              >
                {isTaxiEditing ? "UPDATE DETAILS" : "ADD VEHICLE"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* 5. HONEYMOON CREATION/EDIT POPUP MODAL */}
      {isHoneymoonFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-[2100] backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsHoneymoonFormOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 border border-gray-200 shadow-2xl relative max-h-[90vh] overflow-y-auto select-none animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsHoneymoonFormOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase font-extrabold text-[#F97316] tracking-[0.2em] mb-2 block">
              Romantic Honeymoons
            </span>
            <h3 className="font-extrabold text-slate-800 text-2xl md:text-3xl mb-6">
              {isHoneymoonEditing ? "Edit Honeymoon Package" : "Add Honeymoon Package"}
            </h3>

            <form onSubmit={handleSaveHoneymoon} className="space-y-4 select-text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Package Name</label>
                  <input 
                    type="text" 
                    required
                    value={honeymoonForm.name}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, name: e.target.value })}
                    placeholder="e.g. Munnar Romantic Escape"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug (Unique slug, lowercase)</label>
                  <input 
                    type="text" 
                    required
                    value={honeymoonForm.slug}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, slug: e.target.value })}
                    placeholder="e.g. munnar-romantic-escape"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Subtitle</label>
                  <input 
                    type="text" 
                    value={honeymoonForm.subtitle}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, subtitle: e.target.value })}
                    placeholder="e.g. A perfect romantic getaway amidst hills"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Duration</label>
                  <input 
                    type="text" 
                    required
                    value={honeymoonForm.duration}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, duration: e.target.value })}
                    placeholder="e.g. 3 Days"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Package Price (e.g. Rs. 14,999)</label>
                  <input 
                    type="text" 
                    required
                    value={honeymoonForm.price}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, price: e.target.value })}
                    placeholder="e.g. Rs. 14,999"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Upload Cover Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setHoneymoonForm({ ...honeymoonForm, imageUrl: reader.result as string });
                          toast.success("Cover image uploaded!");
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#F97316] hover:file:bg-orange-100 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Filter Category (e.g. Domestic, International)</label>
                  <input 
                    type="text" 
                    required
                    value={honeymoonForm.category}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, category: e.target.value })}
                    placeholder="e.g. Domestic"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Sub Category (e.g. Honeymoon, Hill Station)</label>
                  <input 
                    type="text" 
                    required
                    value={honeymoonForm.subCategory}
                    onChange={(e) => setHoneymoonForm({ ...honeymoonForm, subCategory: e.target.value })}
                    placeholder="e.g. Honeymoon"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={honeymoonForm.description}
                  onChange={(e) => setHoneymoonForm({ ...honeymoonForm, description: e.target.value })}
                  placeholder="Short marketing description of the honeymoon trip..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Manage Package Gallery Images</label>
                {honeymoonForm.images && honeymoonForm.images.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
                    {honeymoonForm.images.map((imgUrl, imgIdx) => (
                      <div key={imgIdx} className="relative group rounded-lg overflow-hidden aspect-square border border-gray-200 shadow-sm bg-gray-50">
                        <img 
                          src={imgUrl} 
                          alt={`Gallery Preview ${imgIdx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const updatedImages = honeymoonForm.images.filter((_, idx) => idx !== imgIdx);
                            setHoneymoonForm({ ...honeymoonForm, images: updatedImages });
                            toast.success("Gallery image removed!");
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                  <input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        let loadedCount = 0;
                        const loadedImages: string[] = [];
                        files.forEach((file) => {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            loadedImages.push(reader.result as string);
                            loadedCount++;
                            if (loadedCount === files.length) {
                              setHoneymoonForm({ 
                                ...honeymoonForm, 
                                images: [...(honeymoonForm.images || []), ...loadedImages] 
                              });
                              toast.success(`Successfully added ${files.length} gallery image(s)!`);
                            }
                          };
                          reader.readAsDataURL(file);
                        });
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#F97316] hover:file:bg-orange-100"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#e0650d] text-white py-4 rounded-xl font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer mt-2"
              >
                {isHoneymoonEditing ? "UPDATE DETAILS" : "ADD PACKAGE"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
