import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PackagesSection from "@/components/PackagesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PackagesSection />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
