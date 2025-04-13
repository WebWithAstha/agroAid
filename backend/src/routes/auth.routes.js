import { register, sendOtp, verifyOtpController } from '../controllers/auth.controller.js';
import express from 'express';
const router = express.Router()


router.post('/send-otp', sendOtp);
router.post('/register', register);
router.post('/verify-otp', verifyOtpController);


export default router;