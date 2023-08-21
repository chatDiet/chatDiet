import { Router } from 'express';
import { CompanyController } from '../controllers';

const router = Router();
const companyController = new CompanyController();

router.post('/company', companyController.postCompany);
router.get('/company', companyController.allGetCompany);
router.get('/company/:companyId', companyController.oneGetpostCompany);
router.put('/company/:companyId', companyController.putCompany);
router.delete('/company/:companyId', companyController.deleteCompany);

export default router;
