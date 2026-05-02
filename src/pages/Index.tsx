import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ChooseTripSection from "@/components/ChooseTripSection";
import JourneySection from "@/components/JourneySection";
import PackagesSection from "@/components/PackagesSection";
import AdventureSection from "@/components/AdventureSection";
import NextAdventureSection from "@/components/NextAdventureSection";
import GallerySection from "@/components/GallerySection";
import ClientTestimonialsSection from "@/components/ClientTestimonialsSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <ChooseTripSection />
      <AboutSection />
      <JourneySection />
      <PackagesSection />
      <AdventureSection />
      <NextAdventureSection />
      <GallerySection />
      <ClientTestimonialsSection />
    </Layout>
  );
};

export default Index;
