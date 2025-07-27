import axios from "axios";
import { API_BASE_URL } from "../util";

// Register user
export const register = (data: any) => {
  return axios.post(`${API_BASE_URL}/register`, data);
};

// Login user and get token
export const login = async (username: string, password: string) => {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  return axios.post(`${API_BASE_URL}/token`, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

// Get current user data using token
export const getCurrentUser = (token: string) => {
  return axios.get(`${API_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
