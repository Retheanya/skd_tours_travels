import { Shield, Users, Map, Headphones } from "lucide-react";
import aboutImg from "@/assets/about.png";

const features = [
  { icon: Shield, title: "Safe Travel", desc: "Your safety is our top priority on every trip" },
  { icon: Users, title: "Expert Guides", desc: "Experienced local guides who know every detail" },
  { icon: Map, title: "Custom Trips", desc: "Tailored itineraries based on your preferences" },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock assistance during your journey" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Happy travellers enjoying South India"
              className="rounded-2xl shadow-elevated w-full object-cover"
              loading="lazy"
              width={800}
              height={600}
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-primary text-primary-foreground rounded-2xl p-6 shadow-elevated hidden md:block">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-sm">Years of<br/>Experience</p>
            </div>
          </div>

          <div>
            <h2 className="mb-2">Why Choose Us</h2>
            <h3 className="mb-6">
              Stress-free Holidays with<br/>
              <span className="text-[#f97316]">SKT tours and travels</span>
            </h3>
            <p className="mb-8 leading-relaxed">
              SKT tours and travels is one of the leading travel agencies in South India.
              We make sure your next trip is truly special. Our friendly and experienced team
              plans everything based on your needs, so you can enjoy a holiday filled with great memories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{f.title}</h4>
                    <p className="text-xs mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
