// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Update this to match your backend server URL
  withCredentials: true,
});

export default axiosInstance;
