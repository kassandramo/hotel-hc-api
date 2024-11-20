const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Cliente = sequelize.define('Cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono_cliente: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'clientes', // Nombre real de la tabla
    timestamps: false // Si no tienes campos createdAt y updatedAt
});

module.exports = Cliente;
