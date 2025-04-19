const Funcion = require('../models/funcionModel');
const Sala = require('../models/salasModel');
const Pelicula = require('../models/peliculaModel');

// Crear nueva función
const crearFuncion = async (req, res) => {
  const { pelicula_id, sala_id, fecha, hora } = req.body;

  const pelicula = await Pelicula.obtenerPeliculaPorId(pelicula_id);
  if (!pelicula) {
    return res.status(400).json({ success: false, message: 'Película no encontrada' });
  }

  const sala = await Sala.obtenerSalaPorId(sala_id);
  if (!sala) {
    return res.status(400).json({ success: false, message: 'Sala no encontrada' });
  }

  const nuevaFuncion = await Funcion.crearFuncion({ pelicula_id, sala_id, fecha, hora });

  res.status(201).json({ success: true, message: 'Función creada', funcionId: nuevaFuncion });
};

// Obtener todas las funciones de cine
const obtenerFunciones = async (req, res) => {
  const funciones = await Funcion.obtenerTodasFunciones();

  const resultados = await Promise.all(funciones.map(async (funcion) => {
    const pelicula = await Pelicula.obtenerPeliculaPorId(funcion.pelicula_id);
    const sala = await Sala.obtenerSalaPorId(funcion.sala_id);
    return {
      pelicula: pelicula.titulo,
      sala: sala.nombre,
      fecha: funcion.fecha,
      hora: funcion.hora
    };
  }));

  res.status(200).json({ success: true, funciones: resultados });
};

module.exports = { crearFuncion, obtenerFunciones };