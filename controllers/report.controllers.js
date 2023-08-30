import { ReportService } from '../services';

class ReportController {
  _reportService = new ReportService();

  // 신고 전체 조회
  getAllReport = async (req, res) => {
    try {
      const reports = await this._reportService.getAllReport();

      res.status(reports.status).json({ data: reports.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 신고
  createReport = async (req, res) => {
    const userId = res.locals.userId;
<<<<<<< HEAD
    const { title, content, type, id } = req.body;

    try {
      const createReport = await this._reportService.createReport(userId, title, content, type, id);
=======
    const { tragerId, title, content, type } = req.body;

    try {
      const createReport = await this._reportService.createReport(userId, tragerId, title, content, type);
>>>>>>> cb02f2fe663bc60f28ea2fba508cde5ad91609c6

      res.status(createReport.status).json({ message: createReport.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 신고 수정
  updateReport = async (req, res) => {
    const userId = res.locals.userId;
    const { reportId } = req.params;
    const { title, content, type } = req.body;

    try {
      const updateReport = await this._reportService.updateReport(reportId, userId, title, content, type);

      res.status(updateReport.status).json({ message: updateReport.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 신고 삭제
  deleteReport = async (req, res) => {
    const userId = res.locals.userId;
    const { reportId } = req.params;

    try {
      const deleteReport = await this._reportService.deleteReport(userId, reportId);

      res.status(deleteReport.status).json({ message: deleteReport.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}

export default ReportController;
