import { Router } from 'express';
import { TrainerController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const trainerController = new TrainerController();

//트레이너 등록(헬스장 사장님만 가능)
router.post('/companys/:companyId/trainer', isAuth, trainerController.create);
//해당 헬스장 트레이너 조회
router.get('/companys/:companyId/trainer', trainerController.read);
//트레이너 한명 디테일 조회
router.get('/companys/:companyId/trainers/:trainerId', trainerController.detailRead);
//트레이너 삭제(관리자, 헬스장 사장님만 가능)
router.delete('/companys/:companyId/trainers/:trainerId', isAuth, trainerController.delete);
//트레이너 수정(트레이너, 헬스장 사장님만 가능)
router.patch('/companys/:companyId/trainers/:trainerId', isAuth, trainerController.update);

export default router;
