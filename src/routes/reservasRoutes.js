const express = require('express');
const {
  crearReservacion,
  obtenerReservaciones,
  obtenerReservacionPorButaca,
  eliminarReservacion,
  obtenerTodasReservas,
  obtenerReservacionPorId,
  actualizarReservacion
} = require('../controllers/reservasController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: Endpoints para gestionar reservas de funciones
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reservación
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - funcion_id
 *               - fila
 *               - columna
 *             properties:
 *               funcion_id:
 *                 type: integer
 *               fila:
 *                 type: integer
 *               columna:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 *       400:
 *         description: Butaca ya reservada o función no válida
 */
router.post('/', verificarToken, crearReservacion);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservaciones del usuario autenticado
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservaciones del usuario
 */
router.get('/', verificarToken, obtenerReservaciones);

/**
 * @swagger
 * /reservas/todas:
 *   get:
 *     summary: Obtener todas las reservaciones del sistema (solo admin)
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de reservaciones
 *       403:
 *         description: Acceso denegado
 */
router.get('/todas', verificarToken, esAdmin, obtenerTodasReservas);

/**
 * @swagger
 * /reservas/por-id/{id}:
 *   get:
 *     summary: Obtener una reservación por ID
 *     tags: [Reservaciones]
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
 *         description: Detalle de la reservación
 *       404:
 *         description: Reservación no encontrada
 */
router.get('/por-id/:id', verificarToken, obtenerReservacionPorId);

/**
 * @swagger
 * /reservas/{funcion_id}/{fila}/{columna}:
 *   get:
 *     summary: Verificar si una butaca está reservada en una función
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: funcion_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: fila
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: columna
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservación encontrada o butaca disponible
 *       404:
 *         description: Reservación no encontrada
 */
router.get('/:funcion_id/:fila/:columna', verificarToken, obtenerReservacionPorButaca);

/**
 * @swagger
 * /reservas/editar/{id}:
 *   put:
 *     summary: Actualizar una reservación existente
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - funcion_id
 *               - fila
 *               - columna
 *             properties:
 *               funcion_id:
 *                 type: integer
 *               fila:
 *                 type: integer
 *               columna:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reservación actualizada exitosamente
 *       404:
 *         description: Reservación no encontrada
 */
router.put('/editar/:id', verificarToken, actualizarReservacion);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reservación
 *     tags: [Reservaciones]
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
 *         description: Reservación eliminada exitosamente
 *       404:
 *         description: Reservación no encontrada
 */
router.delete('/:id', verificarToken, eliminarReservacion);

module.exports = router;