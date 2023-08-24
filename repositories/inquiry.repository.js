import { Inquiry } from '../db';

class InquiryRepository {
  async findInquiryId(inquiryId) {
    return await Inquiry.findOne({ where: { inquiryId: inquiryId } });
  };

  async createInquiry(userId, content) {
    return await Inquiry.create({
      userId,
      content,
    });
  };

  async getAllInquiry() {
    const getInquirysData = await Inquiry.findAll();

    getInquirysData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return getInquirysData;
  };

  async updateInquiry(inquiryId, userId, content) {
    return await Inquiry.update(
      { content },
      { where: { inquiryId, userId } },
    );
  };

  async deleteInquiry(inquiryId, userId) {
    return await Inquiry.destroy({
      where: { inquiryId, userId },
    });
  };
};

export default InquiryRepository;
