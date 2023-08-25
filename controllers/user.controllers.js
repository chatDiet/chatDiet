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
      await this._userService.registerUser(email, password, passwordConfirm, type, loginType, userName, height, weight, phone);
      res.status(201).json({ message: '회원가입에 성공했습니다.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  // 로그인
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { token } = await this._userService.loginUser(email, password);
      console.log(token);
      res.cookie('authorization', `Bearer ${token}`);
      res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  //로그아웃
  logoutUser = async (req, res) => {
    try {
      await this._userService.logoutUser(req, res);
      return res.status(200).json({ message: '로그아웃 되었습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  };

  //회원탈퇴
  deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      const deleteUserData = await this._userService.deleteUser(userId);
      res.status(deleteUserData.status).json({ message: deleteUserData.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  kakao = async (req, res) => {
    const { email } = req.body;
    // const { type } = req.body; //원래 받아줘야하는데 프론트에서 넘겨줄거라 지금은 걍 유저로 하겠음
    const type = 'user';
    const loginType = false;
    const password = null;
    const passwordConfirm = null;
    const { token } = await this._userService.registerUser(email, password, passwordConfirm, type, loginType);

    console.log('성공적인 토큰 >ㅁ<', token);
    res.cookie('authorization', `Bearer ${token}`);
  };

  kakao = async (req, res) => {
    const { email } = req.body;
    // const { type } = req.body; //원래 받아줘야하는데 프론트에서 넘겨줄거라 지금은 걍 유저로 하겠음
    const type = 'user';
    const loginType = false;
    const password = null;
    const passwordConfirm = null;
    const { token } = await this._userService.registerUser(email, password, passwordConfirm, type, loginType);

    console.log('성공적인 토큰 >ㅁ<', token);
    res.cookie('authorization', `Bearer ${token}`);
  };
}

export default UserController;
