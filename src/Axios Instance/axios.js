import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "https://rishta-server-a12.vercel.app/", 
  withCredentials: true,
});

// ✅ Request Interceptor: Add Firebase Token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken(); // wait for token
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("🔥 Axios token error:", error);
      return config; // fallback
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🔐 Unauthorized - Token might be missing or expired.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
