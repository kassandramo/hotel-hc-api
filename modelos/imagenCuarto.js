const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Cuarto = require('./cuarto');

const ImagenCuarto = sequelize.define('ImagenCuarto', {
  id_imagen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cuarto: {
    type: DataTypes.INTEGER,
    references: {
      model: Cuarto,
      key: 'id_cuarto'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'imagenes_cuartos',
  timestamps: false
});

// Relación
Cuarto.hasMany(ImagenCuarto, { foreignKey: 'id_cuarto' });
ImagenCuarto.belongsTo(Cuarto, { foreignKey: 'id_cuarto' });

module.exports = ImagenCuarto;
