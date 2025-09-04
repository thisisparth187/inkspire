import axios from "axios";

const API = axios.create({
  baseURL: "https://inkspire-6tsq.onrender.com",
});

// Automatically attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Update Blog
export const updateBlog = (id, blogData) => API.put(`/blogs/${id}`, blogData);

// Create Blog
export const createBlog = (blogData) => API.post("/blogs", blogData);

// Get Blogs
export const getBlogs = () => API.get("/blogs");

export const getBlog = (id) => API.get(`/blogs/${id}`);

export const deleteBlog = (id) => API.delete(`/blogs/${id}`);