// api.js (Axios instance configuration file)
import axios from "axios";

const api = axios.create({
  baseURL: "https://nestapi-3.onrender.com", // Set the base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true, // Include credentials like cookies in requests
});

export default api;
