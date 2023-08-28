import Company from '../models/company';
import User from '../models/user';
import Trainer from '../models/trainer';
import Review from '../models/review';

export default () => {
  Company.hasMany(Trainer, {
    sourceKey: 'companyId',
    foreignKey: 'companyId',
  });

  Company.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
