import Company from '../models/company';
import User from '../models/user';

export default () => {
  Company.hasMany(Trainer, {
    sourceKey: 'trainerId',
    foreignKey: 'trainerId',
  });

  Company.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
