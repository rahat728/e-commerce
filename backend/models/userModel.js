// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    // Only required for local (email/password) accounts
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    firebaseUid: { type: String }, // set when user signs in with Google
    avatar: { type: String }, // optional profile image from Google
    cartData: { type: Object, default: {} },
  },
  {
    minimize: false, // keep empty objects like cartData: {}
    timestamps: true,
  }
);

// Hide password when converting to JSON
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;