const express = require('express');
const {
  loginUsuario,
  crearUsuario,
  obtenerPerfil,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/userController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para autenticación y gestión de usuarios
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraseña
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               contraseña:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', loginUsuario);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear nuevo usuario (cliente por defecto)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - contraseña
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 example: cliente
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Email ya registrado
 */
router.post('/', crearUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: Acceso denegado
 */
router.get('/', verificarToken, esAdmin, obtenerUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener perfil de usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', verificarToken, obtenerPerfil);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar información de usuario (admin o el mismo usuario)
 *     tags: [Usuarios]
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
 *               email:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: No autorizado
 */
router.put('/:id', verificarToken, actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Dar de baja a un usuario (solo admin)
 *     tags: [Usuarios]
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
 *         description: Usuario dado de baja
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', verificarToken, esAdmin, eliminarUsuario);

module.exports = router;