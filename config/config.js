require('dotenv').config();

module.exports = {
  db: {
    username: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    mongoDB: process.env.MONGODB,
  },
};
