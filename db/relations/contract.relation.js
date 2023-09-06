import Contract from '../models/contract';
import User from '../models/user';
import Trainer from '../models/trainer';

export default () => {
  Contract.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });

  Contract.belongsTo(Trainer, {
    sourceKey: 'trainerId',
    foreignKey: 'trainerId',
    onDelete: 'CASCADE',
  });
};
