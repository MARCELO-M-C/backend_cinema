const Sala = require('../models/salasModel');
const Pelicula = require('../models/peliculaModel');
const Reservacion = require('../models/reservasModel');
const Funcion = require('../models/funcionModel');

// Crear nueva sala
const crearSala = async (req, res) => {
  const { nombre, pelicula_id, filas, columnas } = req.body;
  const pelicula = await Pelicula.obtenerPeliculaPorId(pelicula_id);

  if (!pelicula) {
    return res.status(400).json({ success: false, message: 'Película no encontrada' });
  }

  const nuevaSala = await Sala.crearSala({ nombre, pelicula_id, filas, columnas });

  res.status(201).json({ success: true, message: 'Sala de cine creada', salaId: nuevaSala });
};

// Modificar datos de la película de una sala
const modificarPeliculaSala = async (req, res) => {
  const { sala_id, pelicula_id } = req.body;

  const sala = await Sala.obtenerSalaPorId(sala_id);
  if (!sala) {
    return res.status(400).json({ success: false, message: 'Sala no encontrada' });
  }

  const pelicula = await Pelicula.obtenerPeliculaPorId(pelicula_id);
  if (!pelicula) {
    return res.status(400).json({ success: false, message: 'Película no encontrada' });
  }

  await Sala.actualizarPeliculaSala(sala_id, pelicula_id);

  res.status(200).json({ success: true, message: 'Película modificada en la sala' });
};

// Modificar capacidad de una sala
const modificarCapacidadSala = async (req, res) => {
  const { sala_id, filas, columnas } = req.body;

  const sala = await Sala.obtenerSalaPorId(sala_id);
  if (!sala) {
    return res.status(400).json({ success: false, message: 'Sala no encontrada' });
  }

  const reservaciones = await Reservacion.obtenerReservacionesPorSala(sala_id);
  if (reservaciones.length > 0) {
    return res.status(400).json({ success: false, message: 'La sala ya tiene asientos reservados' });
  }

  await Sala.actualizarCapacidadSala(sala_id, filas, columnas);

  res.status(200).json({ success: true, message: 'Capacidad de la sala actualizada' });
};

// Obtener todas las salas de cine
const obtenerSalas = async (req, res) => {
  try {
    const salas = await Sala.obtenerTodasSalas();

    const salasConPeliculas = await Promise.all(
      salas.map(async (sala) => {
        if (!sala.pelicula_id) {
          // Si la sala no tiene película asignada, no se hace la consulta
          return { ...sala, pelicula: null };
        }

        const pelicula = await Pelicula.obtenerPeliculaPorId(sala.pelicula_id);
        return { ...sala, pelicula };
      })
    );

    res.json({ success: true, salas: salasConPeliculas });
  } catch (error) {
    console.error('Error al obtener salas con películas:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
module.exports = { crearSala, modificarPeliculaSala, modificarCapacidadSala, obtenerSalas };