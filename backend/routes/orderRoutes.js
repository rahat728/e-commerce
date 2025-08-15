import express from 'express';
import { 
  placeOrder, 
  placeOrderRazorpay, 
  placeOrderStripe, 
  allOrders, 
  userOrders, 
  updateStatus,
  verifyStripe,
  verifyRazoray // ✅ fixed
} from '../controllers/orderController.js'; // ✅ fixed

import adminAuth from '../middleware/adminAuth.js'; // ✅ fixed
import authUser from '../middleware/auth.js'; // ✅ fixed

const orderRouter = express.Router();

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/stripe', authUser, placeOrderStripe);

orderRouter.post('/userorders', authUser, userOrders);

orderRouter.post('/verifystripe', authUser, verifyStripe);
orderRouter.post('/verifyrazorpay', authUser, verifyRazoray); // ✅ fixed
export default orderRouter;
