import { Router } from 'express';
import { ReportController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const reportController = new ReportController();

// 신고 조회
router.get('/reports', isAuth, reportController.getAllReport);
// 신고 생성
router.post('/report', isAuth, reportController.createReport);
// 신고 수정
router.put('/reports/:reportId', isAuth, reportController.updateReport);
// 신고 삭제
router.delete('/reports/:reportId', isAuth, reportController.deleteReport);

export default router;
