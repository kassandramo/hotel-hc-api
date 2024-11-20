const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Servicio = sequelize.define('Servicio', {
  id_servicio: {
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
  tableName: 'servicios',
  timestamps: false
});

module.exports = Servicio;
