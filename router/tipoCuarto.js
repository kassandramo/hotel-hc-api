const express = require('express');
const router = express.Router();
const tipoCuartoController = require('../controlador/tipoCuarto');

router.get('/', tipoCuartoController.getAllTipoCuartos);
router.get('/:id', tipoCuartoController.getTipoCuartoById);
router.post('/', tipoCuartoController.createTipoCuarto);
router.put('/:id', tipoCuartoController.updateTipoCuarto);
router.delete('/:id', tipoCuartoController.deleteTipoCuarto);

module.exports = router;
