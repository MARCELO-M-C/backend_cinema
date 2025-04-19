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

router.post('/login', loginUsuario);
router.post('/', crearUsuario);

// Solo admins pueden ver todos los usuarios
router.get('/', verificarToken, esAdmin, obtenerUsuarios);

// Ver perfil por ID
router.get('/:id', verificarToken, obtenerPerfil);

// Actualizar usuario (admin o el mismo usuario)
router.put('/:id', verificarToken, actualizarUsuario);

// Dar de baja (solo admin)
router.delete('/:id', verificarToken, esAdmin, eliminarUsuario);

module.exports = router;