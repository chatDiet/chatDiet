import { DataTypes } from 'sequelize';
import connector from '../db.js';
import Trainer from './trainer.js';

const Contract = connector.sequelize.define(
  'contracts',
  {
    contractId: {
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
    trainerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trainer, 
        key: 'trainerId',
      },
      onDelete: 'CASCADE',
    },
    ptNumber: {
      type: DataTypes.INTEGER,
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

export default Contract;
