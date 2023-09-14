import { PaymentRepository } from '../repositories';

class PaymentService {
  _paymentRepository = new PaymentRepository();

  kakaoPayment = async data => {
    await this._paymentRepository.kakaoPayment(data);

    return {
      status: 200,
      message: data,
    };
  };
}

export default PaymentService;
