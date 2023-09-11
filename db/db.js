import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const db = config.db;

class DBConnector {
  sequelize;
  constructor() {
    this.sequelize = new Sequelize(db.database, db.username, db.password, {
      host: db.host,
      dialect: 'mysql',
    });
  }

  connectDB() {
    this.sequelize
      .sync({ alter: false })
      .then(() => {
        console.log('✨'.repeat(40));
        console.log('Datebase is Connected 👍');
        console.log('✨'.repeat(40));
      })
      .catch(e => {
        console.error(e);
        throw new Error('Fail to connect..👎');
      });
  }

  testConnectDB() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('✨'.repeat(40));
        console.log('Test Connection is Success 😍');
        console.log('✨'.repeat(40));
      })
      .catch(e => {
        console.error(e);
        throw new Error('Fail to test to connect..😥');
      });
  }
}
const connector = new DBConnector();

export default connector;
