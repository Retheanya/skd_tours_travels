import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-bold font-display text-primary/20 mb-4 tracking-tighter">404</h1>
          <h1 className="text-3xl font-bold font-display text-secondary-foreground mb-4">You've reached a dead end</h1>
          <p className="text-secondary-foreground/70 font-body mb-8">
            The destination you're looking for doesn't exist or has been moved to a new secret location.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gradient-primary text-primary-foreground px-8 py-3 rounded-full font-bold font-body hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
