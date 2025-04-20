import express from 'express';
import { agmarknetController, cropHealthController, weatherController,getAllDiagnosis , uploadFileController } from '../controllers/services.controller.js';
const router = express.Router()


router.get('/agmarknet', agmarknetController);
router.get('/weather', weatherController);
router.post('/diagnosis', cropHealthController);
router.get('/all-diagnosis', getAllDiagnosis);
router.post('/upload',uploadFileController)


export default router;