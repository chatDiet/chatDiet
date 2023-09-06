import { CompanyService } from '../services';

class CompanyController {
  _companyService = new CompanyService();

  // 업체 생성
  postCompany = async (req, res) => {
    const { companyName, time, additional, service, phoneNumber, link, map } = req.body;
    const userId = res.locals.userId;
    const imageUrls = req.files.map(file => file.location); // 여러 이미지의 location을 배열로 저장
    // 이미지 URL을 문자열로 조합하여 저장
    const imageUrl = imageUrls.join(', '); // 예: "url1, url2, url3"
    const result = await this._companyService.postCompany(companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map);

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

    const { companyName, map, time, additional, service, phoneNumber, link, imageUrl } = req.body;

    const result = await this._companyService.putCompany(companyId, companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map);

    return res.status(result.status).json(result.message);
  };

  // 업체 삭제
  deleteCompany = async (req, res) => {
    const userId = res.locals.userId;
    const { companyId } = req.params;

    const result = await this._companyService.deleteCompany(companyId, userId);

    return res.status(result.status).json(result.message);
  };

  //userId에 따른 업체 조회
  getOwnerCompany = async (req, res) => {
    const userId = res.locals.userId;

    const result = await this._companyService.getOwnerCompany(userId);
    return res.status(result.status).json(result.message);
  };
}

export default CompanyController;
