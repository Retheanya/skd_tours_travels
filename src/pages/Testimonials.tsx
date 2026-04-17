import Layout from "@/components/Layout";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useEffect } from "react";

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary-foreground mb-4">
            What Our <span className="text-primary">Travelers Say</span>
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto font-body">
            Read authentic stories and feedback from people who have explored South India with us.
          </p>
        </div>
        <TestimonialsSection />
      </div>
    </Layout>
  );
};

export default Testimonials;
