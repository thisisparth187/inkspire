import express from "express";
import Blog from "../models/Blog.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Blog
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, content, featured } = req.body;

    const newBlog = new Blog({
      title,
      description,
      content,
      featured: featured || false,
      author: req.user._id, // store logged-in user
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email avatar"); 
      // only include needed fields
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username email avatar"
    );
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update blog
router.put("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.content = req.body.content || blog.content;
    blog.featured = req.body.featured ?? blog.featured;

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Delete blog
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ msg: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
