import Inquiry from '../models/inquiry';
import UserInfo from '../models/userInfo';
import Post from '../models/post';
import Comment from '../models/comment';
import Contract from '../models/contract';
import Review from '../models/review';
import Report from '../models/report';
import Calender from '../models/calender';
import Admin from '../models/admin';
import Company from '../models/company';
import User from '../models/user';

export default () => {
  User.hasMany(Inquiry, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(UserInfo, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Post, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Comment, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Contract, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Review, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Report, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Calender, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Admin, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  User.hasMany(Company, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
