import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import keralaImg from "@/assets/kerala.png";
import tamilnaduImg from "@/assets/tamilnadu.png";
import karnatakaImg from "@/assets/karnataka.png";
import andhraImg from "@/assets/andhrapradesh.png";
import pondicherryImg from "@/assets/pondichery.png";
import viewBtnImg from "@/assets/view.png";

type PackageDetails = {
  subtitle?: string;
  description?: string;
  categories: {
    title: string;
    items: string[];
  }[];
};

type Package = {
  name: string;
  description: string;
  image: string;
  details: PackageDetails;
};

const packages: Package[] = [
  {
    name: "Kerala",
    description: "Witness Kerala's wild nature, culture, and stunning landscapes.",
    image: keralaImg,
    details: {
      subtitle: "Tourist Places",
      description: "Kerala = backwaters, greenery, beaches",
      categories: [
        {
          title: "Hill Stations",
          items: ["Munnar", "Wayanad", "Thekkady", "Ponmudi"]
        },
        {
          title: "Backwaters & Lakes",
          items: ["Alleppey (Alappuzha)", "Kumarakom", "Ashtamudi"]
        },
        {
          title: "Beaches & Culture",
          items: ["Varkala", "Kovalam", "Trivandrum", "Kochi"]
        }
      ]
    }
  },
  {
    name: "Tamil Nadu",
    description: "Tour iconic sites, diverse landscapes, and culture of Tamil Nadu.",
    image: tamilnaduImg,
    details: {
      description: "Tamil Nadu is known for temples, hill stations, and beaches",
      categories: [
        {
          title: "Hill Stations & Nature",
          items: ["Ooty", "Kodaikanal", "Yercaud", "Coonoor"]
        },
        {
          title: "Temples & Heritage",
          items: ["Madurai", "Rameswaram", "Thanjavur", "Kanchipuram"]
        },
        {
          title: "Beaches & Cities",
          items: ["Chennai", "Mahabalipuram", "Kanyakumari", "Pondicherry"]
        }
      ]
    }
  },
  {
    name: "Karnataka",
    description: "Stroll through Karnataka's timeless history, modern charm, and delicious cuisine.",
    image: karnatakaImg,
    details: {
      subtitle: "(including Goa, Coorg, etc.)",
      categories: [
        {
          title: "Hill Stations & Nature",
          items: ["Coorg (Kodagu)", "Chikmagalur", "Agumbe", "Nandi Hills"]
        },
        {
          title: "Heritage & Architecture",
          items: ["Hampi", "Mysore", "Badami", "Belur & Halebidu"]
        },
        {
          title: "Beaches (Goa + Karnataka coast)",
          items: ["Goa", "Gokarna", "Karwar", "Udupi"]
        }
      ]
    }
  },
  {
    name: "Andhra Pradesh",
    description: "The Essence of Incredible India - Temples, beaches and more.",
    image: andhraImg,
    details: {
      subtitle: "Tourist Places",
      categories: [
        {
          title: "Hill & Nature",
          items: ["Araku Valley", "Horsley Hills", "Lambasingi", "Belum Caves"]
        },
        {
          title: "Temples & Spiritual",
          items: ["Tirupati", "Srisailam", "Vijayawada", "Lepakshi"]
        },
        {
          title: "Beaches & Cities",
          items: ["Visakhapatnam (Vizag)", "Rushikonda Beach", "Borra Caves"]
        }
      ]
    }
  },
  {
    name: "Pondicherry",
    description: "The French Riviera of the East - A unique colonial experience.",
    image: pondicherryImg,
    details: {
      subtitle: "French Riviera of the East",
      description: "Experience the unique blend of French colonial heritage and Indian culture.",
      categories: [
        {
          title: "Beaches & Ashrams",
          items: ["Promenade Beach", "Auroville", "Sri Aurobindo Ashram", "Paradise Beach"]
        },
        {
          title: "Heritage & Architecture",
          items: ["French Quarter", "Basilica of the Sacred Heart", "Pondicherry Museum"]
        }
      ]
    }
  },
];

const PackagesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="packages" className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-2">
          South India Tour Packages
        </h2>
        <h3 className="text-center mb-16">
          Explore the Best of South India
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.name}
              className="travel-card bg-white rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="package-image-container p-3 pb-0">
                <div className="relative w-full overflow-hidden rounded-[15px] image-mask-effect">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-4 pt-1 text-center flex flex-col items-center">
                <h4 className="text-xl font-bold mb-0.5 text-[#333] font-display">{pkg.name}</h4>
                <p className="mb-2 max-w-[280px] leading-tight" style={{ fontSize: '18px', color: '#666666', fontFamily: 'Jost, sans-serif' }}>
                  {pkg.description}
                </p>
                
                <div className="pb-1">
                  <button 
                    onClick={() => navigate(`/state/${pkg.name.toLowerCase().replace(" ", "-")}`)}
                    className="view-packages-btn hover:scale-105 transition-transform duration-300 active:scale-95 cursor-pointer"
                  >
                    <img 
                      src={viewBtnImg} 
                      alt="View Packages" 
                      className="w-[160px] h-auto"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
