import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary-foreground mb-4">
            About <span className="text-primary">SKT tours and travels</span>
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto font-body">
            Your premier travel partner in South India. Learn about our journey and why thousands trust us with their vacations.
          </p>
        </div>
        <AboutSection />
      </div>
    </Layout>
  );
};

export default About;
