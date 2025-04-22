import express from 'express';
import { agmarknetController, cropHealthController, weatherController,getAllDiagnosis , uploadFileController, schemeListController, schemeDetailsController } from '../controllers/services.controller.js';
const router = express.Router()


router.get('/agmarknet', agmarknetController);
router.get('/weather', weatherController);
router.post('/diagnosis', cropHealthController);
router.get('/all-diagnosis', getAllDiagnosis);
router.post('/upload',uploadFileController);
router.get('/scheme-list',schemeListController);
router.get('/scheme-details',schemeDetailsController);


export default router;