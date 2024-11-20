const express = require('express');
const router = express.Router();
const cuartoServicioController = require('../controlador/cuartoServicio');

router.get('/', cuartoServicioController.getAllCuartoServicios);
router.get('/:id', cuartoServicioController.getCuartoServicioById);
router.post('/', cuartoServicioController.createCuartoServicio);
router.put('/:id', cuartoServicioController.updateCuartoServicio);
router.delete('/:id', cuartoServicioController.deleteCuartoServicio);

module.exports = router;
