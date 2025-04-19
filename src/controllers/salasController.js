const Sala = require('../models/salasModel');
const Pelicula = require('../models/peliculaModel');
const Reservacion = require('../models/reservasModel');

// Crear nueva sala
const crearSala = async (req, res) => {
  const { nombre, filas, columnas } = req.body;

  if (!req.usuario || req.usuario.tipo !== 'admin') {
    return res.status(403).json({ success: false, message: 'Solo administradores pueden crear salas.' });
  }

  if (!nombre || !filas || !columnas) {
    return res.status(400).json({ success: false, message: 'Faltan datos para crear la sala.' });
  }

  try {
    const nuevaSala = await Sala.crearSala({ nombre, filas, columnas });
    res.status(201).json({ success: true, message: 'Sala creada', salaId: nuevaSala });
  } catch (error) {
    console.error('Error al crear sala:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Obtener todas las salas
const obtenerSalas = async (req, res) => {
  try {
    const salas = await Sala.obtenerTodasSalas();
    res.status(200).json({ success: true, salas });
  } catch (error) {
    console.error('Error al obtener salas:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Obtener sala por ID
const obtenerSalaPorId = async (req, res) => {
  const { id } = req.params;

  const sala = await Sala.obtenerSalaPorId(id);
  if (!sala) {
    return res.status(404).json({ success: false, message: 'Sala no encontrada' });
  }

  res.status(200).json({ success: true, sala });
};

// Actualizar sala
const actualizarSala = async (req, res) => {
  const { id } = req.params;
  const { nombre, filas, columnas } = req.body;

  const salaExistente = await Sala.obtenerSalaPorId(id);
  if (!salaExistente) {
    return res.status(404).json({ success: false, message: 'Sala no encontrada' });
  }

  try {
    await Sala.actualizarSala(id, { nombre, filas, columnas });
    res.status(200).json({ success: true, message: 'Sala actualizada' });
  } catch (error) {
    console.error('Error al actualizar sala:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

// Eliminar sala
const eliminarSala = async (req, res) => {
  const { id } = req.params;

  const salaExistente = await Sala.obtenerSalaPorId(id);
  if (!salaExistente) {
    return res.status(404).json({ success: false, message: 'Sala no encontrada' });
  }

  try {
    await Sala.eliminarSala(id);
    res.status(200).json({ success: true, message: 'Sala eliminada' });
  } catch (error) {
    console.error('Error al eliminar sala:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

module.exports = {
  crearSala,
  obtenerSalas,
  obtenerSalaPorId,
  actualizarSala,
  eliminarSala
};