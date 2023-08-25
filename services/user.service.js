import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories';

class UserService {
  _userRepository = new UserRepository();

  // 유저 정보 조회
  async getOneUserInfo(userId) {
    const result = await this._userRepository.getOneUserInfo(userId);

    return {
      status: 200,
      data: {
        userName: result.userName,
        height: result.height,
        weight: result.weight,
        phone: result.phone,
      },
    };
  }

  //회원가입
  async registerUser(email, password, passwordConfirm, type, loginType, userName, height, weight, phone) {
    try {
      if (!email) {
        return {
          status: 400,
          message: '이메일 미입력',
        };
      }

      const checkEmail = await this._userRepository.findUserByEmail(email);

      if (checkEmail) {
        return {
          status: 400,
          message: '중복된 이메일',
        };
      }

      // 카카오 회원가입 유무 확인
      if (checkEmail && loginType === false) {
        let password = null;
        // 회원가입 한 적 있을 경우 로그인.
        return await this.loginUser(email, password, loginType);
      }

      // 카카오 회원가입
      if (!checkEmail && loginType === false) {
        const newUser = await this._userRepository.registerUser(email, password, type, loginType);
        if (!newUser) {
          return {
            status: 400,
            message: '회원가입 실패',
          };
        }
        return {
          status: 400,
          message: '회원가입 성공',
        };
      }

      if (!password) {
        return {
          status: 400,
          message: '비밀번호 미입력',
        };
      }

      if (!passwordConfirm || password !== passwordConfirm) {
        return {
          status: 400,
          message: '비밀번호 불일치',
        };
      }

      if (!type || !type.includes('user', 'trainer', 'owner', 'admin')) {
        return {
          status: 400,
          message: 'TYPE 미입력',
        };
      }

      if (!userName) {
        return {
          status: 400,
          message: '이름 미입력',
        };
      }

      if (!height) {
        return {
          status: 400,
          message: '키 미입력',
        };
      }

      if (!weight) {
        return {
          status: 400,
          message: '몸무게 미입력',
        };
      }

      if (!phone) {
        return {
          status: 400,
          message: '연락처 미입력',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this._userRepository.registerUser(userName, height, weight, phone, email, hashedPassword, type, loginType);
      if (!newUser) {
        return {
          status: 400,
          message: '회원가입 성공',
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  }

  // 로그인
  async loginUser(email, password, loginType) {
    try {
      if (!email) {
        return {
          status: 400,
          message: '이메일 미입력',
        };
      }

      const user = await this._userRepository.findUserByEmail(email);

      if (!user) {
        return {
          status: 400,
          message: '존재하지 않는 이메일',
        };
      }

      if (loginType === null) {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return {
            status: 400,
            message: '회원정보가 일치하지 않습니다.',
          };
        }
      }

      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREIN,
      });

      if (!token) {
        return {
          status: 400,
          message: '토큰 생성 실패',
        };
      }

      return {
        status: 400,
        message: '로그인 성공',
        data: token,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  }

  // 로그아웃
  async logoutUser(req, res) {
    await this._userRepository.logoutUser(req, res);
  }

  // 회원탈퇴
  async deleteUser(userId) {
    try {
      const existUserData = await this._userRepository.getUserById(userId);

      if (!existUserData) {
        return {
          status: 404,
          message: '사용자를 찾을 수 없습니다.',
        };
      }

      await this._userRepository.deleteUser(userId);
      return {
        status: 200,
        message: '회원탈퇴를 완료하였습니다.',
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  }
}
export default UserService;
