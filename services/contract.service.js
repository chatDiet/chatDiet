import { ContractRepository, TrainerRepository, UserRepository } from '../repositories';

class ContractService {
  _contractRepository = new ContractRepository();
  _trainerRepository = new TrainerRepository();
  _userRepository = new UserRepository();

  // 계약 생성
  createContract = async (trainerId, userId, ptNumber) => {
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

      if (!ptNumber) {
        return {
          status: 400,
          message: 'PT 횟수 미입력',
        };
      }
      const trainer = await this._trainerRepository.findtrainerId(trainerId);
      if (!trainer) {
        return {
          status: 400,
          message: '존재하지 않는 트레이너 ID',
        };
      }

      const contract = await this._contractRepository.createContract(trainerId, userId, ptNumber);
      if (!contract) {
        return {
          status: 400,
          message: '계약 생성 실패',
        };
      }
      return {
        status: 200,
        message: '계약 생성',
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };

  // 로그인한 유저 계약 조회
  getContract = async userId => {
    // 로그인 한 유저가 트레이너 인지 확인
    const user = await this._userRepository.getUserById(userId);
    if (user.type === 'trainer') {
      // 트레이너 정보 가져오기
      const trainer = await this._trainerRepository.findTrainer(userId);
      // 트레이너 ID로 계약 테이블 조회
      const getTrainerContract = await this._contractRepository.getTrainerContract(trainer.trainerId);
      return { status: 200, message: getTrainerContract };
    } else {
      // 유저ID로 계약 테이블 조회
      const getUserContract = await this._contractRepository.getUserContract(userId);
      return { status: 200, message: getUserContract };
    }
  };

  // 계약 삭제
  deleteContract = async contractId => {
    const deleteContract = this._contractRepository.deleteContract(contractId);
    if (!deleteContract) {
      return { status: 404, message: '계약이 존재하지 않습니다.' };
    }
    return { status: 200, message: '계약이 취소되었습니다.' };
  };

  // 계약 채팅방 접근 권한 조회
  authContract = async (data, userId) => {
    if (!data) {
      return {
        status: 400,
        message: '접근 권한 없음',
      };
    }

    const user = await this._userRepository.getUserById(userId);
    if (user.type === 'trainer') {
      const trainer = await this._trainerRepository.findTrainer(userId);
      if (trainer.trainerId != data.trainer) {
        return { status: 400, message: '접근 권한 없음' };
      }
    }

    if (user.type === 'user') {
      if (userId != data.user) {
        return { status: 400, message: '접근 권한 없음' };
      }
    }

    if (data.roomId !== data.user + data.trainer) {
      return { status: 400, message: '접근 권한 없음' };
    }

    const contract = await this._contractRepository.getContract(data.user, data.trainer);
    if (!contract) {
      return { status: 400, message: '접근 권한 없음' };
    }
    return { status: 200, message: 'test' };
  };
}

export default ContractService;
