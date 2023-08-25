import { Router } from 'express';
import { InquiryController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const inquiryController = new InquiryController();

// 문의 전체 조회
router.get("/inquirys", isAuth, inquiryController.getAllInquiry);
// 문의
router.post("/inquiry", isAuth, inquiryController.createInquiry);
// 문의 수정
router.put("/inquirys/:inquiryId", isAuth, inquiryController.udpateInquiry);
// 문의 삭제
router.delete("/inquirys/:inquiryId", isAuth, inquiryController.deleteInquiry);


export default router;
