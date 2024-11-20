// router/reservacion.router.js
const express = require('express');
const router = express.Router();
const ReservacionController = require('../controlador/reservacion.controler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservacion:
 *       type: object
 *       properties:
 *         id_reservacion:
 *           type: integer
 *           description: ID único de la reservación
 *         id_cuarto:
 *           type: integer
 *           description: ID del cuarto reservado
 *         nombre_cliente:
 *           type: string
 *           description: Nombre completo del cliente
 *         email_cliente:
 *           type: string
 *           format: email
 *           description: Correo electrónico del cliente
 *         telefono_cliente:
 *           type: string
 *           description: Número de teléfono del cliente
 *         ingreso:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de ingreso del cliente
 *         salida:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de salida del cliente
 *         notas:
 *           type: string
 *           description: Notas adicionales sobre la reservación
 *         cantidad_huespedes:
 *           type: integer
 *           description: Número de huéspedes incluidos en la reservación
 *         comentarios_especiales:
 *           type: string
 *           description: Comentarios especiales del cliente
 *         codigo_promocional:
 *           type: string
 *           description: Código promocional aplicado a la reservación, si existe
 *         activo:
 *           type: boolean
 *           description: Indica si la reservación está activa
 *         fecha_registro:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en que se registró la reservación
 */


/**
 * @swagger
 * /reservaciones:
 *   post:
 *     summary: Crear una nueva reservación
 *     tags: [Reservaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservacion'
 *     responses:
 *       201:
 *         description: Reservación creada con éxito
 *       500:
 *         description: Error al crear la reservación
 */
router.post('/reservaciones', ReservacionController.crearReservacion);

/**
 * @swagger
 * /reservaciones:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de todas las reservaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservacion'
 *       500:
 *         description: Error al obtener las reservaciones
 */
router.get('/reservaciones', ReservacionController.getReservaciones);

/**
 * @swagger
 * /reservaciones/{id}:
 *   get:
 *     summary: Obtener una reservación por su ID
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reservación
 *     responses:
 *       200:
 *         description: Detalles de la reservación solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservacion'
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error al obtener la reservación
 */
router.get('/reservaciones/:id', ReservacionController.getReservacionById);

/**
 * @swagger
 * /reservaciones/{id}:
 *   put:
 *     summary: Actualizar una reservación
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reservación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservacion'
 *     responses:
 *       200:
 *         description: Reservación actualizada con éxito
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error al actualizar la reservación
 */
router.put('/reservaciones/:id', ReservacionController.actualizarReservacion);

/**
 * @swagger
 * /reservaciones/{id_reservacion}:
 *   delete:
 *     summary: Eliminar una reservación
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id_reservacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reservación a eliminar
 *     responses:
 *       200:
 *         description: Reservación eliminada con éxito
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error al eliminar la reservación
 */
router.delete('/reservaciones/:id', ReservacionController.deleteReservacion);


module.exports = router;
