import { DataTypes } from 'sequelize';
import connector from '../db.js';
import Company from './company.js'

const Trainer = connector.sequelize.define(
  'trainers',
  {
    trainerId: {
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
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company, 
        key: 'companyId',
      },
      onDelete: 'CASCADE',
    },
    trainerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    career: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ptContent: {
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

export default Trainer;
