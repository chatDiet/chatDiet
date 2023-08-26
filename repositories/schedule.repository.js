import { Schedule } from '../db';

class ScheduleRepository {
  // 스케줄 생성
  postSchedule = async (title, date, userId, trainerId) => {
    try {
      const result = await Schedule.create({
        trainerId,
        userId,
        title,
        date,
      });

      return result;
    } catch (err) {}
  };

  // 스케줄 전체 조회
  allGetSchedule = async userId => {
    try {
      const result = await Schedule.findAll({
        where: { userId },
      });

      return result;
    } catch (err) {}
  };

  // 스케줄 상세 조회
  oneGetSchedule = async scheduleId => {
    try {
      const result = await Schedule.findOne({
        where: { scheduleId },
      });

      return result;
    } catch (err) {}
  };

  // 스케줄 수정
  putSchedule = async (scheduleId, title, date) => {
    try {
      const result = await Schedule.update(
        {
          title,
          date,
        },
        { where: { scheduleId } }
      );

      return result;
    } catch (err) {}
  };

  // 스케줄 삭제
  deleteSchedule = async scheduleId => {
    try {
      const result = await Schedule.destroy({
        where: { scheduleId },
      });

      return result;
    } catch (err) {}
  };

  // 날짜 중복 조회
  checkDateSchedule = async date => {
    try {
      const result = await Schedule.findOne({
        where: { date },
      });

      return result;
    } catch (err) {}
  };
}

export default ScheduleRepository;
