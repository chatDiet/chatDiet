import Report from '../db/models/report';
import ReportLog from '../db/models/reportLog';
import connector from '../db/db';

const sequelize = connector.sequelize;

class ReportRepository {
  async getReportId(reportId) {
    return await Report.findOne({ where: { reportId } });
  }

  async getAllReport() {
    const result = await Report.findAll();

    result.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return result;
  }

  async createReport(userId, targetId, title, content, type) {
    return await Report.create({ userId, targetId, title, content, type });
  }

  async updateReport(reportId, title, content, type) {
    return await Report.update({ title, content, type }, { where: { reportId } });
  }

  deleteReport = async (reportId, userId, title, content, type) => {
    const transaction = await sequelize.transaction();
    try {
      await Report.destroy({ where: { reportId } }, { transaction });

      const reportLog = await ReportLog.create({ userId, title, content, type }, { transaction });

      await transaction.commit();

      return reportLog;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  };
}

export default ReportRepository;
