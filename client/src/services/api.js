import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createBlog = (blogData) => API.post("/blogs", blogData);
export const getBlogs = () => API.get("/blogs");
