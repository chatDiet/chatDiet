import { Router } from 'express';
import { CompanyController } from '../controllers';

const router = Router();

const companyController = new CompanyController();

export default router;
