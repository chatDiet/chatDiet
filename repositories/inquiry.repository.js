import { Inquiry } from '../db';

class InquiryRepository {
  async createInquiry (userId, content) {
    return Inquiry.create({
      userId,
      content,
    });
  };
};

export default InquiryRepository;
