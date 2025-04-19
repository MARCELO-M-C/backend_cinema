const Reservacion = require('../models/reservasModel');
const Funcion = require('../models/funcionModel');

// Crear nueva reservación
const crearReservacion = async (req, res) => {
  const { funcion_id, fila, columna } = req.body;
  const usuario_id = req.usuario.id; // Suponiendo que el JWT ya tiene el ID del usuario

  // Verificar si la función existe
  const funcion = await Funcion.obtenerFuncionPorId(funcion_id);
  if (!funcion) {
    return res.status(400).json({ success: false, message: 'Función no encontrada' });
  }

  // Verificar si la reservación ya existe
  const reservacionExistente = await Reservacion.obtenerReservacionPorFuncionYButaca(funcion_id, fila, columna);
  if (reservacionExistente) {
    return res.status(400).json({ success: false, message: 'La butaca ya está reservada' });
  }

  try {
    const nuevaReservacion = await Reservacion.crearReservacion({ funcion_id, usuario_id, fila, columna });
    res.status(201).json({ success: true, message: 'Reservación creada', reservacionId: nuevaReservacion });
  } catch (err) {
    console.error('Error al crear reservación:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

const obtenerTodasReservas = async (req, res) => {
  try {
    const reservas = await Reservacion.obtenerTodasReservas();
    res.status(200).json({ success: true, reservas });
  } catch (error) {
    console.error('Error al obtener todas las reservaciones:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

const obtenerReservacionPorId = async (req, res) => {
  const { id } = req.params;

  const reservacion = await Reservacion.obtenerReservacionPorId(id);
  if (!reservacion) {
    return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
  }

  res.status(200).json({ success: true, reservacion });
};

// Obtener todas las reservaciones de un usuario
const obtenerReservaciones = async (req, res) => {
  const usuario_id = req.usuario.id; // Suponiendo que el JWT ya tiene el ID del usuario

  const reservaciones = await Reservacion.obtenerReservacionesPorUsuario(usuario_id);
  res.status(200).json({ success: true, reservaciones });
};

// Obtener una reservación por ID de butaca
const obtenerReservacionPorButaca = async (req, res) => {
  const { funcion_id, fila, columna } = req.params;
  const reservacion = await Reservacion.obtenerReservacionPorFuncionYButaca(funcion_id, fila, columna);

  if (!reservacion) {
    return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
  }

  res.status(200).json({ success: true, reservacion });
};

const actualizarReservacion = async (req, res) => {
  const { id } = req.params;
  const { funcion_id, fila, columna } = req.body;

  const reservacionExistente = await Reservacion.obtenerReservacionPorId(id);
  if (!reservacionExistente) {
    return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
  }

  // (Opcional) validar que la nueva butaca no esté ocupada por otra reservación
  const conflicto = await Reservacion.obtenerReservacionPorFuncionYButaca(funcion_id, fila, columna);
  if (conflicto && conflicto.id != id) {
    return res.status(400).json({ success: false, message: 'La butaca ya está reservada' });
  }

  try {
    await Reservacion.actualizarReservacion(id, { funcion_id, fila, columna });
    res.status(200).json({ success: true, message: 'Reservación actualizada' });
  } catch (err) {
    console.error('Error al actualizar reservación:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Eliminar una reservación
const eliminarReservacion = async (req, res) => {
  const { id } = req.params;

  const reservacionExistente = await Reservacion.obtenerReservacionPorId(id);
  if (!reservacionExistente) {
    return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
  }

  try {
    await Reservacion.eliminarReservacion(id);
    res.status(200).json({ success: true, message: 'Reservación eliminada' });
  } catch (err) {
    console.error('Error al eliminar reservación:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = { crearReservacion, obtenerReservaciones, obtenerReservacionPorButaca, actualizarReservacion, eliminarReservacion, obtenerTodasReservas, obtenerReservacionPorId };