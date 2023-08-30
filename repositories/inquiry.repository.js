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
    const getInquirysData = await Inquiry.findAll();

    getInquirysData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return getInquirysData;
  }

  async updateInquiry(inquiryId, content) {
    return await Inquiry.update({ content }, { where: { inquiryId } });
  }

  async deleteInquiry(inquiryId) {
    return await Inquiry.destroy({
      where: { inquiryId },
    });
  }
}

export default InquiryRepository;
