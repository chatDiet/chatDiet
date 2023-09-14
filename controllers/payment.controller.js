import { PaymentService } from '../services';

class PaymentController {
  _paymentService = new PaymentService();
  kakaoPayment = async (req, res) => {
    const { data } = req.body;
    console.log(data, '백에서 받는 데이터');

    const paymentInfo = await this._paymentService.kakaoPayment(data);
    console.log(paymentInfo);
    return res.status(paymentInfo.status).json(paymentInfo.data);
  };
}

export default PaymentController;
