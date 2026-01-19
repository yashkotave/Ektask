import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ektask.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";
const JWT_SECRET = process.env.JWT_SECRET || "ektask_secret_key";

// ==================== ROUTES ====================

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Ektask Backend API is running!" });
});

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Check credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Generate JWT token
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        email,
        role: "admin",
      },
    });
  }

  // Invalid credentials
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Verify Admin Token (Protected Route)
app.get("/api/admin/verify", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    admin: req.admin,
  });
});

// Admin Logout (Optional - mainly for frontend state management)
app.post("/api/admin/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Admin Email: ${ADMIN_EMAIL}`);
});
