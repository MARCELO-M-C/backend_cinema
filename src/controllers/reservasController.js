const Reservacion = require('../models/reservasModel');
const Funcion = require('../models/funcionModel');
const { obtenerDatosReporte } = require('../models/reservasModel');

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

const crearMultiplesReservaciones = async (req, res) => {
  const { funcion_id, butacas } = req.body;
  const usuario_id = req.usuario.id; // Desde JWT

  if (!funcion_id || !Array.isArray(butacas) || butacas.length === 0) {
    return res.status(400).json({ success: false, message: 'Datos incompletos o formato incorrecto' });
  }

  // Verificar que la función exista
  const funcion = await Funcion.obtenerFuncionPorId(funcion_id);
  if (!funcion) {
    return res.status(404).json({ success: false, message: 'Función no encontrada' });
  }

  try {
    for (const butaca of butacas) {
      const { fila, columna } = butaca;

      const yaReservada = await Reservacion.obtenerReservacionPorFuncionYButaca(funcion_id, fila, columna);
      if (yaReservada) {
        return res.status(409).json({
          success: false,
          message: `La butaca fila ${fila}, columna ${columna} ya está reservada`,
        });
      }

      await Reservacion.crearReservacion({ funcion_id, usuario_id, fila, columna });
    }

    res.status(201).json({ success: true, message: 'Reservas realizadas con éxito' });

  } catch (err) {
    console.error('Error al crear múltiples reservaciones:', err);
    res.status(500).json({ success: false, message: 'Error al crear las reservaciones' });
  }
  
};

const generarReporteActividad = async (req, res) => {
  const { funcion_id } = req.params;
  const precio = 480;

  try {
    const data = await obtenerReportePorFuncion(funcion_id);
    if (!data) {
      return res.status(404).json({ mensaje: "Función no encontrada" });
    }

    const vacias = data.capacidad - data.butacasReservadas;
    const resultado = {
      funcion_id: data.funcion_id,
      sala: data.sala,
      fecha: data.fecha,
      butacasReservadas: data.butacasReservadas,
      capacidad: data.capacidad,
      ingresosTotales: data.butacasReservadas * precio,
      ingresosPerdidos: vacias * precio
    };

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al generar el reporte por función" });
  }
};

module.exports = { crearReservacion, 
  obtenerReservaciones, 
  obtenerReservacionPorButaca, 
  actualizarReservacion, 
  eliminarReservacion, 
  obtenerTodasReservas, 
  obtenerReservacionPorId, 
  crearMultiplesReservaciones,
  generarReporteActividad
};