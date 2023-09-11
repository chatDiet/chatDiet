import { Router } from 'express';
import { ScheduleController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const scheduleController = new ScheduleController();

// 스케줄 생성
router.post('/schedule', isAuth, scheduleController.postSchedule);

// 스케줄 전체 조회
router.get('/schedules', isAuth, scheduleController.allGetSchedule);

// 스케줄 상세 조회
router.get('/schedules/:scheduleId', isAuth, scheduleController.oneGetSchedule);

// 스케줄 수정
router.put('/schedules/:scheduleId', isAuth, scheduleController.putSchedule);

// 스케줄 삭제
router.delete('/schedules/:scheduleId', isAuth, scheduleController.deleteSchedule);

export default router;
