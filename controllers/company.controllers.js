import { CompanyService } from '../services';

class CompanyController {
  _companyService = new CompanyService();

  // 업체 생성
  postCompany = async (req, res) => {
    const { companyName, time, additional, service, phoneNumber, link } = req.body;
    const userId = res.locals.userId;

    const result = await this._companyService.postCompany(companyName, time, additional, service, phoneNumber, link, userId);

    return res.status(result.status).json(result.message);
  };

  // 업체 전체 조회
  allGetCompany = async (req, res) => {
    const result = await this._companyService.allGetCompany();

    return res.status(result.status).json(result.message);
  };

  // 업체 상세 조회
  oneGetCompany = async (req, res) => {
    const { companyId } = req.params;

    const result = await this._companyService.oneGetCompany(companyId);

    return res.status(result.status).json(result.message);
  };

  // 업체 수정
  putCompany = async (req, res) => {
    const userId = res.locals.userId;
    const { companyId } = req.params;

    const { companyName, time, additional, service, phoneNumber, link } = req.body;

    const result = await this._companyService.putCompany(companyId, companyName, time, additional, service, phoneNumber, link, userId);

    return res.status(result.status).json(result.message);
  };

  // 업체 삭제
  deleteCompany = async (req, res) => {
    const userId = res.locals.userId;
    const { companyId } = req.params;

    const result = await this._companyService.deleteCompany(companyId, userId);

    return res.status(result.status).json(result.message);
  };
}

export default CompanyController;
