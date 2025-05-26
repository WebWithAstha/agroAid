import express from 'express';
import {nextAction, processMessage, recordComplete, selectLanguage, startCall, voiceMenu,fetchRecordedUrl } from '../controllers/ivr.controller.js';
const router = express.Router()


router.get('/start-call', startCall);
router.post("/voice-menu", voiceMenu);
router.post("/select-language", selectLanguage);
router.post("/fetch-recorded-url", fetchRecordedUrl);
router.post("/process-message", processMessage);
router.post("/next-action", nextAction);
router.post("/record-complete", recordComplete);



export default router;