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
  foreignKey: 'userId', 
  onDelete: 'CASCADE', 
});
Comment.belongsTo(post, {
  foreignKey: 'postId', 
  onDelete: 'CASCADE', 
});

export default Comment;
