import { CompanyService } from '../services';

class CompanyController {
  _companyService = new CompanyService();

  // 업체 생성
  postCompany = async (req, res) => {
    const { companyName, time, additional, service, phoneNumber, link } = req.body;

    const result = await this._companyService.postCompany(companyName, time, additional, service, phoneNumber, link);

    return res.status(result.status).json(result.message);
  };

  // 업체 전체 조회
  allGetCompany = async (req, res) => {
    const result = await this._companyService.allGetCompany();

    return res.status(result.status).json(result.message);
  };

  // 업체 상세 조회
  oneGetpostCompany = async (req, res) => {
    const { companyId } = req.params;

    const result = await this._companyService.oneGetpostCompany(companyId);

    return res.status(result.status).json(result.message);
  };

  // 업체 수정
  putCompany = async (req, res) => {
    const { companyId } = req.params;

    const { companyName, time, additional, service, phoneNumber, link } = req.body;

    const result = await this._companyService.putCompany(companyId, companyName, time, additional, service, phoneNumber, link);

    return res.status(result.status).json(result.message);
  };

  // 업체 삭제
  deleteCompany = async (req, res) => {
    const { companyId } = req.params;

    const result = await this._companyService.deleteCompany(companyId);

    return res.status(result.status).json(result.message);
  };
}

export default CompanyController;
