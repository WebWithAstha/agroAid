// models/User.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { config } from '../config/config';

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    refreshToken: String
  },
  { timestamps: true }
);

userSchema.methods.generateTokens =  async function () {
  const accessToken = jwt.sign({ id: this._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: this._id }, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN });
  this.refreshToken = refreshToken;
  await this.save();
  return { accessToken, refreshToken };
};
userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({ id: this._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
  return accessToken;
}
userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = jwt.sign({ id: this._id }, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN });
  this.refreshToken = refreshToken;
  await this.save();
  return refreshToken;
}


export const User = mongoose.model('User', userSchema);
