import express from 'express';
import { agmarknetController, cropHealthController, weatherController } from '../controllers/servicesController.js';
const router = express.Router()


router.get('/agmarknet', agmarknetController);
router.get('/weather', weatherController);
router.post('/crop-health', cropHealthController);


export default router;