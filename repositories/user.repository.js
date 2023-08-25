import { User, UserInfo } from '../db/index';
import connector from '../db/db';

const sequelize = connector.sequelize;

class UserRepository {
  async getOneUserInfo(userId) {
    return await UserInfo.findOne({ where: { userId } });
  }

  async registerUser(userName, height, weight, phone, email, password, type, loginType) {
    const transaction = await sequelize.transaction();
    try {
      const result = await User.create(
        {
          email,
          password,
          type,
          loginType,
        },
        { transaction }
      );

      const userId = result.userId;
      await UserInfo.create(
        {
          userId,
          userName,
          height,
          weight,
          phone,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (transactionError) {
      await transaction.rollback();
      console.log(transactionError);
    }
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
