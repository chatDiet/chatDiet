import { Router } from 'express';
import { InquiryController } from '../controllers';

const router = Router();
const inquiryController = new InquiryController();
const auth = require("../middlewares/auth.middleware");

router.post("/inquiry", auth, inquiryController.createInquiry);

export default router;
