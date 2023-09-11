import { Contract, User, UserInfo } from '../db';

class ContractRepository {
  createContract = async (trainerId, userId, ptNumber) => {
    return await Contract.create({
      trainerId,
      userId,
      ptNumber,
    });
  };

  getContractId = async contractId => {
    return await Contract.findOne({ where: { contractId } });
  };

  getUserContract = async userId => {
    return await Contract.findAll({ where: { userId } });
  };

  getTrainerContract = async trainerId => {
    return await Contract.findAll({
      where: { trainerId },
      include: [
        {
          model: User,
          include: [
            {
              model: UserInfo,
              attributes: ['userName'],
            },
          ],
        },
      ],
    });
  };

  getContract = async (trainerId, userId) => {
    return await Contract.findOne({ where: { trainerId, userId } });
  };

  deleteContract = async contractId => {
    return await Contract.destroy({ where: { contractId } });
  };

  updateContract = async (contractId, updatePtNumber) => {
    return await Contract.update({ ptNumber: updatePtNumber }, { where: { contractId } });
  };
}

export default ContractRepository;
