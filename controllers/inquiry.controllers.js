import { InquiryService } from '../services';

class InquiryController {
  _inquiryService = new InquiryService();

  createInquiry = async (req, res) => {
    const userId = res.locals.userId;
    const { content } = req.body; // title은 임의로 넣었습니다. 논의 후 차후에 ERD에 기입

    try {
      const createInquiry = await this._inquiryService.createInquiry(userId, content);

      res.status(createInquiry.status).json({ message : createInquiry.message})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };
};

export default InquiryController;
