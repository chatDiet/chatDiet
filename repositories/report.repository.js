import Report from './../db/models/report';

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

  async createReport(userId, title, content, type, id) {
    return await Report.create({ userId, title, content, type, id });
  }

  async updateReport(reportId, title, content, type) {
    return await Report.update({ title, content, type }, { where: { reportId } });
  }

  async deleteReport(reportId) {
    return await Report.destroy({ where: { reportId } });
  }
}

export default ReportRepository;
