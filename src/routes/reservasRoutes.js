const express = require('express');
const {
  crearReservacion,
  obtenerReservaciones,
  obtenerReservacionPorButaca,
  eliminarReservacion,
  obtenerReservacionPorId,
  obtenerTodasReservas, 
  actualizarReservacion
} = require('../controllers/reservasController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Crear reservación (cliente autenticado)
router.post('/', verificarToken, crearReservacion);

// Obtener reservaciones del usuario autenticado
router.get('/', verificarToken, obtenerReservaciones);

// Obtener todas las reservaciones (solo admin)
router.get('/todas', verificarToken, esAdmin, obtenerTodasReservas); 

// Obtener reservación por ID (solo admin)
router.get('/por-id/:id', verificarToken, esAdmin, obtenerReservacionPorId);

// Ver si una butaca está reservada en una función específica
router.get('/:funcion_id/:fila/:columna', verificarToken, obtenerReservacionPorButaca);

// Actualizar una reservación (cliente autenticado)
router.put('/editar/:id', verificarToken, esAdmin, actualizarReservacion);

// Eliminar reservación (cliente autenticado)
router.delete('/:id', verificarToken, eliminarReservacion);

module.exports = router;