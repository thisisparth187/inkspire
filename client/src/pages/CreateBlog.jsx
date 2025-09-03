import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    featured: false,
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("description", formData.description);
      blogData.append("content", formData.content);
      blogData.append("featured", formData.featured);

      const res = await axios.post("http://localhost:5000/api/blogs", blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Blog Created:", res.data);
      alert("Blog created successfully!");

      // reset form
      setFormData({
        title: "",
        description: "",
        content: "",
        author: "",
        featured: false,
        avatar: null,
      });
    } catch (err) {
      console.error("❌ Error creating blog:", err);
      alert("Failed to create blog!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Create New Blog</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-base-200 p-6 rounded-xl shadow"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Blog Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Blog Description</label>
          <input
            type="text"
            name="description"   // ✅ fixed here
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleQuillChange}
            className="rounded-lg custom-quill"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <label>Mark as Featured</label>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
