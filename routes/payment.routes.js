import { Router } from 'express';
import { PaymentController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const paymentController = new PaymentController();

//카카오 결제
router.post('/payment/kakao', isAuth, paymentController.kakaoPayment);

export default router;
