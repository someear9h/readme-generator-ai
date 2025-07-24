import axios from "axios";

const API = "http://localhost:8000/api"; // adjust if hosted

export const register = (data: any) =>
  axios.post(`${API}/register`, data);

export const login = async (username: string, password: string) => {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  return axios.post(`${API}/token`, form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const getCurrentUser = (token: string) =>
  axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
