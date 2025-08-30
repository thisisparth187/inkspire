import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // match your backend

// Register user
export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

// Login user
export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};
