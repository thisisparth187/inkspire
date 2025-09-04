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
                description: "AI is transforming industries and daily routines — from healthcare to entertainment.",
                content: `
      <h2>Artificial Intelligence is Here</h2>
      <p>Artificial Intelligence (AI) has <strong>moved beyond science fiction</strong> and into our daily lives.</p>
      <ul>
        <li>Healthcare: AI helps diagnose diseases faster.</li>
        <li>Finance: Fraud detection and smart trading.</li>
        <li>Entertainment: Personalized recommendations on Netflix & Spotify.</li>
      </ul>
      <blockquote>
        "The best way to predict the future is to invent it." — Alan Kay
      </blockquote>
      <p>From <em>self-driving cars</em> to <em>smart assistants</em>, AI is shaping the way we live.</p>
    `,
                author: user._id,
                featured: true,
                image: "/images/ai.jpg",
            },
            {
                title: "Minimalism: The New Lifestyle Trend",
                description: "Why less is more in today’s consumer-driven world.",
                content: `
      <h2>Less is More</h2>
      <p>Minimalism isn’t just a <em>design trend</em> — it’s a lifestyle choice about <strong>intentional living</strong>.</p>
      <p>Benefits of minimalism include:</p>
      <ol>
        <li>Less clutter = less stress</li>
        <li>Saving money by avoiding unnecessary purchases</li>
        <li>Focusing on meaningful relationships & experiences</li>
      </ol>
      <p><em>"You don’t need more space, you need less stuff."</em></p>
    `,
                author: user._id,
                featured: false,
                image: "/images/minimalism.jpg",
            },
            {
                title: "Top 10 Travel Destinations in 2025",
                description: "Discover the most breathtaking destinations to explore this year.",
                content: `
      <h2>Where Will 2025 Take You?</h2>
      <p>Traveling in 2025 opens new doors to <strong>sustainable eco-tourism</strong> and hidden gems worldwide.</p>
      <ul>
        <li>Bali, Indonesia – Yoga retreats & surfing</li>
        <li>Kyoto, Japan – Cherry blossoms & ancient temples</li>
        <li>Amalfi Coast, Italy – Cliffs and coastal beauty</li>
        <li>Cape Town, South Africa – Mountains meet the ocean</li>
        <li>Iceland – Northern lights & breathtaking landscapes</li>
      </ul>
      <p>Pack your bags and get ready for <em>life-changing adventures</em> 🌍</p>
    `,
                author: user._id,
                featured: true,
                image: "/images/travel.jpg",
            },
            {
                title: "The Future of Remote Work",
                description: "How hybrid models are reshaping careers and companies.",
                content: `
      <h2>Work From Anywhere</h2>
      <p>Remote work has become <strong>the new normal</strong>, but companies are now adopting <em>hybrid models</em>.</p>
      <p>Advantages:</p>
      <ul>
        <li>Flexibility for employees</li>
        <li>Access to global talent</li>
        <li>Lower office costs</li>
      </ul>
      <p>Challenges remain: time zone differences, communication gaps, and maintaining culture.</p>
      <p><strong>Bottom line:</strong> The workplace of the future is <em>location-independent</em>.</p>
    `,
                author: user._id,
                featured: false,
                image: "/images/remote.jpg",
            },
            {
                title: "Health & Wellness in the Digital Age",
                description: "Balancing technology with mindfulness and healthy living.",
                content: `
      <h2>Digital Balance</h2>
      <p>We live in an era where <strong>wearable tech</strong> tracks every heartbeat, step, and hour of sleep.</p>
      <p>But is it making us healthier? Experts say it depends on <em>balance</em>:</p>
      <ul>
        <li>Use apps to build healthy habits, not obsessions.</li>
        <li>Unplug for mental clarity — digital detox matters.</li>
        <li>Leverage tech for meditation & mindfulness (Headspace, Calm).</li>
      </ul>
      <blockquote>
        "Almost everything will work again if you unplug it for a few minutes — including you." — Anne Lamott
      </blockquote>
    `,
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
