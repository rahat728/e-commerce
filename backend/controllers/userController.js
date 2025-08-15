// backend/controllers/userController.js
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import admin from "../config/firebaseAdmin.js"; // <-- make sure this exists

const createToken = (id, extra = {}) => {
  // keep your existing behavior (no expiry); add extra fields if needed
  return jwt.sign({ id, ...extra }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // normalize email
    email = String(email || "").toLowerCase();

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    if (!user.password) {
      // For Google-created accounts without a local password
      return res.json({ success: false, message: "Use Google sign-in for this account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "Incorrect Password" });
  } catch (error) {
    return res.json({ success: false, message: "Invalid credentials" });
  }
};

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // normalize email
    email = String(email || "").toLowerCase();

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if ((password || "").length < 8) {
      return res.json({ success: false, message: "please enter a strong password" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// POST /api/auth/google
// body: { idToken }
const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) {
      return res.status(400).json({ success: false, message: "Missing idToken" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture, email_verified } = decoded || {};

    if (!email || !email_verified) {
      return res.status(401).json({ success: false, message: "Google email not verified" });
    }

    const normEmail = String(email).toLowerCase();
    let user = await userModel.findOne({ email: normEmail });

    if (!user) {
      // If your schema requires a password, generate a random one to satisfy validation
      const randomPassword = Math.random().toString(36).slice(-12);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(randomPassword, salt);

      user = await userModel.create({
        name: name || normEmail.split("@")[0],
        email: normEmail,
        password: hashed, // for schemas requiring password
        provider: "google",
        firebaseUid: uid,
        avatar: picture,
      });
    } else {
      // Backfill fields if not present; keep existing values if already set
      let changed = false;
      if (!user.provider) {
        user.provider = "google";
        changed = true;
      }
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
        changed = true;
      }
      if (!user.avatar && picture) {
        user.avatar = picture;
        changed = true;
      }
      if (changed) await user.save();
    }

    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.error("googleAuth error:", error);
    return res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};

// Optional: Google Admin auth (if you want admin panel login via Google)
// POST /api/admin/auth/google
// body: { idToken }
// Uses ADMIN_EMAILS (comma-separated) or fallback ADMIN_EMAIL for allowlist
const googleAdminAuth = async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) {
      return res.status(400).json({ success: false, message: "Missing idToken" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);
    const email = decoded?.email ? decoded.email.toLowerCase() : null;

    const allowed = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!email || !allowed.includes(email)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // issue an admin token shaped similarly to your existing adminLogin
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.error("googleAdminAuth error:", error);
    return res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};

export { loginUser, registerUser, adminLogin, googleAuth, googleAdminAuth };