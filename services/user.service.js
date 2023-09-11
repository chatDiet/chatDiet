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
        userInfoId: result.userInfoId,
        userName: result.userName,
        height: result.height,
        weight: result.weight,
        phone: result.phone,
      },
    };
  }

  async findOneUserInfo(userId) {
    const result = await this._userRepository.getOneUserInfo(userId);
    return { status: 200, data: result };
  }
  // 유저 정보 수정
  async updateUserInfo(userId, userInfoId, userName, height, weight, phone) {
    try {
      const checkUserInfo = await this._userRepository.getOneUserInfo(userInfoId);

      if (userId !== checkUserInfo.userId) {
        return {
          status: 401,
          message: '수정 권한 없음',
        };
      }

      if (!userName) {
        return {
          status: 400,
          message: '이름 미입력',
        };
      }

      const result = await this._userRepository.updateUserInfo(userInfoId, userName, height, weight, phone);

      if (!result) {
        return {
          status: 404,
          message: '수정 실패',
        };
      }

      return {
        status: 200,
        message: '수정 완료',
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  }

  // 회원가입
  async registerUser(email, type, loginType, password, passwordConfirm, userName, height, weight, phone) {
    try {
      if (!email) {
        return {
          status: 400,
          message: '이메일 미입력',
        };
      }

      const checkEmail = await this._userRepository.findUserByEmail(email);
      // 카카오 회원가입 유무 확인
      if (checkEmail && loginType === false) {
        // 회원가입 한 적 있을 경우 로그인.
        return await this.loginUser(email, loginType);
      }

      // 카카오 회원가입
      if (!checkEmail && loginType === false) {
        if (type === 'trainer' || type === 'user' || type === 'owner' || type === 'admin') {
          const newUser = await this._userRepository.registerUser(email, type, loginType);

          if (!newUser) {
            return {
              status: 404,
              message: '회원가입 실패',
            };
          }
          return {
            status: 200,
            message: '회원가입 성공',
          };
        } else {
          return {
            status: 400,
            message: 'type = user, trainer, owner, admin 만 가능',
          };
        }
      }

      if (checkEmail) {
        return {
          status: 409,
          message: '중복된 이메일',
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
      if (!type) {
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

      if (type === 'trainer' || type === 'user' || type === 'owner' || type === 'admin') {
        const checkPhoneNumber = await this._userRepository.checkPhoneNumber(phone);

        if (checkPhoneNumber) {
          return {
            status: 409,
            message: '중복된 연락처',
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this._userRepository.registerUser(email, type, loginType, userName, height, weight, phone, hashedPassword);
        if (!newUser) {
          return {
            status: 404,
            message: '회원가입 실패',
          };
        }
        return {
          status: 200,
          message: '회원가입 성공',
        };
      } else {
        return {
          status: 400,
          message: 'type = user, trainer, owner, admin 만 가능',
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
  async loginUser(email, password) {
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
          status: 404,
          message: '존재하지 않는 이메일',
        };
      }

      const loginType = user.loginType;

      if (loginType === true) {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return {
            status: 404,
            message: '이메일, 패스워드 불일치',
          };
        }
      }

      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREIN,
      });

      if (!token) {
        return {
          status: 404,
          message: '토큰 생성 실패',
        };
      }
      const userType = user.type;
      return {
        status: 200,
        message: userType,
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
    try {
      await this._userRepository.logoutUser(req, res);
      return {
        status: 200,
        message: '회원 로그아웃 성공',
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Server Error',
      };
    }
  }

  // 회원탈퇴
  async deleteUser(userId) {
    try {
      const existUserData = await this._userRepository.getUserById(userId);

      if (!existUserData) {
        return {
          status: 404,
          message: '존재하지 않는 유저 ID',
        };
      }

      const result = await this._userRepository.deleteUser(userId);
      if (!result) {
        return {
          status: 404,
          message: '회원 탈퇴 실패',
        };
      }
      return {
        status: 200,
        message: '회원 탈퇴 성공',
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
