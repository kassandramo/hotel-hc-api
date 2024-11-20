const express = require('express');
const Reservacion = require('../modelos/reservacion');
const router = express.Router();

/**
 * @swagger
 * /reservaciones:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     responses:
 *       200:
 *         description: Lista de reservaciones
 */
router.get('/', async (req, res) => {
  try {
    const reservaciones = await Reservacion.findAll();
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservaciones' });
  }
});

/**
 * @swagger
 * /reservaciones/{id_reservacion}:
 *   get:
 *     summary: Obtener una reservación por ID
 *     parameters:
 *       - in: path
 *         name: id_reservacion
 *         required: true
 *         description: ID de la reservación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservación encontrada
 *       404:
 *         description: Reservación no encontrada
 */
router.get('/:id_reservacion', async (req, res) => {
  try {
    const reservacion = await Reservacion.findByPk(req.params.id_reservacion);
    if (!reservacion) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    res.json(reservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reservación' });
  }
});

/**
 * @swagger
 * /reservaciones:
 *   post:
 *     summary: Crear una nueva reservación
 *     parameters:
 *       - in: body
 *         name: reservacion
 *         description: La reservación a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_cliente:
 *               type: integer
 *             id_cuarto:
 *               type: integer
 *             ingreso:
 *               type: string
 *               format: date-time
 *             salida:
 *               type: string
 *               format: date-time
 *             cantidad_huespedes:
 *               type: integer
 *             comentarios_especiales:
 *               type: string
 *             codigo_promocional:
 *               type: string
 *             activo:
 *               type: boolean
 *     responses:
 *       201:
 *         description: Reservación creada
 */
router.post('/', async (req, res) => {
  try {
    const { id_cliente, id_cuarto, ingreso, salida, cantidad_huespedes, comentarios_especiales, codigo_promocional, activo } = req.body;
    const reservacion = await Reservacion.create({ id_cliente, id_cuarto, ingreso, salida, cantidad_huespedes, comentarios_especiales, codigo_promocional, activo });
    res.status(201).json(reservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reservación' });
  }
});

/**
 * @swagger
 * /reservaciones/{id_reservacion}:
 *   put:
 *     summary: Actualizar una reservación
 *     parameters:
 *       - in: path
 *         name: id_reservacion
 *         required: true
 *         description: ID de la reservación a actualizar
 *         schema:
 *           type: integer
 *       - in: body
 *         name: reservacion
 *         description: Datos actualizados de la reservación
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_cliente:
 *               type: integer
 *             id_cuarto:
 *               type: integer
 *             ingreso:
 *               type: string
 *               format: date-time
 *             salida:
 *               type: string
 *               format: date-time
 *             cantidad_huespedes:
 *               type: integer
 *             comentarios_especiales:
 *               type: string
 *             codigo_promocional:
 *               type: string
 *             activo:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Reservación actualizada
 *       404:
 *         description: Reservación no encontrada
 */
router.put('/:id_reservacion', async (req, res) => {
  try {
    const reservacion = await Reservacion.findByPk(req.params.id_reservacion);
    if (!reservacion) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    await reservacion.update(req.body);
    res.json(reservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reservación' });
  }
});

/**
 * @swagger
 * /reservaciones/{id_reservacion}:
 *   delete:
 *     summary: Eliminar una reservación
 *     parameters:
 *       - in: path
 *         name: id_reservacion
 *         required: true
 *         description: ID de la reservación a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservación eliminada
 *       404:
 *         description: Reservación no encontrada
 */
router.delete('/:id_reservacion', async (req, res) => {
  try {
    const reservacion = await Reservacion.findByPk(req.params.id_reservacion);
    if (!reservacion) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    await reservacion.destroy();
    res.json({ message: 'Reservación eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reservación' });
  }
});

module.exports = router;
