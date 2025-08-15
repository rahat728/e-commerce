import userModel from "../models/userModel.js";
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity = 1 } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = {};
    }

    if (userData.cartData[itemId][size]) {
      userData.cartData[itemId][size] += quantity;
    } else {
      userData.cartData[itemId][size] = quantity;
    }

    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log("Error in addToCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = {};
    }

    userData.cartData[itemId][size] = quantity;

    userData.markModified('cartData'); // ✅ Needed for nested object updates
    await userData.save();

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log("Error in updateCart:", error);
    res.json({ success: false, message: error.message });
  }
};



const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // comes from middleware
    const userData = await userModel.findById(userId);

    // ✅ Add null check
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { addToCart, updateCart, getUserCart }