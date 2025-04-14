import express from 'express';
import { handleInput, handleRecording, startCall, voiceMenu } from '../controllers/ivr.controller.js';
import { verifyOtpAndAuthenticate } from '../controllers/auth.controller.js';
const router = express.Router()


router.post('/start-call', startCall);
router.post("/voice-menu", voiceMenu);
router.post("/handle-input", handleInput);
router.post('/handle-recording', handleRecording);


export default router;