import { InquiryRepository } from '../repositories';
import { UserRepository } from '../repositories';

class InquiryService {
  _inquiryRepository = new InquiryRepository();
  _userRepository = new UserRepository();

  // 문의 조회
  getAllInquiry = async () => {
    const getAllInquiryData = await this._inquiryRepository.getAllInquiry();

    if (getAllInquiryData.length <= 0) {
      return {
        status: 404,
        message: "조회된 문의가 없습니다."
      }
    };

    const AllInquiryData = getAllInquiryData.map((inquiry) => {
      return {
        inquiryId: inquiry.inquiryId,
        content: inquiry.content,
      };
    });
    return {
      status: 200,
      data: AllInquiryData,
    };
  };

  // 문의
  createInquiry = async (userId, content) => {
    const existUser = await this._userRepository.getUserById(userId);

    if (!existUser) {
      return {
        status: 401,
        message: "로그인 후 이용 가능합니다."
      }
    } else {
      await this._inquiryRepository.createInquiry(userId, content);

      return {
        status: 201,
        message: "문의 접수가 완료되었습니다."
      };
    };
  };

  // 문의 수정
  updateInquiry = async (inquiryId, userId, content) => {
    const existInquiryUser = await this._inquiryRepository.findInquiryId(inquiryId);

    if (!existInquiryUser) {
      return {
        status: 404,
        message: "수정하실 문의가 존재하지 않습니다."
      };
    };

    if (existInquiryUser.userId !== userId) {
      return {
        status: 401,
        message: "수정 권한이 존재하지 않습니다."
      };
    };

    if (content <= 0) {
      return {
        status: 400,
        message: "내용을 입력하지 않았습니다."
      };
    };

    await this._inquiryRepository.updateInquiry(inquiryId, userId, content);
    
    const inquiryData = await this._inquiryRepository.findInquiryId(inquiryId);

    return {
      status: 200,
      message: "문의가 수정되었습니다.",
      data: {
        iniquiryId: inquiryData.inquiryId,
        content: inquiryData.content,
      },
    };
  };

  deleteInquiry = async (inquiryId, userId) => {
    const existInquiryUser = await this._inquiryRepository.findInquiryId(inquiryId);

    if (!existInquiryUser) {
      return {
        status: 404,
        message: "삭제하실 문의가 존재하지 않습니다."
      };
    };

    if (existInquiryUser.userId !== userId) {
      return {
        status: 401,
        message: "삭제 권한이 존재하지 않습니다."
      };
    };

    await this._inquiryRepository.deleteInquiry(inquiryId, userId);

    return {
      status: 200,
      message: "문의가 삭제되었습니다.",
    };
  };
};

export default InquiryService;
