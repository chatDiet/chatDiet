import { Company } from '../db';

class CompanyRepository {
  postCompany = async (companyName, time, additional, service, phoneNumber, link) => {
    try {
      const result = await Company.create({
        companyName,
        time,
        additional,
        service,
        phoneNumber,
        link,
      });

      return result;
    } catch (err) {}
  };

  allGetCompany = async () => {
    try {
      const result = await Company.findAll({});

      return result;
    } catch (err) {}
  };

  oneGetpostCompany = async companyId => {
    try {
      const result = await Company.findOne({
        where: { companyId },
      });

      return result;
    } catch (err) {}
  };

  putCompany = async (companyId, companyName, time, additional, service, phoneNumber, link) => {
    try {
      const result = await Company.update(
        {
          companyName,
          time,
          additional,
          service,
          phoneNumber,
          link,
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
