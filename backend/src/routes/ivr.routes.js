import express from 'express';
import { startCall } from '../controllers/ivr.controller.js';
import { verifyOtpController } from '../controllers/auth.controller.js';
const router = express.Router()


router.post('/start-call', startCall);
router.post('/handle-recording', verifyOtpController);


export default router;