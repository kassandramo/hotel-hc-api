const express = require('express');
const Reservacion = require('../modelos/reservacion');
const router = express.Router();

exports.getReservacion = async (req, res) => {
  try {
    const reservaciones = await Reservacion.findAll();
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservaciones' });
  }
};

exports.getReservacionById = async (req, res) => {
  try {
    const reservacion = await Reservacion.findByPk(req.params.id_reservacion);
    if (!reservacion) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    res.json(reservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reservación' });
  }
};

exports.altaReservacion = async (req, res) => {
  try {
    const { id_cliente, id_cuarto, ingreso, salida, cantidad_huespedes, comentarios_especiales, codigo_promocional, activo } = req.body;
    const reservacion = await Reservacion.create({ id_cliente, id_cuarto, ingreso, salida, cantidad_huespedes, comentarios_especiales, codigo_promocional, activo });
    res.status(201).json(reservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reservación' });
  }
};

exports.actualizacionReservacion = async (req, res) => {
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
};

exports.DeleteReservacion = async (req, res) => {
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
};

module.exports = router;
