const express = require('express');
const router = express.Router();
const cuartoController = require('../controlador/cuarto');

/**
 * @swagger
 * /api/cuartos:
 *   get:
 *     description: Obtener todos los cuartos
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', cuartoController.getAllCuartos);
router.get('/:id', cuartoController.getCuartoById);
router.post('/', cuartoController.createCuarto);
router.put('/:id', cuartoController.updateCuarto);
router.delete('/:id', cuartoController.deleteCuarto);

module.exports = router;
