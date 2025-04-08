// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    // Add more fields later (email, password, profilePic, etc.)
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
