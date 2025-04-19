const express = require('express');
const {
  crearPelicula,
  obtenerPeliculas,
  obtenerPeliculaPorId,
  modificarPelicula,
  eliminarPelicula
} = require('../controllers/peliculaController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Endpoints para gestión de películas
 */

/**
 * @swagger
 * /peliculas:
 *   post:
 *     summary: Crear una nueva película (solo admin)
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - duracion
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Avengers
 *               poster_url:
 *                 type: string
 *                 example: https://imagen.jpg
 *               duracion:
 *                 type: integer
 *                 example: 140
 *               sinopsis:
 *                 type: string
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', verificarToken, esAdmin, crearPelicula);

/**
 * @swagger
 * /peliculas:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas
 */
router.get('/', obtenerPeliculas);

/**
 * @swagger
 * /peliculas/{id}:
 *   get:
 *     summary: Obtener una película por ID
 *     tags: [Películas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la película
 *       404:
 *         description: Película no encontrada
 */
router.get('/:id', obtenerPeliculaPorId);

/**
 * @swagger
 * /peliculas/{id}:
 *   put:
 *     summary: Modificar los datos de una película (solo admin)
 *     tags: [Películas]
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
 *               titulo:
 *                 type: string
 *               poster_url:
 *                 type: string
 *               duracion:
 *                 type: integer
 *               sinopsis:
 *                 type: string
 *     responses:
 *       200:
 *         description: Película actualizada correctamente
 *       404:
 *         description: Película no encontrada
 */
router.put('/:id', verificarToken, esAdmin, modificarPelicula);

/**
 * @swagger
 * /peliculas/{id}:
 *   delete:
 *     summary: Eliminar una película (solo admin)
 *     tags: [Películas]
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
 *         description: Película eliminada exitosamente
 *       404:
 *         description: Película no encontrada
 */
router.delete('/:id', verificarToken, esAdmin, eliminarPelicula);

module.exports = router;