import express from 'express';
import { assistQuery } from '../controllers/assist.controller.js';
const router = express.Router()


router.post('/query', assistQuery);

export default router;