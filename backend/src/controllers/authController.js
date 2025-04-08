// controllers/sendOtpController.js
import crypto from 'crypto';
import { sendSMS } from '../services/twilloSms.service.js';
import { Otp } from '../models/otpModel.js';
import { User } from '../models/userModel.js';

export const sendOtpController = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    try {
        await sendSMS(phone, `Your OTP code is: ${otp}`);

        await Otp.deleteMany({ phone });

        await Otp.create({
            phone,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully.',
        });
    } catch (error) {
        console.error('Failed to send OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP. Please try again later.',
        });
    }
};

export const verifyOtpController = async (req, res) => {
    const { phone, otp } = req.body;

    const record = await Otp.findOne({ phone });

    if (!record) {
        return res.status(400).json({ success: false, message: 'OTP not found or expired.' });
    }

    if (record.expiresAt < new Date()) {
        await Otp.deleteOne({ _id: record._id });
        return res.status(400).json({ success: false, message: 'OTP has expired.' });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }

    await Otp.deleteOne({ _id: record._id });

    let user = await User.findOne({ phone });
    if (!user) {
        user = await User.create({ phone, isVerified: true });
    } else {
        user.isVerified = true;
        await user.save();
    }

    res.status(200).json({user, success: true, message: 'OTP verified successfully.' });
};
