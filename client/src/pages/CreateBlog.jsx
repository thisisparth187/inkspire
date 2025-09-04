import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { createBlog, deleteBlog, updateBlog } from "../services/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Alert from "../components/Alert";

const CreateBlog = ({ existingBlog }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: existingBlog?.title || "",
    description: existingBlog?.description || "",
    content: existingBlog?.content || "",
    featured: existingBlog?.featured || false,
  });
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
  };

  // ✅ Check auth & load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDelete = async () => {
    if (existingBlog) {
      // ✅ Update existing blog
      const res = await deleteBlog(existingBlog._id, formData);
      showAlert("Blog Deleted!", "success");
      console.log("✅ Blog Deleted:", res.data);

    } else {
      setTimeout(() => navigate("/profile"), 3000); // back to profile after cancel new blog
    }
  };

  const handleNavigation = () => navigate("/profile");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existingBlog) {
        // ✅ Update existing blog
        const res = await updateBlog(existingBlog._id, formData);
        showAlert("Blog updated successfully!", "success");
        console.log("✅ Blog Updated:", res.data);

      } else {
        // ✅ Create new blog
        const res = await createBlog(formData);
        showAlert("Blog created successfully!", "success");
        console.log("✅ Blog Created:", res.data);

      }
    } catch (err) {
      console.error("❌ Error saving blog:", err);
      showAlert("Failed to save blog!", "error");
      navigate("/profile")
    }
  };


  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {existingBlog ? "Edit Blog" : "Create New Blog"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-base-200 p-6 rounded-xl shadow"
      >
        {/* Title */}
        <InputField
          label="Blog Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        {/* Description */}
        <InputField
          label="Blog Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
            className="rounded-lg custom-quill"
          />
        </div>

        {/* Featured */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span>Mark as Featured</span>
        </label>

        {/* Submit + Cancel */}
        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary flex-1">
            {existingBlog ? "Update Blog" : "Create Blog"}
          </button>

          <Button
            name={existingBlog ? "Delete" : "Cancel"}
            onConfirm={handleDelete}
          />
        </div>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => {
              setAlert(null);
              if (alert.type === "success") handleNavigation();
            }}
          />
        )}

      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full"
      required
    />
  </div>
);

export default CreateBlog;
