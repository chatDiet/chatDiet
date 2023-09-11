import { CalenderRepository, ContractRepository, TrainerRepository, UserRepository } from '../repositories';

class CalenderService {
  _calenderRepository = new CalenderRepository();
  _contractRepository = new ContractRepository();
  _trainerRepository = new TrainerRepository();
  _userRepository = new UserRepository();

  getCalender = async (userId, calenderId) => {
    const getCalender = await this._calenderRepository.getCalender(calenderId);
    if (getCalender == null) {
      return { status: 400, message: '작성된 캘린더가 존재하지 않습니다.' };
    }

    const user = await this._userRepository.getUserById(userId);
    if (user.type === 'trainer') {
      const trainer = await this._trainerRepository.findTrainer(userId);
      const contrack = await this._contractRepository.getContract(trainer.trainerId, getCalender.userId);
      if (!contrack) {
        return { status: 401, message: '권한 없는 유저' };
      }
      return { status: 200, message: getCalender };
    }

    if (user.type !== 'user') {
      return { status: 401, message: '권한 없는 유저' };
    }

    if (getCalender.userId !== userId) {
      return { status: 401, message: '권한 없는 유저' };
    }

    return { status: 200, message: getCalender };
  };

  getCalenders = async userId => {
    try {
      const calenders = await this._calenderRepository.getCalenders(userId);
      if (calenders == null) {
        return { status: 400, message: '작성된 캘린더가 존재하지 않습니다.' };
      }
      return { status: 200, message: calenders };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'server error' };
    }
  };

  userCalender = async (userId, user) => {
    try {
      if (!user) {
        return { status: 400, message: '유저 아이디 미입력' };
      }

      const trainer = await this._trainerRepository.findTrainer(userId);
      if (!trainer) {
        return { status: 400, message: '트레이너 미등록' };
      }

      const checkContrack = await this._contractRepository.getContract(trainer.trainerId, user);
      if (!checkContrack) {
        return { status: 400, message: '계약되지 않은 유저' };
      }

      const userCalender = await this._calenderRepository.getCalenders(user);
      if (!userCalender) {
        return { status: 400, message: '계약되지 않은 유저' };
      }

      return {
        status: 200,
        message: userCalender,
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'server error' };
    }
  };
  createCalender = async (date, title, content, type, userId, imageUrl) => {
    try {
      if (!title) {
        return { status: 400, message: '캘린더 제목을 입력해주세요' };
      }
      if (!content) {
        return { status: 400, message: '캘린더 내용을 입력해주세요' };
      }
      if (!type) {
        return { status: 400, message: '캘린더 타입을 입력해주세요' };
      }

      const createCalender = await this._calenderRepository.createCalender(date, title, content, type, userId, imageUrl);
      return { status: 200, message: createCalender };
    } catch (err) {
      console.log(err);
      return { status: 500, message: 'Server error' };
    }
  };
  updateCalender = async (calenderId, title, content, type, userId) => {
    const isUser = await this._calenderRepository.isMe(calenderId, userId);
    if (!isUser) {
      return {
        status: 401,
        message: '자신의 캘린더만 수정할 수 있습니다',
      };
    }

    const updateCalender = await this._calenderRepository.updateCalender(calenderId, title, content, type);
    return { status: 200, message: updateCalender };
  };
  deleteCalender = async (calenderId, userId) => {
    const isUser = await this._calenderRepository.isMe(calenderId, userId);
    if (!isUser) {
      return {
        status: 401,
        message: '자신의 캘린더만 삭제할 수 있습니다',
      };
    }

    if (calenderId == null) {
      return { status: 400, message: '작성된 캘린더가 존재하지 않습니다.' };
    }
    await this._calenderRepository.deleteCalender(calenderId);

    return { status: 200, message: '캘린더가 삭제되었습니다.' };
  };
}

export default CalenderService;
