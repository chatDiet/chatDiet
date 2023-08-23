import { Router } from 'express';
import { ReportController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const reportController = new ReportController();

export default router;
