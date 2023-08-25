import { ScheduleService } from '../services';

class ScheduleController {
  _scheduleService = new ScheduleService();

  // 스케줄 생성
  postSchedule = async (req, res) => {
    const { title, date } = req.body;

    const result = await this._scheduleService.postSchedule(title, date);

    return res.status(result.status).json(result.message);
  };

  // 스케줄 상세 조회
  oneGetSchedule = async (req, res) => {
    const { scheduleId } = req.params;

    const result = await this._scheduleService.oneGetSchedule(scheduleId);

    return res.status(result.status).json(result.message);
  };

  // 스케줄 수정
  putSchedule = async (req, res) => {
    const { scheduleId } = req.params;

    const { title, date } = req.body;

    const result = await this._scheduleService.putSchedule(scheduleId, title, date);

    return res.status(result.status).json(result.message);
  };

  // 스케줄 삭제
  deleteSchedule = async (req, res) => {
    const { scheduleId } = req.params;

    const result = await this._scheduleService.deleteSchedule(scheduleId);

    return res.status(result.status).json(result.message);
  };
}

export default ScheduleController;
