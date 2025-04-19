const Pelicula = require('../models/peliculaModel');

// Crear nueva película
const crearPelicula = async (req, res) => {
  const { titulo, poster_url, duracion, sinopsis } = req.body;

  if (!titulo || !duracion) {
    return res.status(400).json({ success: false, message: 'Faltan datos para crear la película.' });
  }

  try {
    const nuevaPelicula = await Pelicula.crearPelicula({ titulo, poster_url, duracion, sinopsis });
    res.status(201).json({ success: true, message: 'Película creada', peliculaId: nuevaPelicula });
  } catch (err) {
    console.error('Error al crear película:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Obtener todas las películas
const obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.obtenerTodasPeliculas();
    res.status(200).json({ success: true, peliculas });
  } catch (err) {
    console.error('Error al obtener películas:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Obtener una película por ID
const obtenerPeliculaPorId = async (req, res) => {
  const { id } = req.params;
  const pelicula = await Pelicula.obtenerPeliculaPorId(id);

  if (!pelicula) {
    return res.status(404).json({ success: false, message: 'Película no encontrada' });
  }

  res.status(200).json({ success: true, pelicula });
};

// Modificar una película
const modificarPelicula = async (req, res) => {
  const { id } = req.params;
  const { titulo, poster_url, duracion, sinopsis } = req.body;

  const peliculaExistente = await Pelicula.obtenerPeliculaPorId(id);
  if (!peliculaExistente) {
    return res.status(404).json({ success: false, message: 'Película no encontrada' });
  }

  try {
    await Pelicula.actualizarPelicula(id, { titulo, poster_url, duracion, sinopsis });
    res.status(200).json({ success: true, message: 'Película actualizada' });
  } catch (err) {
    console.error('Error al actualizar película:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Eliminar una película
const eliminarPelicula = async (req, res) => {
  const { id } = req.params;
  const peliculaExistente = await Pelicula.obtenerPeliculaPorId(id);

  if (!peliculaExistente) {
    return res.status(404).json({ success: false, message: 'Película no encontrada' });
  }

  try {
    await Pelicula.eliminarPelicula(id);
    res.status(200).json({ success: true, message: 'Película eliminada' });
  } catch (err) {
    console.error('Error al eliminar película:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = { crearPelicula, obtenerPeliculas, obtenerPeliculaPorId, modificarPelicula, eliminarPelicula };