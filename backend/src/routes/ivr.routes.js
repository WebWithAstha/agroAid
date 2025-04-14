import express from 'express';
import { handleInput, handleRecording, startCall, voiceMenu } from '../controllers/ivr.controller.js';
const router = express.Router()


router.get('/start-call', startCall);
router.get("/voice-menu", voiceMenu);
router.post("/handle-input", handleInput);
router.post('/handle-recording', handleRecording);


export default router;