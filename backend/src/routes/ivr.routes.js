import express from 'express';
import { handleInput, handleRecording, processMessage, selectLanguage, startCall, voiceMenu } from '../controllers/ivr.controller.js';
const router = express.Router()


router.get('/start-call', startCall);
app.post("/ivr/voice-menu", voiceMenu);
app.post("/ivr/select-language", selectLanguage);
app.post("/ivr/process-message", processMessage);


export default router;