import { DataTypes } from 'sequelize';
import connector from '../db.js';

const Review = connector.sequelize.define(
  'reviews',
  {
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('company', 'trainer'),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
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

export default Review;
