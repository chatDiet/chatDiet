import { Contract, User, UserInfo } from '../db';

class ContractRepository {
  createContract = async (trainerId, userId, ptNumber) => {
    const contract = await Contract.create({
      trainerId,
      userId,
      ptNumber,
    });
    return contract;
  };

  getContractId = async contractId => {
    return await Contract.findOne({ where: { contractId } });
  };

  getUserContract = async userId => {
    const getUserContract = await Contract.findAll({ where: { userId } });
    return getUserContract;
  };

  getTrainerContract = async trainerId => {
    const getTrainerContract = await Contract.findAll({
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
    return getTrainerContract;
  };

  getContract = async (trainerId, userId) => {
    const getTrainerContract = await Contract.findOne({ where: { trainerId, userId } });
    return getTrainerContract;
  };

  deleteContract = async contractId => {
    const contract = await Contract.destroy({ where: { contractId } });
    return contract;
  };

  updateContract = async contractId => {
    const result = await Contract.update({ ptNumber: -1 }, { where: { contractId } });
    return result;
  };
}

export default ContractRepository;
