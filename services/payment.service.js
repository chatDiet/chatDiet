import { PaymentRepository } from '../repositories';

class PaymentService {
  _paymentRepository = new PaymentRepository();

  kakaoPayment = async (userId, data) => {
    await this._paymentRepository.kakaoPayment(userId, data);

    return {
      status: 200,
      message: '결제가 완료되었습니다.',
    };
  };
}

export default PaymentService;
