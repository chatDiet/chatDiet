import Router from 'express';
import { ContractController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const contractController = new ContractController();

export default router;
