import Router from 'express';
import { ContractController } from '../controllers';

const router = Router();

const contractController = new ContractController();

export default router;
