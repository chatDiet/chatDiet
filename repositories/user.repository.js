import { User } from '../db/index';

class UserRepository {
  async registerUser(nickname, email, password, type) {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return null;
    }

    return User.create({
      nickname,
      email,
      password,
      type,
    });
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async logoutUser(req, res) {
    res.cookie("authorization", "", { maxAge: 0 });
  }
};

export default UserRepository;
