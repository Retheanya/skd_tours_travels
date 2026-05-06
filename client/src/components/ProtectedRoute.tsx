import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ADMIN_PATH } from "@/lib/config";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      toast.error("Access Denied. Authorized personnel only.");
      setIsAllowed(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role === "admin") {
        setIsAllowed(true);
      } else {
        toast.error("Access Denied. You do not have administrator privileges.");
        setIsAllowed(false);
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("Authentication session error. Please log in again.");
      setIsAllowed(false);
    }
  }, []);

  if (isAllowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold tracking-wider text-sm font-sans" style={{ fontFamily: "'Jost', sans-serif" }}>
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to={`/${ADMIN_PATH}/login`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
