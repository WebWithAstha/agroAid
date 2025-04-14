import express from 'express';
import {processMessage, selectLanguage, startCall, voiceMenu } from '../controllers/ivr.controller.js';
const router = express.Router()


router.get('/start-call', startCall);
router.post("/ivr/voice-menu", voiceMenu);
router.post("/ivr/select-language", selectLanguage);
router.post("/ivr/process-message", processMessage);


export default router;