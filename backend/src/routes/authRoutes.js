import { sendOtpController, verifyOtpController } from '../controllers/authController.js';
import express from 'express';
const router = express.Router()


router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);


export default router;