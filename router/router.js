const express = require('express');
const router = express.Router();
const Cuartos = require('../controlador/cuartos.controler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cuarto:
 *       type: object
 *       properties:
 *         id_cuarto:
 *           type: integer
 *           description: ID único del cuarto
 *         numero_cuarto:
 *           type: string
 *           description: Número del cuarto
 *         tipo_cuarto:
 *           type: string
 *           description: Tipo del cuarto (ej. simple, doble, suite)
 *         precio:
 *           type: number
 *           format: double
 *           description: Precio por noche
 *         disponible:
 *           type: boolean
 *           description: Indica si el cuarto está disponible
 *         descripcion:
 *           type: string
 *           description: Descripción del cuarto
 *         cantidad_disponibles:
 *           type: integer
 *           description: Cantidad de habitaciones disponibles de este tipo
 *         servicios_incluidos:
 *           type: string
 *           description: Lista de servicios incluidos en el cuarto, separados por comas
 *         imagenes:
 *           type: string
 *           description: Rutas de las imágenes del cuarto, separadas por comas
 *         fecha_registro:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de registro del cuarto
 */


/**
 * @swagger
 * /cuartos:
 *   get:
 *     summary: Obtener todos los cuartos
 *     tags: [Cuartos]
 *     responses:
 *       200:
 *         description: Lista de todos los cuartos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cuarto'
 */
router.get('/cuartos', Cuartos.getCuartos);
router.post('/cuartos', Cuartos.altaCuarto);
router.get('/cuartos/:id', Cuartos.getCuartosById);
router.put('/cuartos/:id', Cuartos.actualizarCuarto);
router.delete('/cuartos/:id', Cuartos.eliminar);


module.exports = router;


