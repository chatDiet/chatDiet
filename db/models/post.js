import { DataTypes } from 'sequelize';
import connector from '../db.js';
import User from './user.js';

const Post = connector.sequelize.define(
  'posts',
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export default Post;
