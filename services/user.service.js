import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories';

class UserService {
  _userRepository = new UserRepository();

  //회원가입
  async registerUser(email, password, passwordConfirm, type, loginType, userName, height, weight, phone) {

    const result = await this._userRepository.findUserByEmail(email);

    //카카오 회원가입이 이미 존재하면 토큰 새로 발급
    if (result && loginType === false) {
      let password = null;
      return await this.loginUser(email, password, loginType);
    };

    //카카오로 로그인이면
    if (!result && loginType === false) {
      return await this._userRepository.registerUser(email, password, type, loginType);
    };
    if (!email) {
      throw new Error('이메일을 입력해주세요');
    };

    if (!password) {
      throw new Error('비밀번호를 입력해주세요');
    };

    if (!passwordConfirm) {
      throw new Error('비밀번호가 일치하지 않습니다');
    };

    if (result) {
      throw new Error('중복된 이메일입니다.');
    };

    if (password !== passwordConfirm) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this._userRepository.registerUser(userName, 
      height, 
      weight, 
      phone,email, hashedPassword, type, loginType);

    return newUser;
  }

  // 로그인
  async loginUser(email, password, loginType) {
    const user = await this._userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("회원정보가 일치하지 않습니다.");
    };


    if (loginType === null) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('회원정보가 일치하지 않습니다.');
      }
    }

    const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIREIN,
    });

    return { accessToken }; // token과 userId 값을 같이 반환합니다.
  }

  // 로그아웃
  async logoutUser(req, res) {
    await this._userRepository.logoutUser(req, res);

  }
  // 회원탈퇴
  async deleteUser(userId) {
    const existUserData = await this._userRepository.getUserById(userId);

    if (!existUserData) {
      return {
        status: 404,
        message: '사용자를 찾을 수 없습니다.',
      };
    } else {
      await this._userRepository.deleteUser(userId);
      return {
        status: 200,
        message: '회원탈퇴를 완료하였습니다.',
      };
    }
  }
}
export default UserService;
