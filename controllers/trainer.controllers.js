import { TrainerService } from '../services';

class TrainerController {
  _trainerService = new TrainerService();

  create = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const imageUrl = req.file.location;

      const { trainerName, career, ptContent, companyId } = req.body;
      const { code, message, data } = await this._trainerService.create(trainerName, career, ptContent, companyId, userId, imageUrl);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };

  read = async (req, res) => {
    try {
      const { companyId } = req.params;
      const { code, message, data } = await this._trainerService.read(companyId);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };

  detailRead = async (req, res) => {
    try {
      const { companyId, trainerId } = req.params;
      const { code, message, data } = await this._trainerService.detailRead(companyId, trainerId);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };

  myTrainerInfo = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { code, message, data } = await this._trainerService.myTrainerInfo(userId);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };

  delete = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { companyId, trainerId } = req.params;
      const { code, message, data } = await this._trainerService.delete(companyId, trainerId, userId);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };

  update = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const imageUrl = req.file.location;
      const { companyId, trainerId } = req.params;
      const { trainerName, career, ptContent } = req.body;
      const { code, message, data } = await this._trainerService.update(companyId, trainerId, trainerName, career, ptContent, userId, imageUrl);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };
}

export default TrainerController;
