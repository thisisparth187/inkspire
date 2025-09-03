// const mongoose = require("mongoose");
// const Blog = require("./models/Blog"); // adjust path to your Blog model
// const User = require("./models/User"); // assuming you already have users

import mongoose from "mongoose";
import Blog from './src/models/Blog.js';
import User from './src/models/User.js';

const MONGO_URI = "mongodb+srv://parthmpune:parth123@blogcluster.yiuhuc.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster"; // replace with your DB name

const seedBlogs = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to DB ✅");

        // pick first user as author
        const user = await User.findOne();
        if (!user) {
            console.log("❌ No users found. Please register a user first.");
            process.exit();
        }

        const blogs = [
            {
                title: "The Rise of AI in Everyday Life",
                description:
                    "AI is transforming industries and daily routines — from healthcare to entertainment.",
                content: "Artificial Intelligence has moved beyond science fiction into our lives...",
                author: user._id,
                featured: true,
                image: "/images/ai.jpg",
            },
            {
                title: "Minimalism: The New Lifestyle Trend",
                description: "Why less is more in today’s consumer-driven world.",
                content: "Minimalism is more than a design trend — it’s a way of living...",
                author: user._id,
                featured: false,
                image: "/images/minimalism.jpg",
            },
            {
                title: "Top 10 Travel Destinations in 2025",
                description: "Discover the most breathtaking destinations to explore this year.",
                content: "Traveling in 2025 has opened doors to eco-tourism and sustainable travel...",
                author: user._id,
                featured: true,
                image: "/images/travel.jpg",
            },
            {
                title: "The Future of Remote Work",
                description: "How hybrid models are reshaping careers and companies.",
                content: "Remote work has become the norm, but companies are adapting hybrid models...",
                author: user._id,
                featured: false,
                image: "/images/remote.jpg",
            },
            {
                title: "Health & Wellness in the Digital Age",
                description: "Balancing technology with mindfulness and healthy living.",
                content: "Our devices track our steps, sleep, and heart rate — but are we healthier?",
                author: user._id,
                featured: false,
                image: "/images/wellness.jpg",
            },
        ];

        await Blog.deleteMany({});
        await Blog.insertMany(blogs);

        console.log("🌱 Blogs seeded successfully!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedBlogs();
