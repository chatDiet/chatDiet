import { Router } from 'express';
import { InquiryController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const inquiryController = new InquiryController();

export default router;
