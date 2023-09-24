import { CompanyRepository } from '../repositories';

class CompanyService {
  _companyRepository = new CompanyRepository();

  postCompany = async (companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map) => {
    try {
      await this.isEmpty(companyName, time, additional, service, phoneNumber, link, imageUrl, map);

      const existCompany = await this._companyRepository.getOwnerCompany(userId);
      if (existCompany) {
        return {
          status: 400,
          message: '이미 업체가 생성되어 있습니다.',
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
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };

  oneGetCompany = async companyId => {
    try {
      await this.checkCompany(companyId);
      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };

  putCompany = async (companyId, companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map) => {
    try {
      await this.isEmpty(companyName, time, additional, service, phoneNumber, link, imageUrl, map);

      await this.isAuth(companyId, userId);

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
  deleteCompany = async (companyId, userId) => {
    try {
      await this.isAuth(companyId, userId);

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

  isAuth = async (companyId, userId) => {
    try {
      const company = await this.checkCompany(companyId);
      if (userId !== company.userId) {
        return {
          status: 401,
          message: '권한 없음',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  };

  isEmpty = async (companyName, time, additional, service, phoneNumber, link, imageUrl, map) => {
    try {
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
      if (!service) {
        return {
          status: 400,
          message: '업체 운영 프로그램 미입력',
        };
      }
      if (!phoneNumber) {
        return {
          status: 400,
          message: '업체 연락처 미입력',
        };
      }
      if (!link) {
        return {
          status: 400,
          message: '업체 링크 미입력',
        };
      }
      if (!imageUrl) {
        return {
          status: 400,
          message: '업체 이미지 미입력',
        };
      }
      if (!map) {
        return {
          status: 400,
          message: '주소 미입력',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  };

  checkCompany = async companyId => {
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
    return company;
  };
}

export default CompanyService;
