import { CalenderService } from '../services';

class CalenderController {
  calenderService = new CalenderService();

  getCalender = async (req, res) => {
    const userId = res.locals.userId;
    const { calenderId } = req.params;
    const getCalender = await this.calenderService.getCalender(userId, calenderId);
    return res.status(getCalender.status).json(getCalender.message);
  };

  getCalenders = async (req, res) => {
    const userId = res.locals.userId;
    const getCalenders = await this.calenderService.getCalenders(userId);
    return res.status(getCalenders.status).json(getCalenders.message);
  };

  createCalender = async (req, res) => {
    const userId = res.locals.userId;
    const imageUrl = req.file.location;
    const { date, title, content, type } = req.body;
    const createCalender = await this.calenderService.createCalender(date, title, content, type, userId, imageUrl);
    return res.status(createCalender.status).json(createCalender.message);
  };

  updateCalender = async (req, res) => {
    const userId = res.locals.userId;
    const { calenderId } = req.params;
    const { title, content, type } = req.body;

    const updateCalender = await this.calenderService.updateCalender(calenderId, title, content, type, userId);
    return res.status(updateCalender.status).json(updateCalender.message);
  };
  deleteCalender = async (req, res) => {
    const userId = res.locals.userId;
    const { calenderId } = req.params;

    const deleteCalender = await this.calenderService.deleteCalender(calenderId, userId);
    return res.status(deleteCalender.status).json(deleteCalender.message);
  };
}

export default CalenderController;
