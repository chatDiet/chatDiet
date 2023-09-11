import { Inquiry } from '../db';

class InquiryRepository {
  async findInquiryId(inquiryId) {
    return await Inquiry.findOne({ where: { inquiryId: inquiryId } });
  }

  async createInquiry(userId, title, content) {
    return await Inquiry.create({
      userId,
      title,
      content,
    });
  }

  async getAllInquiry() {
    return await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
  }

  async updateInquiry(inquiryId, title, content) {
    return await Inquiry.update({ title, content }, { where: { inquiryId } });
  }

  async deleteInquiry(inquiryId) {
    return await Inquiry.destroy({
      where: { inquiryId },
    });
  }
}

export default InquiryRepository;
