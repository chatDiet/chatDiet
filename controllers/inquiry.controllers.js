import { InquiryService } from '../services';

class InquiryController {
  _inquiryService = new InquiryService();

  // 문의 조회
  getAllInquiry = async (req, res) => {
    try {
      const allInquiryData = await this._inquiryService.getAllInquiry();

      res.status(allInquiryData.status).json({ data: allInquiryData.data, message: allInquiryData.message });
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    }
  };

  // 문의
  createInquiry = async (req, res) => {
    const userId = res.locals.userId;
    const { title, content } = req.body;

    try {
      const createInquiry = await this._inquiryService.createInquiry(userId, title, content);

      res.status(createInquiry.status).json({ message: createInquiry.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 문의 수정
  udpateInquiry = async (req, res) => {
    const userId = res.locals.userId;
    const { inquiryId } = req.params;
    const { title, content } = req.body;

    try {
      const updateInquiry = await this._inquiryService.updateInquiry(inquiryId, userId, title, content);

      res.status(updateInquiry.status).json({ message: updateInquiry.message, data: updateInquiry.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 문의 삭제
  deleteInquiry = async (req, res) => {
    const userId = res.locals.userId;
    const { inquiryId } = req.params;

    try {
      const deleteInquiry = await this._inquiryService.deleteInquiry(inquiryId, userId);

      res.status(deleteInquiry.status).json({ message: deleteInquiry.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}

export default InquiryController;
