import { createApiWithAuth } from "./axiosInstance";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authApi = createApiWithAuth(`${BASE_URL}/api/auth`);
export const authService = {
  login: async (email, password) => {
    const response = await authApi.post("/login", { email, password });
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await authApi.post("/register", { name, email, password });
    return response.data;
  },
  verifyToken: async (token) => {
    const response = await authApi.get("/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
