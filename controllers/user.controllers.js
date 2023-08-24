import { UserService } from '../services';

class UserController {
  _userService = new UserService();
  // 회원가입
  register = async (req, res) => {
    const { email, password, passwordConfirm, type } = req.body;
    try {
      await this._userService.registerUser(
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
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { accessToken } = await this._userService.loginUser(email, password);

      res.cookie("authorization", `Bearer ${accessToken}`);

      res.status(200).json({ message: "로그인이 완료되었습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };

  //로그아웃
  logoutUser = async (req, res) => {
    try {
      await this._userService.logoutUser(req, res);
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    };
  };

  //회원탈퇴
  deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      const deleteUserData = await this._userService.deleteUser(userId);
      res.status(deleteUserData.status).json({ message: deleteUserData.message })
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };
};

export default UserController;
