import { CompanyRepository } from '../repositories';

class CompanyService {
  _companyRepository = new CompanyRepository();

  postCompany = async (companyName, time, additional, service, phoneNumber, link, userId, map) => {
    try {
      const isUser = await this._companyRepository.isUser(userId);
      console.log(isUser);
      if (isUser.type === 'user' || isUser.type === 'trainer') {
        return {
          code: 401,
          message: '헬스장을 만들 권한이 없습니다',
        };
      }

      if (!companyName) {
        return {
          status: 400,
          message: '업체 이름 미입력',
        };
      } else if (!time) {
        return {
          status: 400,
          message: '운영 시간 미입력',
        };
      } else if (!phoneNumber) {
        return {
          status: 400,
          message: '업체 연락처 미입력',
        };
      } else if (!map) {
        return {
          status: 400,
          message: '업체 주소 미입력',
        };
      }
      const result = await this._companyRepository.postCompany(companyName, time, additional, service, phoneNumber, link, userId, map);
      if (!result) {
        return {
          status: 400,
          message: '업체 생성 실패',
        };
      }
      return {
        status: 200,
        message: '업체 생성 성공',
      };
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        message: '업체 생성 실패222222222222',
      };
    }
  };

  allGetCompany = async () => {
    try {
      const result = await this._companyRepository.allGetCompany();
      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  oneGetCompany = async companyId => {
    try {
      if (!companyId) {
        return {
          status: 400,
          message: '업체 ID 미입력',
        };
      }
      const result = await this._companyRepository.oneGetCompany(companyId);
      if (!result) {
        return {
          status: 400,
          message: '존재하지 않는 업체 ID',
        };
      }
      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  putCompany = async (companyId, companyName, time, additional, service, phoneNumber, link, userId, map) => {
    try {
      const isUser = await this._companyRepository.isUser(userId);
      if (isUser.type != 'owner' || isUser.type != 'admin') {
        return {
          code: 401,
          message: '헬스장의 정보를 수정 할 권한이 없습니다',
        };
      }
      if (!companyId) {
        return {
          status: 400,
          message: '업체 ID 미입력',
        };
      }
      const company = await this._companyRepository.oneGetpostCompany(companyId);
      if (!company) {
        return {
          status: 400,
          message: '존재하지 않는 업체 ID',
        };
      } else if (!companyName) {
        return {
          status: 400,
          message: '업체 이름 미입력',
        };
      } else if (!time) {
        return {
          status: 400,
          message: '운영 시간 미입력',
        };
      } else if (!phoneNumber) {
        return {
          status: 400,
          message: '업체 연락처 미입력',
        };
      }else if (!map) {
        return {
          status: 400,
          message: '업체 주소 미입력',
        };
      }
      const result = await this._companyRepository.putCompany(companyId, companyName, time, additional, service, phoneNumber, link, map);
      if (!result) {
        return {
          status: 400,
          message: '업체 수정 실패',
        };
      }
      return {
        status: 200,
        message: '업체 수정 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
  deleteCompany = async (companyId, userId) => {
    try {
      const isUser = await this._companyRepository.isUser(userId);
      if (isUser.type != 'owner' || isUser.type != 'admin') {
        return {
          code: 401,
          message: '헬스장의 삭제 할 권한이 없습니다',
        };
      }

      if (!companyId) {
        return {
          status: 400,
          message: '업체 ID 미입력',
        };
      }
      const company = await this._companyRepository.oneGetpostCompany(companyId);
      if (!company) {
        return {
          status: 400,
          message: '존재하지 않는 업체 ID',
        };
      }
      const result = await this._companyRepository.deleteCompany(companyId);
      if (!result) {
        return {
          status: 400,
          message: '업체 삭제 실패',
        };
      }
      return {
        status: 200,
        message: '업체 삭제 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
}

export default CompanyService;
