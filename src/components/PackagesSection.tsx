import { useNavigate } from "react-router-dom";
import keralaImg from "@/assets/kerala.png";
import tamilnaduImg from "@/assets/tamilnadu.png";
import karnatakaImg from "@/assets/karnataka.png";
import andhraImg from "@/assets/andhrapradesh.png";
import pondicherryImg from "@/assets/pondichery.png";
import viewBtnImg from "@/assets/view.png";

const packages = [
  {
    name: "Kerala",
    description: "Witness Kerala's wild nature, culture, and stunning landscapes.",
    image: keralaImg,
  },
  {
    name: "Tamil Nadu",
    description: "Tour iconic sites, diverse landscapes, and culture of Tamil Nadu.",
    image: tamilnaduImg,
  },
  {
    name: "Karnataka",
    description: "Stroll through Karnataka's timeless history, modern charm, and delicious cuisine.",
    image: karnatakaImg,
  },
  {
    name: "Andhra Pradesh",
    description: "The Essence of Incredible India - Temples, beaches and more.",
    image: andhraImg,
  },
  {
    name: "Pondicherry",
    description: "The French Riviera of the East - A unique colonial experience.",
    image: pondicherryImg,
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
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="travel-card bg-white rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2"
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
                    onClick={() => navigate("/packages")}
                    className="view-packages-btn hover:scale-105 transition-transform duration-300 active:scale-95"
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
