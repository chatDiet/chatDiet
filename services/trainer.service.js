import { TrainerRepository, UserRepository } from '../repositories';

class TrainerService {
  _trainerRepository = new TrainerRepository();
  _userRepository = new UserRepository();

  create = async (trainerName, career, ptContent, companyId, userId, imageUrl) => {
    const isOwner = await this._trainerRepository.isOwner(userId);
    if (isOwner.type != 'trainer') {
      return {
        code: 401,
        message: '트레이너 등록 권한이 존재하지 않습니다.',
      };
    }

    if (!trainerName) {
      return {
        code: 400,
        message: '트레이너의 이름을 입력해주세요',
      };
    }

    if (!career) {
      return {
        code: 400,
        message: '트레이너의 커리어를 입력해주세요',
      };
    }

    if (!ptContent) {
      return {
        code: 400,
        message: '수업 내용을 입력해주세요',
      };
    }

    if (!imageUrl) {
      return {
        code: 400,
        message: '트레이너의 사진을 입력해주세요',
      };
    }
    const Company = await this._trainerRepository.findCompantId(companyId);
    if (!Company) {
      return {
        code: 404,
        message: '해당하는 헬스장이 존재하지 않습니다.',
      };
    }
    return {
      code: 200,
      data: await this._trainerRepository.create(trainerName, career, ptContent, companyId, userId, imageUrl),
    };
  };

  read = async companyId => {
    const Company = await this._trainerRepository.findCompantId(companyId);

    if (!Company) {
      return {
        code: 404,
        message: '해당하는 헬스장이 존재하지 않습니다.',
      };
    }
    return {
      code: 200,
      data: await this._trainerRepository.read(companyId),
    };
  };

  detailRead = async (companyId, trainerId) => {
    const Company = await this._trainerRepository.findCompantId(companyId);
    if (!Company) {
      return {
        code: 404,
        message: '해당 헬스장이 존재하지 않습니다.',
      };
    }

    const trainer = await this._trainerRepository.findtrainerId(trainerId, companyId);
    if (!trainer) {
      return {
        code: 404,
        message: '해당 트레이너가 존재하지 않습니다.',
      };
    }
    return {
      code: 200,
      data: await this._trainerRepository.detailRead(trainerId),
    };
  };

  myTrainerInfo = async userId => {
    const user = await this._userRepository.getUserById(userId);
    if (user.type !== 'trainer') {
      return {
        code: 401,
        message: '조회 권한 없음',
      };
    }

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
    const isOwner = await this._trainerRepository.isOwner(userId);
    if (isOwner.type != 'owner') {
      return {
        code: 401,
        message: '트레이너 삭제 권한이 존재하지 않습니다',
      };
    }
    const findOwner = await this._trainerRepository.findOwner(userId);
    if (findOwner.userId != userId) {
      return {
        code: 401,
        message: '해당 헬스장의 사장님만 트레이너를 삭제할 수 있습니다',
      };
    }
    const Company = await this._trainerRepository.findCompantId(companyId);
    if (!Company) {
      return {
        code: 404,
        message: '해당 헬스장이 존재하지 않습니다.',
      };
    }
    const trainer = await this._trainerRepository.findtrainerId(trainerId, companyId);
    if (!trainer) {
      return {
        code: 404,
        message: '해당 트레이너가 존재하지 않습니다.',
      };
    }

    const result = await this._trainerRepository.delete(trainerId);

    return {
      code: 200,
      message: '트레이너 삭제가 완료 되었습니다',
    };
  };

  update = async (companyId, trainerId, trainerName, career, ptContent, userId, imageUrl) => {
    if (!trainerName) {
      return {
        code: 400,
        message: '트레이너의 이름을 입력해주세요',
      };
    }

    if (!career) {
      return {
        code: 400,
        message: '트레이너의 커리어를 입력해주세요',
      };
    }

    if (!ptContent) {
      return {
        code: 400,
        message: '수업 내용을 입력해주세요',
      };
    }

    const Company = await this._trainerRepository.findCompantId(companyId);

    if (!Company) {
      return {
        code: 404,
        message: '해당하는 헬스장이 존재하지 않습니다.',
      };
    }

    const trainer = await this._trainerRepository.findtrainerId(trainerId, companyId);
    if (!trainer) {
      return {
        code: 404,
        message: '해당 트레이너가 존재하지 않습니다.',
      };
    }

    if (trainer.userId != userId) {
      return {
        code: 401,
        message: '트레이너 자신의 정보만 수정할 수 있습니다.',
      };
    }

    const result = await this._trainerRepository.update(trainerId, trainerName, career, ptContent, imageUrl);
    return {
      code: 200,
      data: result,
    };
  };
}

export default TrainerService;
