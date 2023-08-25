import { UserService } from '../services';

class UserController {
  _userService = new UserService();

  // 유저 정보 조회
  getOneUserInfo = async (req, res) => {
    const userId = res.locals.userId;

    try {
      const userInfo = await this._userService.getOneUserInfo(userId);

      res.status(userInfo.status).json({ data: userInfo.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 회원가입
  register = async (req, res) => {
    const loginType = true;
    const { email, password, passwordConfirm, type, userName, height, weight, phone } = req.body;
    try {
      const result = await this._userService.registerUser(email, password, passwordConfirm, type, loginType, userName, height, weight, phone);
      return res.status(result.status).json(result.message);
    } catch (err) {
      console.log(err);
    }
  };

  // 로그인
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await this._userService.loginUser(email, password);

      res.cookie('authorization', `Bearer ${result.data}`);

      res.status(result.status).json(result.message);
    } catch (err) {}
  };

  //로그아웃
  logoutUser = async (req, res) => {
    try {
      await this._userService.logoutUser(req, res);
      return res.status(200).json({ message: '로그아웃 되었습니다.' });
    } catch (err) {}
  };

  //회원탈퇴
  deleteUser = async (req, res) => {
    const userId = res.locals.userId;
    try {
      const deleteUserData = await this._userService.deleteUser(userId);

      return res.status(deleteUserData.status).json(deleteUserData.message);
    } catch (err) {}
  };

  kakao = async (req, res) => {
    const { email } = req.body;
    // const { type } = req.body; //원래 받아줘야하는데 프론트에서 넘겨줄거라 지금은 걍 유저로 하겠음
    const type = 'user';
    const loginType = false;
    const password = null;
    const passwordConfirm = null;
    const { token } = await this._userService.registerUser(email, password, passwordConfirm, type, loginType);
    res.cookie('authorization', `Bearer ${token}`);
  };
}

export default UserController;
