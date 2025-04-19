const express = require('express');
const { realizarReservacion } = require('../controllers/reservasController');
const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para realizar una reservación
router.post('/', verificarToken, realizarReservacion);

module.exports = router;