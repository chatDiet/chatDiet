import { PaymentService } from '../services';

class PaymentController {
  _paymentService = new PaymentService();
  kakaoPayment = async (req, res) => {
    const data = req.body;
    const userId = res.locals.userId;

    const paymentInfo = await this._paymentService.kakaoPayment(userId, data);
    return res.status(paymentInfo.status).json(paymentInfo.data);
  };
}

export default PaymentController;
