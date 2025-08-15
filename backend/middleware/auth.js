import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Incoming token:", authHeader);

  // Check for missing or malformed header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized: token missing or invalid format" });
  }

  const token = authHeader.split(" ")[1]; // Extract actual token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log("Decoded user ID:", decoded.id);

    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
