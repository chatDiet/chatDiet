import { Schedule } from '../db';

class ScheduleRepository {
  postSchedule = async (title, date) => {
    try {
      const result = await Schedule.create({
        title,
        date,
      });

      return result;
    } catch (err) {}
  };

  oneGetSchedule = async scheduleId => {
    try {
      const result = await Schedule.findOne({
        where: { scheduleId },
      });

      return result;
    } catch (err) {}
  };

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

  deleteSchedule = async scheduleId => {
    try {
      const result = await Schedule.destroy({
        where: { scheduleId },
      });

      return result;
    } catch (err) {}
  };
}

export default ScheduleRepository;
