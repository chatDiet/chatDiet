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

      if (!ptNumber) {
        return {
          status: 400,
          message: 'PT 횟수 미입력(숫자 입력)',
        };
      }

      if (0 >= ptNumber || ptNumber > 100) {
        return {
          status: 400,
          message: '1회 이상 또는 100회 이하',
        };
      }

      const trainer = await this._trainerRepository.getExistTrainerId(trainerId);
      if (!trainer) {
        return {
          status: 400,
          message: '존재하지 않는 트레이너 ID',
        };
      }

      const checkContract = await this._contractRepository.getContract(trainerId, userId);
      if (checkContract) {
        return {
          status: 404,
          message: '이미 계약 된 상태',
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
      if (!trainer) {
        return {
          status: 401,
          message: '트레이너 등록 필요',
        };
      }
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
  deleteContract = async (contractId, userId) => {
    const findContractData = await this._contractRepository.getContractId(contractId);

    if (!findContractData) {
      return {
        status: 404,
        message: '계약이 존재하지 않습니다.',
      };
    }

    const findUserData = await this._userRepository.getUserById(userId);

    if (findUserData.type === 'trainer') {
      const trainerData = await this._trainerRepository.findTrainer(userId);

      if (findContractData.trainerId !== trainerData.trainerId) {
        return {
          status: 401,
          message: '계약을 취소하실 권한이 존재하지 않습니다.',
        };
      }
      await this._contractRepository.deleteContract(contractId);

      return { status: 200, message: '계약이 취소되었습니다.' };
    }

    if (findContractData.userId === userId || findUserData.type === 'admin') {
      await this._contractRepository.deleteContract(contractId);

      return { status: 200, message: '계약이 취소되었습니다.' };
    } else {
      return { status: 401, message: '계약을 취소하실 권한이 존재하지 않습니다.' };
    }
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
    const contract = await this._contractRepository.getContract(data.trainer, data.user);
    if (!contract) {
      return { status: 400, message: '접근 권한 없음' };
    }
    return { status: 200, message: '접근 성공' };
  };

  // pt횟수 수정
  updateContract = async (contractId, userId) => {
    try {
      const checkTrainer = await this._userRepository.getUserById(userId);
      if (checkTrainer.type !== 'trainer') {
        return {
          status: 401,
          message: '권한 없음',
        };
      }

      const trainer = await this._trainerRepository.findTrainer(userId);
      if (!trainer) {
        return {
          status: 404,
          message: '트레이너 등록 필요',
        };
      }

      const checkContract = await this._contractRepository.getContractId(contractId);
      if (!checkContract) {
        return {
          status: 404,
          message: '존재하지 않는 계약',
        };
      }

      if (checkContract.ptNumber <= 0) {
        return {
          status: 400,
          message: 'PT 횟수 0',
        };
      }

      if (checkContract.trainerId !== trainer.trainerId) {
        return {
          status: 401,
          message: '권한 없음',
        };
      }
      const updatePtNumber = checkContract.ptNumber - 1;
      const result = await this._contractRepository.updateContract(contractId, updatePtNumber);
      if (!result) {
        return {
          status: 40,
          message: '수정 실패',
        };
      }
      return {
        status: 200,
        message: '성공',
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: 'Server error',
      };
    }
  };
}

export default ContractService;
