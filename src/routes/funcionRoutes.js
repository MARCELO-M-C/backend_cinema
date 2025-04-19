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

// Ver funciones (todos pueden)
router.get('/', obtenerFunciones);
router.get('/:id', obtenerFuncionPorId);

// Solo admins pueden gestionar funciones
router.post('/', verificarToken, esAdmin, crearFuncion);
router.put('/:id', verificarToken, esAdmin, actualizarFuncion);
router.delete('/:id', verificarToken, esAdmin, eliminarFuncion);

module.exports = router;