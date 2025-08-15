// backend/routes/userRoute.js
import express from 'express';
import {
  loginUser,
  registerUser,
  adminLogin,
  googleAuth,
  googleAdminAuth,
} from '../controllers/userController.js';

const userRouter = express.Router();

// Email/password auth
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);

// Admin (email/password)
userRouter.post('/admin', adminLogin);

// Google auth (store app)
userRouter.post('/auth/google', googleAuth);

// Google admin auth (admin panel)
userRouter.post('/admin/auth/google', googleAdminAuth);

export default userRouter;