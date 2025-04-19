const express = require('express');
const {
  crearFuncion,
  obtenerFunciones,
  obtenerFuncionPorId,
  actualizarFuncion,
  eliminarFuncion
} = require('../controllers/funcionController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Funciones
 *   description: Endpoints para gestión de funciones de cine
 */

/**
 * @swagger
 * /funciones:
 *   post:
 *     summary: Crear una nueva función (admin)
 *     tags: [Funciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pelicula_id
 *               - sala_id
 *               - fecha
 *               - hora
 *             properties:
 *               pelicula_id:
 *                 type: integer
 *               sala_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-20"
 *               hora:
 *                 type: string
 *                 format: time
 *                 example: "18:00:00"
 *     responses:
 *       201:
 *         description: Función creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Acceso denegado
 */
router.post('/', verificarToken, esAdmin, crearFuncion);

/**
 * @swagger
 * /funciones:
 *   get:
 *     summary: Obtener todas las funciones de cine
 *     tags: [Funciones]
 *     responses:
 *       200:
 *         description: Lista de funciones disponibles
 */
router.get('/', obtenerFunciones);

/**
 * @swagger
 * /funciones/{id}:
 *   get:
 *     summary: Obtener una función por ID
 *     tags: [Funciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la función
 *       404:
 *         description: Función no encontrada
 */
router.get('/:id', obtenerFuncionPorId);

/**
 * @swagger
 * /funciones/{id}:
 *   put:
 *     summary: Actualizar una función (admin)
 *     tags: [Funciones]
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
 *               pelicula_id:
 *                 type: integer
 *               sala_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: Función actualizada correctamente
 *       404:
 *         description: Función no encontrada
 */
router.put('/:id', verificarToken, esAdmin, actualizarFuncion);

/**
 * @swagger
 * /funciones/{id}:
 *   delete:
 *     summary: Eliminar una función (admin)
 *     tags: [Funciones]
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
 *         description: Función eliminada exitosamente
 *       404:
 *         description: Función no encontrada
 */
router.delete('/:id', verificarToken, esAdmin, eliminarFuncion);

module.exports = router;