import express from 'express';
import {
  createCrop,
  getAllCrops,
  getUserCrops
} from '../controllers/crop.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { validateCreateCrop } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/create', isAuthenticated,validateCreateCrop, createCrop);

router.get('/all', getAllCrops);

router.get('/my-crops', isAuthenticated, getUserCrops);

export default router;
