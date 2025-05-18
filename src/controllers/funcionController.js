const Funcion = require('../models/funcionModel');
const Sala = require('../models/salasModel');
const Pelicula = require('../models/peliculaModel');

// Crear función
const crearFuncion = async (req, res) => {
  const { pelicula_id, sala_id, fecha, hora } = req.body;

  try {
    const pelicula = await Pelicula.obtenerPeliculaPorId(pelicula_id);
    const sala = await Sala.obtenerSalaPorId(sala_id);

    if (!pelicula || !sala) {
      return res.status(400).json({ success: false, message: 'Pelicula o sala no válida' });
    }

    const nuevaFuncion = await Funcion.crearFuncion({ pelicula_id, sala_id, fecha, hora });
    res.status(201).json({ success: true, funcionId: nuevaFuncion, message: 'Función creada' });
  } catch (error) {
    console.error('Error al crear función:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Obtener todas las funciones
const obtenerFunciones = async (req, res) => {
  try {
    const funciones = await Funcion.obtenerTodasFunciones();

    const resultados = await Promise.all(funciones.map(async (funcion) => {
      const pelicula = await Pelicula.obtenerPeliculaPorId(funcion.pelicula_id);
      const sala = await Sala.obtenerSalaPorId(funcion.sala_id);
      return {
        id: funcion.id,
        fecha: funcion.fecha,
        hora: funcion.hora,
        pelicula: pelicula || null,
        sala: sala || null
      };
    }));

    res.status(200).json({ success: true, funciones: resultados });
  } catch (err) {
    console.error('Error al obtener funciones:', err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Obtener función por ID
const obtenerFuncionPorId = async (req, res) => {
  const { id } = req.params;
  const funcion = await Funcion.obtenerFuncionPorId(id);

  if (!funcion) {
    return res.status(404).json({ success: false, message: 'Función no encontrada' });
  }

  res.status(200).json({ success: true, funcion });
};

// Actualizar función
const actualizarFuncion = async (req, res) => {
  const { id } = req.params;
  const { pelicula_id, sala_id, fecha, hora } = req.body;

  const funcion = await Funcion.obtenerFuncionPorId(id);
  if (!funcion) {
    return res.status(404).json({ success: false, message: 'Función no encontrada' });
  }

  try {
    await Funcion.actualizarFuncion(id, { pelicula_id, sala_id, fecha, hora });
    res.status(200).json({ success: true, message: 'Función actualizada' });
  } catch (err) {
    console.error('Error al actualizar función:', err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Eliminar función
const eliminarFuncion = async (req, res) => {
  const { id } = req.params;

  const funcion = await Funcion.obtenerFuncionPorId(id);
  if (!funcion) {
    return res.status(404).json({ success: false, message: 'Función no encontrada' });
  }

  try {
    await Funcion.eliminarFuncion(id);
    res.status(200).json({ success: true, message: 'Función eliminada' });
  } catch (err) {
    console.error('Error al eliminar función:', err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

module.exports = {
  crearFuncion,
  obtenerFunciones,
  obtenerFuncionPorId,
  actualizarFuncion,
  eliminarFuncion
};