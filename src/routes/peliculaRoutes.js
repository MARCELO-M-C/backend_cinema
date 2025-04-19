const express = require('express');
const { crearPelicula, obtenerPeliculas, obtenerPelicula } = require('../controllers/peliculaController');
const router = express.Router();

// Ruta para crear película
router.post('/', crearPelicula);

// Ruta para obtener todas las películas
router.get('/', obtenerPeliculas);

// Ruta para obtener una película por ID
router.get('/:id', obtenerPelicula);

module.exports = router;