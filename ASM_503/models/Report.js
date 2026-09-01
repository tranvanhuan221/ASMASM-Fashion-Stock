const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
    allowNull: false
  },
  reportDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  totalImport: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalExport: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalRevenue: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  totalCost: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  profit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'reports'
});

module.exports = Report;
