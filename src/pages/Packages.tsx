import Layout from "@/components/Layout";
import PackagesSection from "@/components/PackagesSection";
import { useEffect } from "react";

const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4" style={{ color: '#212529' }}>
            Our Exclusive <span className="text-primary">Tour Packages</span>
          </h1>
          <p className="max-w-2xl mx-auto font-body" style={{ color: '#212529', opacity: 0.8 }}>
            Discover the best of South India with our carefully curated travel experiences. 
            From backwaters to temples, we cover it all.
          </p>
        </div>
        <PackagesSection />
      </div>
    </Layout>
  );
};

export default Packages;
