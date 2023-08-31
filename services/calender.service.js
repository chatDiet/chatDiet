import { CalenderRepository } from '../repositories';

class CalenderService {
  _calenderRepository = new CalenderRepository();

  getCalender = async (userId, calenderId) => {
    const isUser = await this._calenderRepository.isMe(calenderId, userId);
    if (!isUser) {
      return {
        status: 401,
        message: '자신의 캘린더만 조회할 수 있습니다',
      };
    }
    const getCalender = await this._calenderRepository.getCalender(calenderId);
    if (getCalender == null) {
      return { status: 400, message: '작성된 캘린더가 존재하지 않습니다.' };
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
      return { status: 400, message: error };
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
