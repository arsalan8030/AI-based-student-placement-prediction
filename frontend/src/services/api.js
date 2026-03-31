import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API = axios.create({
  baseURL
});

export const predictPlacement = (data) => API.post("/predict", data);