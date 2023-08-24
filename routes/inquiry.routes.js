import { Router } from 'express';
import { InquiryController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const inquiryController = new InquiryController();
import auth from "../middlewares/auth.middleware";

// 문의 전체 조회
router.get("/inquirys", inquiryController.getAllInquiry);
// 문의
router.post("/inquiry", auth, inquiryController.createInquiry);
// 문의 수정
router.put("/inquirys/:inquiryId", auth, inquiryController.udpateInquiry);
// 문의 삭제
router.delete("/inquirys/:inquiryId", auth, inquiryController.deleteInquiry);


export default router;
