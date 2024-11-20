// models/Reservation.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Cuarto = require('./cuarto.model');

const Reservacion = sequelize.define('Reservacion', {
    id_reservacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    id_cuarto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cuartos', // Nombre de la tabla "Cuartos"
        key: 'id_cuarto'
      }
    },
    nombre_cliente: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email_cliente: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefono_cliente: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ingreso: {
      type: DataTypes.DATE,
      allowNull: true
    },
    salida: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cantidad_huespedes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comentarios_especiales: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    codigo_promocional: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    activo: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'reservaciones', // Nombre real de la tabla
    timestamps: false // Si no tienes createdAt y updatedAt
  });

Reservacion.belongsTo(Cuarto, { foreignKey: 'id_cuarto' });

module.exports = Reservacion;