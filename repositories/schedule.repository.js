import { Schedule } from '../db';
import { Op } from 'sequelize';

class ScheduleRepository {
  // 스케줄 생성
  postSchedule = async (title, date, userId, trainerId, startTime, endTime) => {
    return await Schedule.create({
      trainerId,
      userId,
      title,
      date,
      startTime,
      endTime,
    });
  };

  // 스케줄 전체 조회
  allGetSchedule = async userId => {
    return await Schedule.findAll({
      where: { userId },
    });
  };

  // 스케줄 상세 조회
  oneGetSchedule = async scheduleId => {
    return await Schedule.findOne({
      where: { scheduleId },
    });
  };

  // 스케줄 수정
  putSchedule = async (scheduleId, title, date) => {
    return await Schedule.update(
      {
        title,
        date,
      },
      { where: { scheduleId } }
    );
  };

  // 스케줄 삭제
  deleteSchedule = async scheduleId => {
    return await Schedule.destroy({
      where: { scheduleId },
    });
  };

  // 날짜 중복 조회
  checkDateSchedule = async (date, userId, startTime, endTime) => {
    return await Schedule.findOne({
      where: {
        date,
        userId,
        [Op.or]: [
          {
            [Op.and]: [{ startTime: { [Op.gte]: startTime } }, { startTime: { [Op.lt]: endTime } }],
          },
          {
            [Op.and]: [{ endTime: { [Op.gt]: startTime } }, { endTime: { [Op.lte]: endTime } }],
          },
        ],
      },
    });
  };
}
export default ScheduleRepository;
