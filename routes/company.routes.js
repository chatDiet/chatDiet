import { Router } from 'express';
import { CompanyController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const companyController = new CompanyController();

router.post('/company', isAuth, companyController.postCompany);
router.get('/company', companyController.allGetCompany);
router.get('/company/:companyId', companyController.oneGetCompany);
router.put('/company/:companyId', isAuth, companyController.putCompany);
router.delete('/company/:companyId', isAuth, companyController.deleteCompany);

export default router;
