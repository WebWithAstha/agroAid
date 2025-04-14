// controllers/sendOtpController.js
import crypto from "crypto";
import { sendSMS } from "../services/twilloSms.service.js";
import { Otp } from "../models/otpModel.js";
import { User } from "../models/userModel.js";
import {
  successResponse,
  badRequest,
  serverError,
  notFoundResponse,
} from "../utils/responseHandler.js";
import { setCookies } from "../middlewares/auth.middleware.js";
import { log } from "console";
// import { sendOtp } from "../utils/otp.js";

export const signinAndSignup = async (req, res) => {
  try {
    if (!req.body || !req.body.phone) return badRequest(res, "Phone number is required.");

    const { phone } = req.body;

    const otp = crypto.randomInt(100000, 999999).toString();

    await sendSMS(phone, `Your OTP code is: ${otp}`);

    await Otp.deleteMany({ phone });

    await Otp.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    return successResponse(res, {}, "OTP sent successfully.");

  } catch (error) {
    console.log(error);
    return serverError(res, error);
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { ...updates } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return notFoundResponse(res, "User not found.");
    }

    // Define allowed fields to update
    const allowedFields = ['name', 'location', 'language', 'mainCrops', 'profile'];

    // Filter and assign only allowed fields
    for (const key of Object.keys(updates)) {
      if (allowedFields.includes(key)) {
        if (key === 'mainCrops' && Array.isArray(updates[key])) {
          user[key] = updates[key]; // ✅ Direct assignment
        } else {
          user[key] = updates[key];
        }
      }
    }

    await user.save();

    return successResponse(res, user, "User details updated successfully.");
  } catch (error) {
    console.error("Error updating user details:", error);
    return serverError(res, error);
  }
};


export const verifyOtpAndAuthenticate = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return badRequest(res, "Phone number and OTP are required.");
  }
  try {
    const record = await Otp.findOne({ phone });

    if (!record) {
      return notFoundResponse(res, "OTP not found or Expired.");
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: record._id });
      return badRequest(res, "OTP has expired.");
    }

    if (record.otp !== otp) {
      return badRequest(res, "Invalid OTP.");
    }

    await Otp.deleteOne({ _id: record._id });
    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone });

    const { accessToken, refreshToken } = await user.generateTokens();

    await setCookies(res, accessToken, refreshToken);

    await user.save();

    return successResponse(res, user, "OTP verified successfully.");

  } catch (error) {

    console.error("OTP verification failed:", error);
    return serverError(res, error);

  }
};


export const fethcUser = async (req, res) => {
  try {
    const user = req.user;
    return successResponse(res, user, "User details fetched successfully.");
  } catch (error) {
    console.log(error);
    return serverError(res, error);
  }
};