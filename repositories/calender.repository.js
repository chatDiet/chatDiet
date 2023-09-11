import Calender from '../db/models/calender';

class CalenderRepository {
  getCalenderId = async userId => {
    return await Calender.findOne({ where: { userId } });
  };

  getCalender = async calenderId => {
    return await Calender.findOne({ where: { calenderId } });
  };

  getCalenders = async userId => {
    return await Calender.findAll({ where: { userId } });
  };

  createCalender = async (date, title, content, type, userId, imageUrl) => {
    return await Calender.create({ date, title, content, type, userId, imageUrl });
  };

  isMe = async (calenderId, userId) => {
    return await Calender.findOne({ where: { calenderId, userId } });
  };

  updateCalender = async (calenderId, title, content, type) => {
    return await Calender.update({ title, content, type }, { where: { calenderId } });
  };

  deleteCalender = async calenderId => {
    return await Calender.destroy({ where: { calenderId } });
  };
}

export default CalenderRepository;
