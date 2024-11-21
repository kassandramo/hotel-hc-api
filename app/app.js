// app.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../router/router');
const cliente = require('../router/clientes');
const cuarto = require('../router/cuartos');
const reservacion = require('../router/reservaciones');
const reservacionRoutes = require('../router/reservaciones.router');
const sequelize = require('../modelos/db');
const Cuarto = require('../modelos/cuarto.model');
const Reservacion = require('../modelos/reservacion.model');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
const path = require("path");
app.use(morgan('dev'));
// Configuración de CORS para permitir todas las conexiones
app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Configurar Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Reservations API',
            version: '1.0.0',
            description: 'API para gestionar las reservaciones del hotel HC'
        },
        servers: [
            {
                url: `https://hotel-hc-api-production.up.railway.app/api`
            }
        ]
    },
    apis: ['./app.js','./router/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', routes);
app.use('/api', reservacionRoutes);
app.use('/api/clientes',cliente);
app.use('/api/cuartos',cuarto);
app.use('/api/reservacion',reservacion);

// Ruta a los archivos estáticos de Angular
app.use(express.static(path.join(__dirname, '../dist/hotel-front/browser')));

// Redirigir todas las solicitudes a index.html para el routing de Angular
app.get('*', (req, res) => {
  // Navegar hacia atrás para salir de "Backend/src/app" y luego moverte a la carpeta "Frontend"
  const filePath = path.join(__dirname, '../dist/hotel-front/browser/index.html');
  res.sendFile(filePath);
});


module.exports = app;


