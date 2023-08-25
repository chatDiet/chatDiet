import { User } from '../db/index';

class UserRepository {
  async registerUser(email, password, type, loginType) {
    return User.create({
      email,
      password,
      type,
      loginType,
    });
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async logoutUser(req, res) {
    res.cookie('authorization', '', { maxAge: 0 });
  }

  async getUserById(userId) {
    return await User.findOne({ where: { userId: userId } });
  }

  async deleteUser(userId) {
    return await User.destroy({ where: { userId: userId } });
  }
}

export default UserRepository;
