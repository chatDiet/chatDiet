import { TrainerRepository, UserRepository } from '../repositories';

class TrainerService {
  _trainerRepository = new TrainerRepository();
  _userRepository = new UserRepository();

  create = async (trainerName, career, ptContent, ptAmount, companyId, userId, imageUrl) => {
    await this.isEmpty(trainerName, career, ptContent, ptAmount, imageUrl);

    await this.checkUsertype(userId);

    await this.checkCompany(companyId);
    return {
      code: 200,
      data: await this._trainerRepository.create(trainerName, career, ptContent, ptAmount, companyId, userId, imageUrl),
    };
  };

  read = async companyId => {
    await this.checkCompany(companyId);
    return {
      code: 200,
      data: await this._trainerRepository.read(companyId),
    };
  };

  detailRead = async (companyId, trainerId) => {
    await this.checkCompany(companyId);

    const trainer = await this.checkTrainer(trainerId, companyId);

    return {
      code: 200,
      data: trainer,
    };
  };

  myTrainerInfo = async userId => {
    await this.checkUsertype(userId);

    const trainer = await this._trainerRepository.findTrainer(userId);
    if (!trainer) {
      return {
        code: 404,
        message: '조회 실패',
      };
    }
    return {
      code: 200,
      data: trainer,
    };
  };

  delete = async (companyId, trainerId, userId) => {
    await this.checkUsertype(userId);
    const findOwner = await this._trainerRepository.findOwner(userId);
    if (findOwner.userId != userId) {
      return {
        code: 401,
        message: '해당 헬스장의 사장님만 트레이너를 삭제할 수 있습니다',
      };
    }
    await this.checkCompany(companyId);

    const trainer = await this.checkTrainer(trainerId, companyId);

    if (trainer.userId != userId) {
      return {
        code: 401,
        message: '트레이너 자신의 정보만 수정할 수 있습니다.',
      };
    }

    await this._trainerRepository.delete(trainerId);

    return {
      code: 200,
      message: '트레이너 삭제가 완료 되었습니다',
    };
  };

  update = async (companyId, trainerId, trainerName, career, ptContent, ptAmount, userId, imageUrl) => {
    try {
      await this.isEmpty(trainerName, career, ptContent, ptAmount, imageUrl);

      await this.checkCompany(companyId);

      await this.checkUsertype(userId);

      const trainer = await this.checkTrainer(trainerId, companyId);

      if (trainer.userId != userId) {
        return {
          code: 401,
          message: '트레이너 자신의 정보만 수정할 수 있습니다.',
        };
      }

      const result = await this._trainerRepository.update(trainerId, trainerName, career, ptContent, ptAmount, imageUrl);
      return {
        code: 200,
        data: result,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        data: 'Server Error',
      };
    }
  };

  isEmpty = async (trainerName, career, ptContent, ptAmount, imageUrl) => {
    try {
      if (!trainerName) {
        return {
          code: 401,
          message: '트레이너 이름 미입력.',
        };
      }
      if (!career) {
        return {
          code: 401,
          message: '경력 미입력',
        };
      }
      if (!ptContent) {
        return {
          code: 401,
          message: '수업내용 미입력',
        };
      }
      if (!ptAmount) {
        return {
          code: 401,
          message: '수업 가격 미입력',
        };
      }
      if (!imageUrl) {
        return {
          code: 401,
          message: '이미지 미입력',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        data: 'Server Error',
      };
    }
  };
  checkCompany = async companyId => {
    try {
      const Company = await this._trainerRepository.findCompantId(companyId);

      if (!Company) {
        return {
          code: 404,
          message: '해당하는 헬스장이 존재하지 않습니다.',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        data: 'Server Error',
      };
    }
  };
  checkUsertype = async userId => {
    try {
      const user = await this._userRepository.getUserById(userId);
      if (user.type !== 'trainer') {
        return {
          code: 401,
          message: '조회 권한 없음',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        data: 'Server Error',
      };
    }
  };
  checkTrainer = async (trainerId, companyId) => {
    try {
      const trainer = await this._trainerRepository.findtrainerId(trainerId, companyId);
      if (!trainer) {
        return {
          code: 404,
          message: '해당 트레이너가 존재하지 않습니다.',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        data: 'Server Error',
      };
    }
  };
}

export default TrainerService;
