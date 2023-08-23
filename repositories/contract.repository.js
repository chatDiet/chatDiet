import { Contract } from '../db';

class ContractRepository {
  createContract = async (trainerId, userId) => {
    const contract = await Contract.create({
      trainerId,
      userId,
    });
    return contract;
  };
  getContract = async userId => {
    const getContract = await Contract.findAll({ where: { userId } });
    return getContract;
  };

  deleteContract = async contractId => {
    const contract = await Contract.destroy({ where: { contractId } });
    return contract;
  };
}

export default ContractRepository;
