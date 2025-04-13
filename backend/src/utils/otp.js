import { Otp } from "../models/otpModel.js";

export const sendOtp = async (phone) => {
  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    await sendSMS(phone, `Your OTP code is: ${otp}`);
    await Otp.deleteMany({ phone });
    await Otp.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
  } catch (error) {
   console.error("Failed to send OTP:", error);
       return serverError(res, error);
  }
};
