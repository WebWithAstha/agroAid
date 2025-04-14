import express from 'express';
import {processMessage, selectLanguage, startCall, voiceMenu } from '../controllers/ivr.controller.js';
const router = express.Router()


router.get('/start-call', startCall);
router.post("/voice-menu", voiceMenu);
router.post("/select-language", selectLanguage);
router.post("/process-message", processMessage);


export default router;