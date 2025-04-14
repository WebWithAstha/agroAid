import { updateDetails, signinAndSignup, verifyOtpAndAuthenticate, fethcUser } from '../controllers/auth.controller.js';
import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const router = express.Router()

// sending otp just
router.post('/signin-signup', signinAndSignup);

// verify otp and authenticate user
router.post('/verify-otp', verifyOtpAndAuthenticate);

// update user details
router.post('/update',isAuthenticated, updateDetails);

//current user details
router.get('/current-user',isAuthenticated, fethcUser);

export default router;