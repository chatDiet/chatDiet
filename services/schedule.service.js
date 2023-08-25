import { ScheduleRepository } from '../repositories';
class ScheduleService {
  _scheduleRepository = new ScheduleRepository();

  postSchedule = async (title, date) => {
    try {
      if (!title) {
        return {
          status: 400,
          message: '제목 미입력',
        };
      } else if (!date) {
        return {
          status: 400,
          message: '날짜 미입력',
        };
      }
      const result = await this._scheduleRepository.postSchedule(title, date);
      if (!result) {
        return {
          status: 400,
          message: '업체 생성 실패',
        };
      }
      return {
        status: 200,
        message: '업체 생성 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  oneGetSchedule = async scheduleId => {
    try {
      if (!scheduleId) {
        return {
          status: 400,
          message: '스케줄 ID 미입력',
        };
      }
      const result = await this._scheduleRepository.oneGetSchedule(scheduleId);
      if (!result) {
        return {
          status: 400,
          message: '존재하지 않는 스케줄 ID',
        };
      }
      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  putSchedule = async (scheduleId, title, date) => {
    try {
      if (!scheduleId) {
        return {
          status: 400,
          message: '스케줄 ID 미입력',
        };
      }
      const schedule = await this._scheduleRepository.oneGetSchedule(scheduleId);
      if (!schedule) {
        return {
          status: 400,
          message: '존재하지 않는 스케줄 ID',
        };
      } else if (!title) {
        return {
          status: 400,
          message: '제목 미입력',
        };
      } else if (!date) {
        return {
          status: 400,
          message: '날짜 미입력',
        };
      }
      const result = await this._scheduleRepository.putSchedule(scheduleId, title, date);
      if (!result) {
        return {
          status: 400,
          message: '스케줄 수정 실패',
        };
      }
      return {
        status: 200,
        message: '스케줄 수정 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
  deleteSchedule = async scheduleId => {
    try {
      if (!scheduleId) {
        return {
          status: 400,
          message: '스케줄 ID 미입력',
        };
      }
      const schedule = await this._scheduleRepository.oneGetSchedule(scheduleId);
      if (!schedule) {
        return {
          status: 400,
          message: '존재하지 않는 스케줄 ID',
        };
      }
      const result = await this._scheduleRepository.deleteSchedule(scheduleId);
      if (!result) {
        return {
          status: 400,
          message: '스케줄 삭제 실패',
        };
      }
      return {
        status: 200,
        message: '스케줄 삭제 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
}

export default ScheduleService;
