import Comment from '../models/comment';
import Post from '../models/post';
import User from '../models/user';

export default () => {
  Comment.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
  Comment.belongsTo(Post, {
    sourceKey: 'postId',
    foreignKey: 'postId',
    onDelete: 'CASCADE'
  });
};
