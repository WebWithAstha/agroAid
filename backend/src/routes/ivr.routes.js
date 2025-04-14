import express from 'express';
import { handleRecording, startCall } from '../controllers/ivr.controller.js';
import { verifyOtpAndAuthenticate } from '../controllers/auth.controller.js';
const router = express.Router()


router.post('/start-call', startCall);
router.post('/handle-recording', handleRecording);


export default router;