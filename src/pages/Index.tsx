import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ChooseTripSection from "@/components/ChooseTripSection";
import JourneySection from "@/components/JourneySection";
import PackagesSection from "@/components/PackagesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <ChooseTripSection />
      <JourneySection />
      <PackagesSection />
      <AboutSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
