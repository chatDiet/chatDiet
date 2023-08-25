import Company from '../models/company';
import User from '../models/user';
import Trainer from '../models/trainer';

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
