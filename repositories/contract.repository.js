import { Contract } from '../db';

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
    try {
      const getUserContract = await Contract.findAll({ where: { userId } });
      return getUserContract;
    } catch (err) {}
  };

  getTrainerContract = async trainerId => {
    try {
      const getTrainerContract = await Contract.findAll({ where: { trainerId } });
      return getTrainerContract;
    } catch (err) {}
  };

  getContract = async (userId, trainerId) => {
    try {
      const getTrainerContract = await Contract.findOne({ where: { userId, trainerId } });
      return getTrainerContract;
    } catch (err) {}
  };

  deleteContract = async contractId => {
    const contract = await Contract.destroy({ where: { contractId } });
    return contract;
  };
}

export default ContractRepository;
