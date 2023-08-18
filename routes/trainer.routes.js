import { Router } from 'express';
import { TrainerController } from '../controllers';

const router = Router();

const trainerController = new TrainerController();

export default router;
