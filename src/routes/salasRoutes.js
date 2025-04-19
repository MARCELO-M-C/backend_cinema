const express = require('express');
const { crearSala, modificarPeliculaSala, modificarCapacidadSala, obtenerSalas } = require('../controllers/salasController');
const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para crear una nueva sala (solo admin)
router.post('/', verificarToken, crearSala);

// Ruta para modificar la película de una sala (solo admin)
router.put('/modificar-pelicula', verificarToken, modificarPeliculaSala);

// Ruta para modificar la capacidad de la sala (solo admin)
router.put('/modificar-capacidad', verificarToken, modificarCapacidadSala);

// Ruta para obtener todas las salas
router.get('/', obtenerSalas);

module.exports = router;