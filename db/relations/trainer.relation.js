import Company from '../models/company';
import Schedule from '../models/schedule';
import Contract from '../models/contract';
import Trainer from '../models/trainer';
import Review from '../models/review';

export default () => {
  Trainer.belongsTo(Company, {
    sourceKey: 'companyId',
    foreignKey: 'companyId',
  });

  Trainer.hasMany(Schedule, {
    sourceKey: 'trainerId',
    foreignKey: 'trainerId',
  });

  Trainer.hasMany(Contract, {
    sourceKey: 'trainerId',
    foreignKey: 'trainerId',
  });
  // Trainer.hasMany(Review, {
  //   sourceKey: 'trainerId',
  //   foreignKey: 'trainerId',
  // });
};
