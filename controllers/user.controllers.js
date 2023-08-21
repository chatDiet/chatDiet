import { UserService } from '../services';
const userService = new UserService();

class UserController {
  // 회원가입
  async register(req, res) {
    const { nickname, email, password, passwordConfirm, type } = req.body;
    try {
      await userService.registerUser(
        nickname,
        email,
        password,
        passwordConfirm,
        type,
      );
      res.status(201).json({ message: "회원가입에 성공했습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };

  // 로그인
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const { token, userId } = await userService.loginUser(email, password);
      console.log(token);
      res.cookie("authorization", `Bearer ${token}`);
      res.status(200).json({ message: "로그인 성공" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };

  //로그아웃
  async logoutUser(req, res) {
    try {
      await userService.logoutUser(req, res);
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    };
  };

  //회원탈퇴
  async deleteUser(req, res) {
    const userId = req.params.userId;
    try {
      const deleteUserData = await userService.deleteUser(userId);
      res.status(deleteUserData.status).json({ message: deleteUserData.message })
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
};

export default UserController;
