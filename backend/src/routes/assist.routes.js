import express from 'express';
import { assistQuery,getAllQuery } from '../controllers/assist.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const router = express.Router()


router.post('/query',isAuthenticated, assistQuery);
router.get('/user-queries',isAuthenticated, getAllQuery);

export default router;