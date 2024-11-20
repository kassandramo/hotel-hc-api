const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const TipoCuarto = sequelize.define('TipoCuarto', {
  id_tipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'tipo_cuarto',
  timestamps: false
});

module.exports = TipoCuarto;
