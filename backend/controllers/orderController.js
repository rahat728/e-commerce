import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';
import 'dotenv/config';

const currency = 'inr';
const deliveryCharge = 10;

// Check if STRIPE_SECRET_KEY exists
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Check if Razorpay credentials exist
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are required');
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address, token } = req.body;
    const {origin} = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options,(error,order) => {
      if (error) {
        console.error("Razorpay order creation failed:", error);
        return res.json({ success: false, message: "Razorpay order creation failed" });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const verifyRazoray = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid') {
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success: true, message: "Payment successful"});
    } else {
      res.json({success: false, message: "Payment failed"});
    }

  }
  catch (error) {
    console.log("Error verifying Razorpay payment:", error);
    res.json({ success: false, message: error.message });
  }
};
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address, token } = req.body;
    const {origin} = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Process Stripe payment
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1,
    })
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const {orderId, success, userId} = req.body
  try {
    if (success === "true") {
      // Fix: Add curly braces around the update object
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success:true, orders});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazoray
};
