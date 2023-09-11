import { ScheduleRepository, UserRepository, TrainerRepository } from '../repositories';
class ScheduleService {
  _scheduleRepository = new ScheduleRepository();
  _userRepository = new UserRepository();
  _trainerRepository = new TrainerRepository();

  // 스케줄 생성
  postSchedule = async (title, date, userId, startTime, endTime) => {
    try {
      if (!title) {
        return {
          status: 400,
          message: '제목 미입력',
        };
      }

      if (!date) {
        return {
          status: 400,
          message: '날짜 미입력',
        };
      }

      if (!startTime) {
        return {
          status: 400,
          message: '시작시간 미입력',
        };
      }

      if (!endTime) {
        return {
          status: 400,
          message: '마감시간 미입력',
        };
      }

      const user = await this._userRepository.getUserById(userId);

      if (user.type !== 'trainer') {
        return {
          status: 401,
          message: '스케줄 생성 권한 없음',
        };
      }
      const trainer = await this._trainerRepository.findTrainer(userId);

      if (!trainer) {
        return {
          status: 404,
          message: '트레이너 정보 없음',
        };
      }

      const checkDate = await this._scheduleRepository.checkDateSchedule(date, userId, startTime, endTime);

      if (checkDate) {
        return {
          status: 409,
          message: '중복된 날짜',
        };
      }

      const result = await this._scheduleRepository.postSchedule(title, date, userId, trainer.trainerId, startTime, endTime);
      if (!result) {
        return {
          status: 404,
          message: '스케줄 생성 실패',
        };
      }
      return {
        status: 200,
        message: '스케줄 생성 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  // 스케줄 전체 조회
  allGetSchedule = async userId => {
    try {
      const result = await this._scheduleRepository.allGetSchedule(userId);

      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  // 스케줄 상세 조회
  oneGetSchedule = async (scheduleId, userId) => {
    try {
      if (!scheduleId) {
        return {
          status: 400,
          message: '스케줄 ID 미입력',
        };
      }

      const user = await this._userRepository.getUserById(userId);
      if (user.type == 'user' || user.type == 'owner') {
        return {
          status: 401,
          message: '스케줄 조회 권한 없음',
        };
      }

      const result = await this._scheduleRepository.oneGetSchedule(scheduleId);
      if (!result) {
        return {
          status: 404,
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

  // 스케줄 수정
  putSchedule = async (scheduleId, title, date, userId) => {
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
          status: 404,
          message: '존재하지 않는 스케줄 ID',
        };
      }

      const user = await this._userRepository.getUserById(userId);

      if (schedule.userId !== user.userId || user.type !== 'admin') {
        return {
          status: 401,
          message: '스케줄 수정 권한 없음',
        };
      }

      if (!title) {
        return {
          status: 400,
          message: '제목 미입력',
        };
      }

      if (!date) {
        return {
          status: 400,
          message: '날짜 미입력',
        };
      }

      const result = await this._scheduleRepository.putSchedule(scheduleId, title, date);
      if (!result) {
        return {
          status: 404,
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

  // 스케줄 삭제
  deleteSchedule = async (scheduleId, userId) => {
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
          status: 404,
          message: '존재하지 않는 스케줄 ID',
        };
      }

      const user = await this._userRepository.getUserById(userId);

      if (schedule.userId !== user.userId || user.type == 'user' || user.type == 'owner') {
        return {
          status: 401,
          message: '스케줄 삭제 권한 없음',
        };
      }

      const result = await this._scheduleRepository.deleteSchedule(scheduleId);
      if (!result) {
        return {
          status: 404,
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
