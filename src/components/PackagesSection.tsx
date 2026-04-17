import { Clock, MapPin, Star } from "lucide-react";
import keralaImg from "@/assets/kerala.jpg";
import tamilnaduImg from "@/assets/tamilnadu.jpg";
import karnatakaImg from "@/assets/karnataka.jpg";
import andhraImg from "@/assets/andhrapradesh.jpg";
import pondicherryImg from "@/assets/pondicherry.jpg";
import telanganaImg from "@/assets/telangana.jpg";

const packages = [
  {
    name: "Kerala",
    tagline: "God's Own Country",
    image: keralaImg,
    duration: "5 Days / 4 Nights",
    price: "₹12,999",
    rating: 4.9,
    highlights: ["Alleppey Backwaters", "Munnar Hills", "Kovalam Beach"],
  },
  {
    name: "Tamil Nadu",
    tagline: "Land of Temples",
    image: tamilnaduImg,
    duration: "4 Days / 3 Nights",
    price: "₹9,999",
    rating: 4.8,
    highlights: ["Meenakshi Temple", "Ooty Hills", "Mahabalipuram"],
  },
  {
    name: "Karnataka",
    tagline: "One State, Many Worlds",
    image: karnatakaImg,
    duration: "5 Days / 4 Nights",
    price: "₹11,499",
    rating: 4.8,
    highlights: ["Hampi Ruins", "Coorg Coffee", "Mysore Palace"],
  },
  {
    name: "Andhra Pradesh",
    tagline: "The Essence of Incredible India",
    image: andhraImg,
    duration: "3 Days / 2 Nights",
    price: "₹8,499",
    rating: 4.7,
    highlights: ["Tirupati Temple", "Araku Valley", "Vizag Beach"],
  },
  {
    name: "Pondicherry",
    tagline: "The French Riviera of the East",
    image: pondicherryImg,
    duration: "3 Days / 2 Nights",
    price: "₹7,999",
    rating: 4.8,
    highlights: ["French Quarter", "Auroville", "Paradise Beach"],
  },
  {
    name: "Telangana",
    tagline: "Rich Heritage & Culture",
    image: telanganaImg,
    duration: "3 Days / 2 Nights",
    price: "₹8,999",
    rating: 4.6,
    highlights: ["Charminar", "Ramoji Film City", "Warangal Fort"],
  },
];

const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-2">
          South India Tour Packages
        </h2>
        <h3 className="text-center mb-4">
          Explore the Best of South India
        </h3>
        <p className="text-center max-w-2xl mx-auto mb-14">
          Handcrafted travel packages to the most stunning destinations across South India.
          Temples, beaches, hill stations & more!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`${pkg.name} tour package`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  width={640}
                  height={800}
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold font-body">
                  {pkg.price}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                  <h3 className="text-xl font-bold font-display text-primary-foreground">{pkg.name}</h3>
                  <p className="text-primary-foreground/80 text-sm font-body italic">{pkg.tagline}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground font-body">
                    <Clock className="w-4 h-4 text-primary" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-body text-foreground">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    {pkg.rating}
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  {pkg.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground rounded-full px-3 py-1 mr-2 font-body"
                    >
                      <MapPin className="w-3 h-3 text-primary" />
                      {h}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-xl font-semibold font-body hover:opacity-90 transition-opacity text-sm">
                  View Package Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
