import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Helper to create JWT
const signToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

/**
 * @route   POST /api/auth/register
 * @desc    Register user
 * @access  Public
 */
router.post(
    "/register",
    [
        body("username").trim().isLength({ min: 2 }).withMessage("Name is too short"),
        body("email").isEmail().withMessage("Valid email required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("avatar")
            .notEmpty()
            .withMessage("Select an avatar"),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { username, email, password, avatar } = req.body;

        try {
            const existing = await User.findOne({ email: email.toLowerCase() });
            if (existing)
                return res.status(409).json({ message: "Email already in use" });

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await User.create({
                username,
                email: email.toLowerCase(),
                password: hash,
                avatar: avatar,
            });

            const token = signToken(user._id);

            return res.status(201).json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                },
                token,
            });
        } catch (err) {
            console.error("Register error:", err.message);
            console.log("REQ BODY:", req.body);
            return res.status(500).json({ message: "Server error" });
        }
    }
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email.toLowerCase() }).select(
                "+password"
            );
            if (!user) return res.status(401).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(401).json({ message: "Invalid credentials" });

            const token = signToken(user._id);

            return res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            });
        } catch (err) {
            console.error("Login error:", err.message);
            return res.status(500).json({ message: "Server error" });
        }
    }
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get("/me", protect, async (req, res) => {
    // req.user is set by protect middleware
    return res.json({ user: req.user });
});

export default router;
