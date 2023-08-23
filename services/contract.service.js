import { ContractRepository } from '../repositories';
import { TrainerRepository } from '../repositories';

class ContractService {
  _contractRepository = new ContractRepository();
  _trainerRepository = new TrainerRepository();

  createContract = async (trainerId, userId) => {
    try {
      if (!trainerId) {
        return {
          status: 400,
          message: '트레이너 ID 미입력',
        };
      }

      if (!userId) {
        return {
          status: 400,
          message: '유저 ID 미입력',
        };
      }
      const trainer = await this._trainerRepository.findtrainerId(trainerId);
      if (!trainer) {
        return {
          status: 400,
          message: '존재하지 않는 트레이너 ID',
        };
      }
      const contract = await this._contractRepository.createContract(trainerId, userId);
      if (!contract) {
        return {
          status: 400,
          message: '계약 생성 실패',
        };
      }
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  getContract = async userId => {
    const getContract = await this._contractRepository.getContract(userId);
    if (!getContract) {
      return { status: 404, message: '계약이 존재하지 않습니다.' };
    }
    return { status: 200, message: getContract };
  };

  deleteContract = async contractId => {
    const deleteContract = this._contractRepository.deleteContract(contractId);
    if (!deleteContract) {
      return { status: 404, message: '계약이 존재하지 않습니다.' };
    }
    return { status: 200, message: '계약이 취소되었습니다.' };
  };
}

export default ContractService;
