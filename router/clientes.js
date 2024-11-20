const express = require('express');
const clientecontroller = require('../controlador/cliente');
const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', clientecontroller.getClientes);

/**
 * @swagger
 * /clientes/{id_cliente}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     parameters:
 *       - in: path
 *         name: id_cliente
 *         required: true
 *         description: ID del cliente a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id_cliente', clientecontroller.getClientesById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     parameters:
 *       - in: body
 *         name: cliente
 *         description: El cliente a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_cliente:
 *               type: string
 *             email_cliente:
 *               type: string
 *             telefono_cliente:
 *               type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 */
router.post('/', clientecontroller.altaCliente);

/**
 * @swagger
 * /clientes/{id_cliente}:
 *   put:
 *     summary: Actualizar un cliente
 *     parameters:
 *       - in: path
 *         name: id_cliente
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: integer
 *       - in: body
 *         name: cliente
 *         description: Datos actualizados del cliente
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_cliente:
 *               type: string
 *             email_cliente:
 *               type: string
 *             telefono_cliente:
 *               type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/:id_cliente',clientecontroller.actualizarCliente);

/**
 * @swagger
 * /clientes/{id_cliente}:
 *   delete:
 *     summary: Eliminar un cliente
 *     parameters:
 *       - in: path
 *         name: id_cliente
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id_cliente', clientecontroller.actualizarCliente);

module.exports = router;
