import { Schedule } from '../db';

class ScheduleRepository {
  // 스케줄 생성
  postSchedule = async (title, date, userId, trainerId, startTime, endTime) => {
    try {
      const result = await Schedule.create({
        trainerId,
        userId,
        title,
        date,
        startTime,
        endTime,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  // 스케줄 전체 조회
  allGetSchedule = async userId => {
    try {
      const result = await Schedule.findAll({
        where: { userId },
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  // 스케줄 상세 조회
  oneGetSchedule = async scheduleId => {
    try {
      const result = await Schedule.findOne({
        where: { scheduleId },
      });

      return result;
    } catch (err) {
      console.log(err);
    }
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
    } catch (err) {
      console.log(err);
    }
  };

  // 스케줄 삭제
  deleteSchedule = async scheduleId => {
    try {
      const result = await Schedule.destroy({
        where: { scheduleId },
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  // 날짜 중복 조회
  checkDateSchedule = async (date, userId, startTime, endTime) => {
    try {
      const result = await Schedule.findOne({
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

      return result;
    } catch (err) {
      console.log(err);
      // 오류 처리
    }
  };
}
export default ScheduleRepository;
