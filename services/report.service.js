import { ReportRepository, UserRepository, PostRepository, CommentRepository, ReviewRepository } from '../repositories';

class ReportService {
  _reportRepository = new ReportRepository();
  _userRepository = new UserRepository();
  _postRepository = new PostRepository();
  _commentRepository = new CommentRepository();
  _reviewRepository = new ReviewRepository();

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
  async createReport(userId, targetId, title, content, type) {
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

    if (!targetId) {
      return {
        status: 400,
        message: '신고할려는 ID 미입력',
      };
    }

    if (!type) {
      return {
        status: 400,
        message: '신고하려는 유형을 입력해주세요. (타입: post, comment, review)',
      };
    }

    if (type === 'post') {
      const post = await this._postRepository.getPostId(targetId);
      if (!post) {
        return {
          status: 400,
          message: '존재하지 않는 ID',
        };
      }
    }

    if (type === 'comment') {
      const comment = await this._commentRepository.getcommentId(targetId);
      if (!comment) {
        return {
          status: 400,
          message: '존재하지 않는 ID',
        };
      }
    }

    if (type === 'review') {
      const review = await this._reviewRepository.findReview(targetId);
      if (!review) {
        return {
          status: 400,
          message: '존재하지 않는 ID',
        };
      }
    }

    await this._reportRepository.createReport(userId, targetId, title, content, type);
    return {
      status: 201,
      message: '신고가 접수되었습니다.',
    };
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
    const report = await this._reportRepository.getReportId(reportId);
    if (!report) {
      return {
        status: 404,
        message: '삭제하실 신고 내역이 존재하지 않습니다.',
      };
    }

    const user = await this._userRepository.getUserById(userId);

    const title = report.title;
    const content = report.content;
    const type = report.type;

    if (report.userId === userId || user.type === 'admin') {
      await this._reportRepository.deleteReport(reportId, userId, title, content, type);
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
