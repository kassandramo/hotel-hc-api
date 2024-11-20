const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const ImagenCuarto = sequelize.define('ImagenCuarto', {
    id_imagen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_cuarto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cuartos', // Nombre de la tabla "Cuartos"
            key: 'id_cuarto'
        }
    },
    url_imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    img: {
        type: DataTypes.BLOB('long'), // Se usa longblob para datos binarios grandes
        allowNull: true
    }
}, {
    tableName: 'imagenes_cuartos', // Nombre real de la tabla
    timestamps: false // Si no tienes createdAt y updatedAt
});

// Relación con el modelo "Cuartos"
ImagenCuarto.associate = (models) => {
    ImagenCuarto.belongsTo(models.Cuarto, {
        foreignKey: 'id_cuarto',
        targetKey: 'id_cuarto',
        onDelete: 'CASCADE', // Opcional: define qué pasa cuando se elimina un cuarto
        onUpdate: 'CASCADE'
    });
};


module.exports = ImagenCuarto;