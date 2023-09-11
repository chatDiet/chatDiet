import Report from '../models/report';
import User from '../models/user';

export default () => {
  Report.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
