import { Payment } from '../db';

class PaymentRepository {
  kakaoPayment = async (userId, data) => {
    const method = data.pay_method;
    const orderNumber = data.merchant_uid;
    const amountOfPayment = data.paid_amount;
    return await Payment.create({ userId, method, orderNumber, amountOfPayment });
  };
}

export default PaymentRepository;
