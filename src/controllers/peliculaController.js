const Pelicula = require('../models/peliculaModel');

// Crear nueva película
const crearPelicula = async (req, res) => {
  const { titulo, poster_url, duracion, sinopsis } = req.body;
  
  const nuevaPelicula = await Pelicula.crearPelicula({ titulo, poster_url, duracion, sinopsis });

  res.status(201).json({ success: true, message: 'Película creada', peliculaId: nuevaPelicula });
};

// Obtener todas las películas
const obtenerPeliculas = async (req, res) => {
  const peliculas = await Pelicula.obtenerTodasPeliculas();

  res.status(200).json({ success: true, peliculas });
};

// Obtener película por ID
const obtenerPelicula = async (req, res) => {
  const { id } = req.params;
  const pelicula = await Pelicula.obtenerPeliculaPorId(id);

  if (!pelicula) {
    return res.status(404).json({ success: false, message: 'Película no encontrada' });
  }

  res.status(200).json({ success: true, pelicula });
};

module.exports = { crearPelicula, obtenerPeliculas, obtenerPelicula };