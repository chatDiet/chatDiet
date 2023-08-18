import { Router } from 'express';
import { CalenderController } from '../controllers';

const router = Router();

const calenderController = new CalenderController();

export default router;
