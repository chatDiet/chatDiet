import Schedule from '../models/schedule';
import Trainer from '../models/trainer';

export default () => {
  Schedule.belongsTo(Trainer, {
    sourceKey: 'trainerId',
    foreignKey: 'trainerId',
    onDelete: 'CASCADE'
  });
};
