import { sendOtpController, verifyOtpController } from '../controllers/authController.js';
import express from 'express';
const router = express.Router()


router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);
router.get('/v', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Route is working'
    })
});

export default router;