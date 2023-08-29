import { Router } from 'express';
import { CompanyController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';
import upload from '../middlewares/auth.middleware';
//추후 이미지 넣기

const router = Router();
const companyController = new CompanyController();

//업체 생성
router.post('/company', companyController.postCompany);
//업체 전체 조회
router.get('/company', companyController.allGetCompany);
//업체 디테일 조회
router.get('/company/:companyId', companyController.oneGetCompany);
//업체 수정
router.put('/company/:companyId', isAuth, companyController.putCompany);
//업체 삭제
router.delete('/company/:companyId', isAuth, companyController.deleteCompany);

export default router;
