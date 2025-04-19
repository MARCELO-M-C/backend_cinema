const express = require('express');
const { crearFuncion, obtenerFunciones } = require('../controllers/funcionController');
const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para crear una nueva función
router.post('/', verificarToken, crearFuncion);

// Ruta para obtener todas las funciones
router.get('/', obtenerFunciones);

module.exports = router;