import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from '../repositories';
const _userRepository = new UserRepository();

class UserService {
  async registerUser(nickname, email, password, passwordConfirm, type) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await _userRepository.registerUser(
      nickname,
      email,
      hashedPassword,
      type,
    );

    if (!newUser) {
      throw new Error("중복된 이메일입니다.");
    }

    if (password !== passwordConfirm) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    return newUser;
  }

  // 로그인
  async loginUser(email, password) {
    const user = await _userRepository.findUserByEmail(email);
    console.log(user.userId)
    if (!user) {
      throw new Error("회원정보가 일치하지 않습니다.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("회원정보가 일치하지 않습니다.");
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIREIN,
    });
    
    console.log("토큰 생성 완료");

    return { token, userId: user.userId }; // token과 userId 값을 같이 반환합니다.
  }

  // 로그아웃
  async logoutUser(req, res) {
    await _userRepository.logoutUser(req, res);
  }

  // 회원탈퇴
  async deleteUser(userId) {
    const existUserData = await _userRepository.getUserById(userId);
    if (!existUserData) {
      return {
        status: 404,
        message: "사용자를 찾을 수 없습니다.",
      }
    } else {
      await _userRepository.deleteUser(userId);
      return {
        status: 200,
        message: "회원탈퇴를 완료하였습니다.",
      };
    };
  };
};
export default UserService;
