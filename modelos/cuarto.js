const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Cuarto = sequelize.define('Cuarto', {
    id_cuarto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_cuarto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_cuarto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    cantidad_disponibles: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'cuartos', // Nombre real de la tabla
    timestamps: false,
});

module.exports = Cuarto;
