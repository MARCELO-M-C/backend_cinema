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

// Obtener salas (todos pueden)
router.get('/', obtenerSalas);
router.get('/:id', obtenerSalaPorId);

// Requieren autenticación y ser admin
router.post('/', verificarToken, esAdmin, crearSala);
router.put('/:id', verificarToken, esAdmin, actualizarSala);
router.delete('/:id', verificarToken, esAdmin, eliminarSala);

module.exports = router;