import { Router } from 'express';
import { ScheduleController } from '../controllers';

const router = Router();

const scheduleController = new ScheduleController();

export default router;
