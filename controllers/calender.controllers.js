import { CalenderService } from '../services';

class CalenderController {
  calenderService = new CalenderService();

  getCalender = async (req, res) => {
    const { calenderId } = req.params;

    const getCalender = await this.calenderService.getCalender(calenderId);
    return res.status(getCalender.status).json(getCalender.message);
  };

  createCalender = async (req, res) => {
    const { title, content, type } = req.body;

    const createCalender = await this.calenderService.createCalender(title, content, type);
    return res.status(createCalender.status).json(createCalender.message);
  };

  updateCalender = async (req, res) => {
    const { calenderId } = req.params;
    const { title, content, type } = req.body;

    const updateCalender = await this.calenderService.updateCalender(calenderId, title, content, type);
    return res.status(updateCalender.status).json(updateCalender.message);
  };
  deleteCalender = async (req, res) => {
    const { calenderId } = req.params;

    const deleteCalender = await this.calenderService.deleteCalender(calenderId);
    return res.status(deleteCalender.status).json(deleteCalender.message);
  };
}

export default CalenderController;
