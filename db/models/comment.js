import { DataTypes } from 'sequelize';
import connector from '../db.js';
import user from './user.js';
import post from './post.js';

const Comment = connector.sequelize.define(
  'comments',
  {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: true }
);
Comment.belongsTo(user, {
  foreignKey: 'userId', // userId가 외래키로 사용됨
  onDelete: 'CASCADE', // 연관된 사용자가 삭제될 경우 연관된 게시물도 삭제
});
Comment.belongsTo(post, {
  foreignKey: 'postId', // userId가 외래키로 사용됨
  onDelete: 'CASCADE', // 연관된 사용자가 삭제될 경우 연관된 게시물도 삭제
});

export default Comment;
