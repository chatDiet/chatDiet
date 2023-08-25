import { Router } from 'express';
import { ScheduleController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const scheduleController = new ScheduleController();

router.post('/schedule', scheduleController.postSchedule);
router.get('/schedule/:scheduleId', scheduleController.oneGetSchedule);
router.put('/schedule/:scheduleId', scheduleController.putSchedule);
router.delete('/schedule/:scheduleId', scheduleController.deleteSchedule);

export default router;
