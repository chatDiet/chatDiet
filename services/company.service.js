import { CompanyRepository } from '../repositories';

class CompanyService {
  _companyRepository = new CompanyRepository();

  postCompany = async (companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map) => {
    try {
      const existCompany = await this._companyRepository.getOwnerCompany(userId);
      if (existCompany) {
        return {
          status: 400,
          message: '이미 업체가 생성되어 있습니다.',
        };
      }
      if (!companyName) {
        return {
          status: 400,
          message: '업체 이름 미입력',
        };
      }

      if (!time) {
        return {
          status: 400,
          message: '운영 시간 미입력',
        };
      }

      if (!additional) {
        return {
          status: 400,
          message: '업체 추가 운영 프로그램 미입력',
        };
      }

      if (!phoneNumber) {
        return {
          status: 400,
          message: '업체 연락처 미입력',
        };
      }
      const result = await this._companyRepository.postCompany(companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map);
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
      return { status: 500, message: 'Server Error' };
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

  putCompany = async (companyId, companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map) => {
    try {
      if (!companyId) {
        return {
          status: 400,
          message: '업체 ID 미입력',
        };
      }
      const company = await this._companyRepository.oneGetCompany(companyId);
      if (!company) {
        return {
          status: 400,
          message: '존재하지 않는 업체 ID',
        };
      } else if (userId !== company.userId) {
        return {
          status: 401,
          message: '수정 권한이 존재하지 않습니다.',
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
      } else if (!map) {
        return {
          status: 400,
          message: '주소 미입력',
        };
      }
      const result = await this._companyRepository.putCompany(companyId, companyName, time, additional, service, phoneNumber, link, imageUrl, map);
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
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };
  deleteCompany = async companyId => {
    try {
      if (!companyId) {
        return {
          status: 400,
          message: '업체 ID 미입력',
        };
      }
      const company = await this._companyRepository.oneGetCompany(companyId);
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
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };
  getOwnerCompany = async userId => {
    try {
      const result = await this._companyRepository.getOwnerCompany(userId);
      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };
}

export default CompanyService;
