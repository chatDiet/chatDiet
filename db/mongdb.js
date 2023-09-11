import mongoose from 'mongoose';
import config from '../config/config.js';

const db = config.db;

export class mongoDB {
  mongoDBconnect = () => {
    mongoose
      .connect(db.mongoDB)
      .then(() => console.log('---------------------MONGODB CONNECT SUCCESS-------------------------------'))
      .catch(err => console.log(err));
  };
}
