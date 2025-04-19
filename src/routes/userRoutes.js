const express = require('express');
const { loginUsuario, crearUsuario, obtenerPerfil } = require('../controllers/userController');
const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para login
router.post('/login', loginUsuario);

// Ruta para crear usuario
router.post('/', crearUsuario);

// Ruta para obtener el perfil de usuario (requiere autenticación)
router.get('/:id', verificarToken, obtenerPerfil);

module.exports = router;