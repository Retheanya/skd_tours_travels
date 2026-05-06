import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/public/Index.tsx";
import Packages from "./pages/public/Packages.tsx";
import About from "./pages/public/About.tsx";
import Testimonials from "./pages/public/Testimonials.tsx";
import Contact from "./pages/public/Contact.tsx";
import Travels from "./pages/public/Travels.tsx";
import Service from "./pages/public/Service.tsx";
import Honeymoon from "./pages/public/Honeymoon.tsx";
import StatePackage from "./pages/public/StatePackage.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import NotFound from "./pages/public/NotFound.tsx";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { ADMIN_PATH } from "@/lib/config";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/travels" element={<Travels />} />
          <Route path="/service" element={<Service />} />
          <Route path="/honeymoon" element={<Honeymoon />} />
          <Route path="/state/:stateName" element={<StatePackage />} />
          <Route path={`/${ADMIN_PATH}/login`} element={<AdminLogin />} />
          <Route 
            path={`/${ADMIN_PATH}/dashboard`} 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
