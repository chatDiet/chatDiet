import { InquiryRepository } from '../repositories';
import { UserRepository } from '../repositories';

class InquiryService {
  _inquiryRepository = new InquiryRepository();
  _userRepository = new UserRepository();

  createInquiry = async (userId, content) => {
    const existUser = await this._userRepository.getUserById(userId);

    if (!existUser) {
      return {
        status : 401,
        message : "로그인 후 이용 가능합니다."
      }
    } else {
      await this._inquiryRepository.createInquiry(userId, content);

      return {
        status : 201,
        message : "문의 접수가 완료되었습니다."
      };
    };
  };
};

export default InquiryService;
