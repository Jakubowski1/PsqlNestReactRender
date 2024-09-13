import axios from "axios";

const api = axios.create({
  baseURL: "https://nestapi-3.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true,
});

export default api;
