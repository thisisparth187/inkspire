import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js"; // adjust path if server.js moved
import authRoutes from "./src/routes/auth.js";
import blogRoutes from "./src/routes/blog.js"; // you already had this

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.get("/", (_, res) => res.send("API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Error handler (optional minimal)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
