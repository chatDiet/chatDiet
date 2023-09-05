import { Router } from 'express';
import { CompanyController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';
import { multipleUpload } from '../middlewares/awsS3.middleware';
//추후 이미지 넣기

const router = Router();
const companyController = new CompanyController();

//업체 생성
router.post('/company', isAuth, multipleUpload('image[]'), companyController.postCompany);
//업체 전체 조회
router.get('/company', companyController.allGetCompany);
//업체 디테일 조회
router.get('/company/:companyId', companyController.oneGetCompany);
//업체 수정
router.put('/company/:companyId', isAuth, companyController.putCompany);
//업체 삭제
router.delete('/company/:companyId', isAuth, companyController.deleteCompany);
//userId에 따른 업체 조회
router.get('/companys/owner', isAuth, companyController.getOwnerCompany);

export default router;
