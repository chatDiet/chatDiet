import { Router } from 'express';
import { ReportController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const reportController = new ReportController();

router.get('/reports', isAuth, reportController.getAllReport);
router.post('/report', isAuth, reportController.createReport);
router.put('/reports/:reportId', isAuth, reportController.updateReport);
router.delete('/reports/:reportId', isAuth, reportController.deleteReport);

export default router;
