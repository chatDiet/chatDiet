import { Router } from 'express';
import { TrainerController } from '../controllers';

const router = Router();

const trainerController = new TrainerController();

//트레이너 등록(헬스장 사장님만 가능)
router.post('/company/:companyId/trainer', trainerController.create);
//해당 헬스장 트레이너 조회
router.get('/company/:companyId/trainer', trainerController.read);
//트레이너 한명 디테일 조회
router.get('/company/:companyId/trainer/:trainerId', trainerController.detailRead);
//트레이너 삭제(관리자, 헬스장 사장님만 가능)
router.delete('/company/:companyId/trainer/:trainerId', trainerController.delete);
//트레이너 수정(트레이너, 헬스장 사장님만 가능)
router.patch('/company/:companyId/trainer/:trainerId', trainerController.update);

export default router;
