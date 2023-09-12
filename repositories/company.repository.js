import { Company, User } from '../db';

class CompanyRepository {
  isMe = async companyId => {
    return await Company.findOne({ where: { companyId } });
  };

  postCompany = async (companyName, time, additional, service, phoneNumber, link, userId, imageUrl, map) => {
    return await Company.create({
      companyName,
      time,
      additional,
      service,
      phoneNumber,
      link,
      userId,
      imageUrl,
      map,
    });
  };

  allGetCompany = async () => {
    return await Company.findAll({});
  };

  oneGetCompany = async companyId => {
    return await Company.findOne({
      where: { companyId },
    });
  };

  putCompany = async (companyId, companyName, time, additional, service, phoneNumber, link, imageUrl, map) => {
    return await Company.update(
      {
        companyName,
        time,
        additional,
        service,
        phoneNumber,
        link,
        imageUrl,
        map,
      },
      { where: { companyId } }
    );
  };

  deleteCompany = async companyId => {
    return await Company.destroy({
      where: { companyId },
    });
  };

  getOwnerCompany = async userId => {
    return await Company.findOne({
      where: { userId },
    });
  };
}

export default CompanyRepository;
