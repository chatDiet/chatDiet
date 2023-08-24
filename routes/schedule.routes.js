import { Router } from 'express';
import { ScheduleController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const scheduleController = new ScheduleController();

export default router;
