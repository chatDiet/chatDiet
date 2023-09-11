import { User, UserInfo } from '../db/index';
import connector from '../db/db';

const sequelize = connector.sequelize;

class UserRepository {
  async getOneUserInfo(userId) {
    return await UserInfo.findOne({ where: { userId } });
  }

  async updateUserInfo(userInfoId, userName, height, weight, phone) {
    return await UserInfo.update(
      {
        userName,
        height,
        weight,
        phone,
      },
      { where: { userInfoId } }
    );
  }

  async registerUser(email, type, loginType, userName, height, weight, phone, password) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create(
        {
          email,
          password,
          type,
          loginType,
        },
        { transaction }
      );

      const userId = user.userId;
      const userInfo = await UserInfo.create(
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

      return userInfo;
    } catch (transactionError) {
      await transaction.rollback();
      console.log(transactionError);
    }
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async checkPhoneNumber(phone) {
    return await UserInfo.findOne({ where: { phone } });
  }

  async logoutUser(req, res) {
    res.cookie('authorization', '', { maxAge: 0 });
  }

  async getUserById(userId) {
    return await User.findOne({ where: { userId: userId } });
  }

  async deleteUser(userId) {
    return await User.destroy({ where: { userId } });
  }
}

export default UserRepository;
