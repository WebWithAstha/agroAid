import express from 'express';
import {
  createCrop,
  getAllCrops,
  getUserCrops,
  deleteCrop,
  getCropById
} from '../controllers/crop.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { validateCreateCrop } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/create', isAuthenticated,validateCreateCrop, createCrop);

router.get('/all', getAllCrops);

router.get('/my-crops', isAuthenticated, getUserCrops);

router.delete('/:id',isAuthenticated,deleteCrop);
router.get('/:id',isAuthenticated,getCropById);

export default router;
