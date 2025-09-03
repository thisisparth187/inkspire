import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },              // Blog Title
    description: { type: String, required: true },        // Blog Description
    content: { type: String, required: true },            // Blog Content
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    featured: { type: Boolean, default: false },          // Mark as Featured
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema)