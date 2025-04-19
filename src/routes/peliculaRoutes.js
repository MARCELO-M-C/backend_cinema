const express = require('express');
const {
  crearPelicula,
  obtenerPeliculas,
  obtenerPeliculaPorId,
  modificarPelicula,
  eliminarPelicula
} = require('../controllers/peliculaController');
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ver películas (todos pueden)
router.get('/', obtenerPeliculas);
router.get('/:id', obtenerPeliculaPorId);

// Solo admin puede gestionarlas
router.post('/', verificarToken, esAdmin, crearPelicula);
router.put('/:id', verificarToken, esAdmin, modificarPelicula);
router.delete('/:id', verificarToken, esAdmin, eliminarPelicula);

module.exports = router;