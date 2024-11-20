// models/db.js
const { Sequelize } = require('sequelize');
const { logger } = require('sequelize/lib/utils/logger');
require('dotenv').config(); // Cargar variables del archivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Añadir el puerto aquí
    dialect: process.env.DB_DIALECT, // Dialecto (mysql)
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

(async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log('Las tablas han sido sincronizadas con éxito.');
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
  }
})();

module.exports = sequelize;

