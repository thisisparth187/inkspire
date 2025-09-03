// src/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // adjust if your backend runs elsewhere
});

// Get all blogs
export const getBlogs = () => API.get("/blogs");
