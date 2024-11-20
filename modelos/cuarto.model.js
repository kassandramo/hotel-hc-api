const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Cuarto = sequelize.define('Cuarto', {
    id_cuarto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    numero_cuarto: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    tipo_cuarto: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    disponible: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cantidad_disponibles: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    servicios_incluidos: {
      type: DataTypes.TEXT, // Almacena los servicios como texto (por ejemplo, separado por comas)
      allowNull: true
    },
    imagenes: {
      type: DataTypes.TEXT, // Almacena múltiples URLs de imágenes como texto (por ejemplo, separado por comas)
      allowNull: true
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'cuartos', // Nombre real de la tabla
    timestamps: false // Si no tienes campos createdAt y updatedAt
  });


module.exports = Cuarto;
