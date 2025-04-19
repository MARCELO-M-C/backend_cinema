const express = require('express');
const {
  crearSala,
  obtenerSalas,
  obtenerSalaPorId,
  actualizarSala,
  eliminarSala
} = require('../controllers/salasController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Endpoints para gestión de salas de cine
 */

/**
 * @swagger
 * /salas:
 *   post:
 *     summary: Crear una nueva sala de cine
 *     tags: [Salas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - filas
 *               - columnas
 *             properties:
 *               nombre:
 *                 type: string
 *               filas:
 *                 type: integer
 *               columnas:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sala creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Acceso denegado
 */
router.post('/', verificarToken, esAdmin, crearSala);

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Obtener todas las salas de cine
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas disponibles
 */
router.get('/', obtenerSalas);

/**
 * @swagger
 * /salas/{id}:
 *   get:
 *     summary: Obtener una sala por ID
 *     tags: [Salas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la sala
 *       404:
 *         description: Sala no encontrada
 */
router.get('/:id', obtenerSalaPorId);

/**
 * @swagger
 * /salas/{id}:
 *   put:
 *     summary: Actualizar una sala existente
 *     tags: [Salas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               filas:
 *                 type: integer
 *               columnas:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sala actualizada correctamente
 *       404:
 *         description: Sala no encontrada
 */
router.put('/:id', verificarToken, esAdmin, actualizarSala);

/**
 * @swagger
 * /salas/{id}:
 *   delete:
 *     summary: Eliminar una sala
 *     tags: [Salas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sala eliminada exitosamente
 *       404:
 *         description: Sala no encontrada
 */
router.delete('/:id', verificarToken, esAdmin, eliminarSala);

module.exports = router;