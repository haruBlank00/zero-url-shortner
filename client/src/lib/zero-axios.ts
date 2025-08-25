import axios from "axios";

export const zeroAxios = axios.create({
  baseURL: "http://localhost:5555",
});

zeroAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
