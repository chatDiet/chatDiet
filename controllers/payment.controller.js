import { PaymentService } from '../services';

class PaymentController {
  _paymentService = new PaymentService();
  kakaoPayment = async (req, res) => {
    const data = req.body;
    const userId = res.locals.userId;
    console.log(data, '백에서 받는 데이터');

    const paymentInfo = await this._paymentService.kakaoPayment(userId, data);
    console.log(paymentInfo);
    return res.status(paymentInfo.status).json(paymentInfo.data);
  };
}

export default PaymentController;
