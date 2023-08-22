import Calender from '../models/calender';
import User from '../models/user';

export default () => {
  Calender.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
