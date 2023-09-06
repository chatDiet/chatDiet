import { User, Trainer, Company, Contract, Schedule } from '../db';

class TrainerRepository {
  isOwner = async userId => {
    return await User.findByPk(userId);
  };

  findCompantId = async companyId => {
    return await Company.findOne({ where: { companyId } });
  };

  findOwner = async userId => {
    return await Company.findOne({ where: { userId } });
  };

  getExistTrainerId = async trainerId => {
    return await Trainer.findAll({ where: { trainerId } });
  };

  findtrainerId = async (trainerId, companyId) => {
    return await Trainer.findOne({ where: { trainerId, companyId } });
  };

  findTrainer = async userId => {
    return await Trainer.findOne({ where: { userId } });
  };

  create = async (trainerName, career, ptContent, companyId, userId, imageUrl) => {
    return await Trainer.create({ trainerName, career, ptContent, companyId, userId, imageUrl });
  };

  read = async companyId => {
    return await Trainer.findAll({ where: { companyId } });
  };

  detailRead = async trainerId => {
    return await Trainer.findOne({ where: { trainerId } });
  };

  delete = async trainerId => {
    await Trainer.destroy({ where: { trainerId } });
  };

  update = async (trainerId, trainerName, career, ptContent, imageUrl) => {
    return await Trainer.update({ trainerName, career, ptContent, imageUrl }, { where: { trainerId } });
  };
}

export default TrainerRepository;
