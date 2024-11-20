const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Cuarto = require('./cuarto');
const Servicio = require('./servicios');

const CuartoServicio = sequelize.define('CuartoServicio', {
  id_cuarto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Cuarto,
      key: 'id_cuarto'
    }
  },
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Servicio,
      key: 'id_servicio'
    }
  }
}, {
  tableName: 'cuarto_servicio',
  timestamps: false
});

// Relaciones
Cuarto.belongsToMany(Servicio, { through: CuartoServicio, foreignKey: 'id_cuarto' });
Servicio.belongsToMany(Cuarto, { through: CuartoServicio, foreignKey: 'id_servicio' });

module.exports = CuartoServicio;
