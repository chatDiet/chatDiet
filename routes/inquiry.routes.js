import { Router } from 'express';
import { InquiryController } from '../controllers';

const router = Router();
const inquiryController = new InquiryController();

export default router;
