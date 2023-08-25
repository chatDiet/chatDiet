import { Company, User } from '../db';

class CompanyRepository {
  isUser = async userId => {
    return await User.findOne({ where: { userId } });
  };

  postCompany = async (companyName, time, additional, service, phoneNumber, link, userId, map) => {
    console.log('들어옴 >ㅁ<');
    const result = await Company.create({
      companyName,
      time,
      additional,
      service,
      phoneNumber,
      link,
      userId,
      map,
    });
    return result;
  };

  allGetCompany = async () => {
    try {
      const result = await Company.findAll({});

      return result;
    } catch (err) {}
  };

  oneGetCompany = async companyId => {
    try {
      const result = await Company.findOne({
        where: { companyId },
      });

      return result;
    } catch (err) {}
  };

  putCompany = async (companyId, companyName, time, additional, service, phoneNumber, link, map) => {
    try {
      const result = await Company.update(
        {
          companyName,
          time,
          additional,
          service,
          phoneNumber,
          link,
          map,
        },
        { where: { companyId } }
      );

      return result;
    } catch (err) {}
  };

  deleteCompany = async companyId => {
    try {
      const result = await Company.destroy({
        where: { companyId },
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  };
}

export default CompanyRepository;
