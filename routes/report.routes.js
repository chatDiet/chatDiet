import { Router } from 'express';
import { ReportController } from '../controllers';

const router = Router();
const reportController = new ReportController();

export default router;
