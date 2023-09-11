import { UserService } from '../services';

class UserController {
  _userService = new UserService();

  // 유저 정보 조회
  getOneUserInfo = async (req, res) => {
    const userId = res.locals.userId;
    const result = await this._userService.getOneUserInfo(userId);

    return res.status(result.status).json(result.data);
  };

  findOneUserInfo = async (req, res) => {
    const userId = req.params.userId;
    const result = await this._userService.findOneUserInfo(userId);
    return res.status(result.status).json(result.data);
  };
  updateUserInfo = async (req, res) => {
    const userId = res.locals.userId;
    const { userName, height, weight, phone } = req.body;
    const { userInfoId } = req.params;

    const result = await this._userService.updateUserInfo(userId, userInfoId, userName, height, weight, phone);

    return res.status(result.status).json(result.message);
  };

  // 회원가입
  register = async (req, res) => {
    const loginType = true;
    const { email, password, passwordConfirm, type, userName, height, weight, phone } = req.body;

    const result = await this._userService.registerUser(email, type, loginType, password, passwordConfirm, userName, height, weight, phone);

    return res.status(result.status).json(result.message);
  };

  // 로그인
  login = async (req, res) => {
    const { email, password } = req.body;

    const result = await this._userService.loginUser(email, password);

    res.cookie('authorization', `Bearer ${result.data}`);

    res.status(result.status).json(result.message);
  };

  // 로그아웃
  logoutUser = async (req, res) => {
    const result = await this._userService.logoutUser(req, res);

    return res.status(result.status).json(result.message);
  };

  // 회원탈퇴
  deleteUser = async (req, res) => {
    const userId = res.locals.userId;

    const result = await this._userService.deleteUser(userId);

    return res.status(result.status).json(result.message);
  };

  // 카카오 회원가입+로그인
  kakao = async (req, res) => {
    const { email, type } = req.body;
    const loginType = false;
    const result = await this._userService.registerUser(email, type, loginType);
    res.cookie('authorization', `Bearer ${result.data}`);
    return res.status(result.status).json(result.message);
  };
}

export default UserController;
