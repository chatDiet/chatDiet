import { ReportRepository, UserRepository } from '../repositories';

class ReportService {
  _reportRepository = new ReportRepository();
  _userRepository = new UserRepository();

  // 신고 전체 조회
  async getAllReport() {
    const getAllreportData = await this._reportRepository.getAllReport();
    const allreportData = getAllreportData.map(report => {
      return {
        reportId: report.reportId,
        title: report.title,
        content: report.content,
        type: report.type,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      };
    });

    return {
      status: 200,
      data: allreportData,
    };
  }

  // 신고
  async createReport(userId, title, content, type) {
    if (!content) {
      return {
        status: 400,
        message: '내용을 입력해주세요.',
      };
    }

    if (!title) {
      return {
        status: 400,
        message: '제목을 입력해주세요.',
      };
    }

    if (!type) {
      return {
        status: 400,
        message: '신고하려는 카테고리 유형을 입력해주세요. (타입: post, comment, review)',
      };
    }
    if (type == post) {
      await this._reportRepository.createReport(userId, title, content, type);
      return {
        status: 201,
        message: '신고가 접수되었습니다.',
      };
    }
    if (type == comment) {
      await this._reportRepository.createReport(userId, title, content, type);
      return {
        status: 201,
        message: '신고가 접수되었습니다.',
      };
    }
    if (type == review) {
      await this._reportRepository.createReport(userId, title, content, type);
      return {
        status: 201,
        message: '신고가 접수되었습니다.',
      };
    }
  }

  // 신고 수정
  async updateReport(reportId, userId, title, content, type) {
    const getReportData = await this._reportRepository.getReportId(reportId);

    if (!getReportData) {
      return {
        status: 404,
        message: '존재하지 않는 신고 내역입니다.',
      };
    }
    if (getReportData.userId !== userId) {
      return {
        status: 401,
        message: '수정 권한이 존재하지 않습니다.',
      };
    }

    if (!content) {
      return {
        status: 400,
        message: '내용을 입력해주세요.',
      };
    }

    if (!title) {
      return {
        status: 400,
        message: '제목을 입력해주세요.',
      };
    }

    if (!type) {
      return {
        status: 400,
        message: '신고하려는 유형을 입력해주세요. (post, comment, review)',
      };
    }

    await this._reportRepository.updateReport(reportId, title, content, type);

    return {
      status: 200,
      message: '신고 내용이 수정 되었습니다.',
    };
  }
  // 신고 삭제
  async deleteReport(userId, reportId) {
    const existReportUser = await this._reportRepository.getReportId(reportId);
    const user = await this._userRepository.getUserById(userId);

    if (!existReportUser) {
      return {
        status: 404,
        message: '삭제하실 신고 내역이 존재하지 않습니다.',
      };
    }

    if (existReportUser.userId === userId || user.type === 'admin') {
      await this._reportRepository.deleteReport(reportId);
      return {
        status: 200,
        message: '신고 삭제가 완료 되었습니다.',
      };
    } else {
      return {
        status: 400,
        message: '신고 삭제 권한이 존재하지 않습니다.',
      };
    }
  }
}

export default ReportService;
