import { Payment } from '../db';

class PaymentRepository {
  kakaoPayment = async data => {
    return await Payment.create({ data });
  };
}

export default PaymentRepository;
