import { Router } from 'express';
import { ScheduleController } from '../controllers';

const router = Router();

const scheduleController = new ScheduleController();

router.post('/schedule', scheduleController.postSchedule);
router.get('/schedule/:scheduleId', scheduleController.oneGetSchedule);
router.put('/schedule/:scheduleId', scheduleController.putSchedule);
router.delete('/schedule/:scheduleId', scheduleController.deleteSchedule);

export default router;
