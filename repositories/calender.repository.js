import { User } from '../db';
import Calender from '../db/models/calender';

class CalenderRepository {
  getCalenderId = async userId => {
    return await Calender.findOne({ where: { userId } });
  };

  isUser = async userId => {
    return await User.findOne({ where: { userId } });
  };

  getCalender = async calenderId => {
    const getCalender = await Calender.findOne({ where: { calenderId } });
    return getCalender;
  };

  getCalenders = async userId => {
    const alenders = await Calender.findAll({ where: { userId } });
    return alenders;
  };

  createCalender = async (date, title, content, type, userId, imageUrl) => {
    const createCalender = await Calender.create({ date, title, content, type, userId, imageUrl });
    return createCalender;
  };
  isMe = async (calenderId, userId) => {
    const a = await Calender.findOne({ where: { calenderId, userId } });
    return a;
  };

  updateCalender = async (calenderId, title, content, type) => {
    await Calender.update({ title, content, type }, { where: { calenderId } });
    const updateCalender = await Calender.findOne({ where: { calenderId } });
    return updateCalender;
  };
  deleteCalender = async calenderId => {
    await Calender.destroy({ where: { calenderId } });
  };
}

export default CalenderRepository;
