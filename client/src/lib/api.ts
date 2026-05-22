import axios from "axios";

// --------------------------------------------------------
// API Types Definition
// --------------------------------------------------------

export interface CategoryItem {
  title: string;
  items: string[];
}

export interface TourPackage {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  price?: string;
  categories: CategoryItem[];
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HoneymoonPackage {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  price?: string;
  duration?: string;
  images?: string[];
  category?: string;
  subCategory?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inquiry {
  _id?: string;
  name: string;
  mobile: string;
  email: string;
  destination: string;
  message: string;
  status?: "pending" | "viewed" | "resolved";
  createdAt?: string;
  updatedAt?: string;
}

export interface TravelInquiry extends Inquiry {
  pickupDate?: string;
  carType?: string;
  type?: "general" | "car_booking";
  price?: string;
}

export interface TaxiItem {
  _id?: string;
  name: string;
  seater: string;
  description: string;
  price: string;
  pricePerDay?: string;
  imageUrl: string;
  features: string[];
  isPopular?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// --------------------------------------------------------
// Axios Instance & Base Configuration
// --------------------------------------------------------

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject JWT Token if it exists in local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --------------------------------------------------------
// API endpoints methods
// --------------------------------------------------------

export const apiService = {
  // Authentication
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  // Public Tour Packages
  getPackages: async (): Promise<TourPackage[]> => {
    const response = await api.get<TourPackage[]>("/packages");
    return response.data;
  },

  getPackageBySlug: async (slug: string): Promise<TourPackage> => {
    const response = await api.get<TourPackage>(`/packages/${slug}`);
    return response.data;
  },

  // Protected Admin Packages
  createPackage: async (packageData: Omit<TourPackage, "_id" | "createdAt" | "updatedAt">): Promise<TourPackage> => {
    const response = await api.post<TourPackage>("/packages", packageData);
    return response.data;
  },

  updatePackage: async (id: string, packageData: Partial<TourPackage>): Promise<TourPackage> => {
    const response = await api.put<TourPackage>(`/packages/${id}`, packageData);
    return response.data;
  },

  deletePackage: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/packages/${id}`);
    return response.data;
  },

  // Customer Inquiries
  createInquiry: async (inquiryData: Omit<Inquiry, "_id" | "status" | "createdAt" | "updatedAt">): Promise<Inquiry> => {
    const response = await api.post<Inquiry>("/inquiries", inquiryData);
    return response.data;
  },

  getInquiries: async (): Promise<Inquiry[]> => {
    const response = await api.get<Inquiry[]>("/inquiries");
    return response.data;
  },

  updateInquiryStatus: async (id: string, status: "pending" | "viewed" | "resolved"): Promise<Inquiry> => {
    const response = await api.patch<Inquiry>(`/inquiries/${id}`, { status });
    return response.data;
  },

  deleteInquiry: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/inquiries/${id}`);
    return response.data;
  },

  // Travel & Taxi Specific Inquiries
  createTravelInquiry: async (inquiryData: Omit<TravelInquiry, "_id" | "status" | "createdAt" | "updatedAt">): Promise<TravelInquiry> => {
    const response = await api.post<TravelInquiry>("/travel-inquiries", inquiryData);
    return response.data;
  },

  getTravelInquiries: async (): Promise<TravelInquiry[]> => {
    const response = await api.get<TravelInquiry[]>("/travel-inquiries");
    return response.data;
  },

  getUsers: async (): Promise<any[]> => {
    const response = await api.get<any[]>("/auth/users");
    return response.data;
  },

  // Taxi CRUD Operations
  getTaxis: async (): Promise<TaxiItem[]> => {
    const response = await api.get<TaxiItem[]>("/taxis");
    return response.data;
  },

  createTaxi: async (taxiData: Omit<TaxiItem, "_id" | "createdAt" | "updatedAt">): Promise<TaxiItem> => {
    const response = await api.post<TaxiItem>("/taxis", taxiData);
    return response.data;
  },

  updateTaxi: async (id: string, taxiData: Partial<TaxiItem>): Promise<TaxiItem> => {
    const response = await api.put<TaxiItem>(`/taxis/${id}`, taxiData);
    return response.data;
  },

  deleteTaxi: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/taxis/${id}`);
    return response.data;
  },

  // Honeymoon specific API CRUD
  getHoneymoons: async (): Promise<HoneymoonPackage[]> => {
    const response = await api.get<HoneymoonPackage[]>("/honeymoons");
    return response.data;
  },

  createHoneymoon: async (data: Omit<HoneymoonPackage, "_id" | "createdAt" | "updatedAt">): Promise<HoneymoonPackage> => {
    const response = await api.post<HoneymoonPackage>("/honeymoons", data);
    return response.data;
  },

  updateHoneymoon: async (id: string, data: Partial<HoneymoonPackage>): Promise<HoneymoonPackage> => {
    const response = await api.put<HoneymoonPackage>('/honeymoons/' + id, data);
    return response.data;
  },

  deleteHoneymoon: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>('/honeymoons/' + id);
    return response.data;
  },
};

export default api;
