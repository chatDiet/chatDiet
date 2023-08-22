import { User, Trainer, Company } from '../db';

class TrainerRepository {
  isOwner = async userId => {
    return await User.findByPk(userId);
  };

  findCompantId = async companyId => {
    return await Company.findByPk(companyId);
  };

  findtrainerId = async trainerId => {
    return await Trainer.findByPk(trainerId);
  };

  create = async (trainerName, career, ptContent, companyId) => {
    return await Trainer.create({ trainerName, career, ptContent, companyId });
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

  update = async (trainerId, trainerName, career, ptContent) => {
    return await Trainer.update({ trainerName, career, ptContent }, { where: { trainerId } });
  };
}

export default TrainerRepository;
