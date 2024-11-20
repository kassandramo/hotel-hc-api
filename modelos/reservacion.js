const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Cliente = require('./cliente');
const Cuarto = require('./cuarto');

const Reservacion = sequelize.define('Reservacion', {
    id_reservacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'id_cliente',
        },
    },
    id_cuarto: {
        type: DataTypes.INTEGER,
        references: {
            model: Cuarto,
            key: 'id_cuarto',
        },
    },
    ingreso: {
        type: DataTypes.DATE,
        allowNull: false
    },
    salida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cantidad_huespedes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentarios_especiales: {
        type: DataTypes.TEXT
    },
    codigo_promocional: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'reservaciones', // Nombre real de la tabla
    timestamps: false,
});

module.exports = Reservacion;
