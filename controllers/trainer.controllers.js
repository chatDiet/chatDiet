import { TrainerService } from '../services';

class TrainerController {
  _trainerService = new TrainerService();

  create = async (req, res) => {
    try {
      // const {userId} = req.user;
      const { companyId } = req.params;
      const { trainerName, career, ptContent } = req.body;
      const { code, message, data } = await this._trainerService.create(trainerName, career, ptContent, companyId);

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

  delete = async (req, res) => {
    try {
      // const {userId} = req.user;
      const { companyId, trainerId } = req.params;
      const { code, message, data } = await this._trainerService.delete(companyId, trainerId);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };

  update = async (req, res) => {
    try {
      // const {userId} = req.user;
      const { companyId, trainerId } = req.params;
      const { trainerName, career, ptContent } = req.body;
      const { code, message, data } = await this._trainerService.update(companyId, trainerId, trainerName, career, ptContent);

      res.status(code).json({ ...(message && { message }), ...(data && { data }) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  };
}

export default TrainerController;
