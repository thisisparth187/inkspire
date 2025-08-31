import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "", // will hold HTML from Quill
    author: "",
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

  // Quill has its own onChange handler → get the value directly
  const handleQuillChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Created:", formData);
    // TODO: send to backend later with axios.post()
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

        {/* Quill Editor for Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleQuillChange}
            className="rounded-lg custom-quill"
          />
        </div>


        {/* Author */}
        <div>
          <label className="block mb-2 font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Upload Avatar */}
        <div>
          <label className="block mb-2 font-medium">Upload Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
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
