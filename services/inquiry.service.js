import { InquiryRepository, UserRepository } from '../repositories';

class InquiryService {
  _inquiryRepository = new InquiryRepository();
  _userRepository = new UserRepository();

  // 문의 조회
  getAllInquiry = async () => {
    try {
      const getAllInquiryData = await this._inquiryRepository.getAllInquiry();

      const AllInquiryData = getAllInquiryData.map(inquiry => {
        return {
          inquiryId: inquiry.inquiryId,
          title: inquiry.title,
          content: inquiry.content,
          createdAt: inquiry.createdAt,
        };
      });
      return {
        status: 200,
        data: AllInquiryData,
      };
    } catch (err) {
      console.log(err);
    }
  };

  // 문의
  createInquiry = async (userId, title, content) => {
    if (title.length <= 0) {
      return {
        status: 400,
        message: '내용을 입력하지 않았습니다.',
      };
    }

    if (content.length <= 0) {
      return {
        status: 400,
        message: '내용을 입력하지 않았습니다.',
      };
    }

    await this._inquiryRepository.createInquiry(userId, title, content);

    return {
      status: 201,
      message: '문의 접수가 완료되었습니다.',
    };
  };

  // 문의 수정
  updateInquiry = async (inquiryId, userId, title, content) => {
    const existInquiryUser = await this._inquiryRepository.findInquiryId(inquiryId);

    if (!existInquiryUser) {
      return {
        status: 404,
        message: '수정하실 문의가 존재하지 않습니다.',
      };
    }

    if (existInquiryUser.userId !== userId) {
      return {
        status: 401,
        message: '수정 권한이 존재하지 않습니다.',
      };
    }

    if (content.length <= 0) {
      return {
        status: 400,
        message: '내용을 입력하지 않았습니다.',
      };
    }

    if (title.length <= 0) {
      return {
        status: 400,
        message: '내용을 입력하지 않았습니다.',
      };
    }

    await this._inquiryRepository.updateInquiry(inquiryId, title, content);

    return {
      status: 200,
      message: '문의가 수정되었습니다.',
    };
  };

  // 문의 삭제
  deleteInquiry = async (inquiryId, userId) => {
    const existInquiryUser = await this._inquiryRepository.findInquiryId(inquiryId);
    const user = await this._userRepository.getUserById(userId);

    if (!existInquiryUser) {
      return {
        status: 404,
        message: '삭제하실 문의가 존재하지 않습니다.',
      };
    }

    if (existInquiryUser.userId === userId || user.type === 'admin') {
      await this._inquiryRepository.deleteInquiry(inquiryId);
      return {
        status: 200,
        message: '문의가 삭제되었습니다.',
      };
    } else {
      return {
        status: 401,
        message: '삭제 권한이 존재하지 않습니다.',
      };
    }
  };
}

export default InquiryService;
