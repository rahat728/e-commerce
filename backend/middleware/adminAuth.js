import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
  try {
    // Fix here 👇
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1]; // get actual token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Headers:', req.headers);
    console.log('Decoded token:', token_decode);

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export default adminAuth