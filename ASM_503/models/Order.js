const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderCode: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  customer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'customers', key: 'id' }
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  totalAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  discount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'orders',
  indexes: [
    { unique: true, fields: ['orderCode'] }
  ]
});

module.exports = Order;
