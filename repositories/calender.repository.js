import Calender from '../db/models/calender';

class CalenderRepository {
  getCalender = async calenderId => {
    const getCalender = await Calender.findOne({ where: { calenderId } });
    return getCalender;
  };

  createCalender = async (title, content, type) => {
    const createCalender = await Calender.create({ title, content, type });
    return createCalender;
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
