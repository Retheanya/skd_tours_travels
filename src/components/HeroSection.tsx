import { MapPin, Calendar, Search } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBanner}
        alt="Beautiful South Indian landscape with tea plantations"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <p className="text-primary font-display text-lg md:text-xl mb-3 animate-fade-in-up italic">
          ★★★ SDK Tours & Travels ★★★
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-primary-foreground mb-6 animate-fade-in-up leading-tight">
          Explore the Beauty of
          <br />
          <span className="text-primary">South India</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto mb-10 animate-fade-in-up">
          Discover temples, backwaters, hill stations & vibrant culture. Your dream South India trip starts here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up">
          <span className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-body">
            <span className="text-primary font-semibold">5K+</span> Satisfied Clients
          </span>
          <span className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-body">
            <span className="text-primary font-semibold">10+</span> Years Experience
          </span>
        </div>

        <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md rounded-2xl shadow-elevated p-4 md:p-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-body">Destination</p>
                <p className="text-sm font-semibold text-foreground font-body">Where to next?</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-body">Duration</p>
                <p className="text-sm font-semibold text-foreground font-body">Select Duration</p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground rounded-xl px-6 py-3 font-semibold font-body hover:opacity-90 transition-opacity">
              <Search className="w-5 h-5" />
              Search Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
