// controllers/sendOtpController.js
import crypto from 'crypto';
import { sendSMS } from '../services/twilloSms.service.js';
import { Otp } from '../models/otpModel.js';
import { User } from '../models/userModel.js';
import {
    successResponse,
    badRequest,
    serverError,
    notFoundResponse,
} from '../utils/responseHandler.js';
import { setCookies } from '../middlewares/auth.middleware.js';

export const sendOtpController = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return badRequest(res, 'Phone number is required.');
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    try {
        let user = await User.findOne({ phone });
        if (user) {
            return badRequest(res, 'User already exists with this number.');
        }
        await sendSMS(phone, `Your OTP code is: ${otp}`);
        await Otp.deleteMany({ phone });
        await Otp.create({
            phone,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });
        return successResponse(res, {}, 'OTP sent successfully.');
    } catch (error) {
        console.error('Failed to send OTP:', error);
        return serverError(res, error);
    }
};

export const verifyOtpController = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
        return badRequest(res, 'Phone number and OTP are required.');
    }
    try {
        const record = await Otp.findOne({ phone });
        if (!record) {
            return notFoundResponse(res, 'OTP not found or expired.');
        }
        if (record.expiresAt < new Date()) {
            await Otp.deleteOne({ _id: record._id });
            return badRequest(res, 'OTP has expired.');
        }
        if (record.otp !== otp) {
            return badRequest(res, 'Invalid OTP.');
        }
        await Otp.deleteOne({ _id: record._id });
        let user = await User.create({ phone });
        const { accessToken, refreshToken } = await user.generateTokens();
        await setCookies(res, accessToken, refreshToken);
        await user.save();

        return successResponse(res, user, 'OTP verified successfully.');
    } catch (error) {
        console.error('OTP verification failed:', error);
        return serverError(res, error);
    }
};
