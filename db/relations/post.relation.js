import Post from '../models/post';
import User from '../models/user';
import Comment from '../models/comment';

export default () => {
  Post.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  Post.hasMany(Comment, {
    sourceKey: 'postId',
    foreignKey: 'postId',
  });
};
