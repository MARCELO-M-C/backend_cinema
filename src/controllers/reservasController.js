const Reservacion = require('../models/reservasModel');
const Funcion = require('../models/funcionModel');

// Realizar una reservación
const realizarReservacion = async (req, res) => {
  const { funcion_id, usuario_id, fila, columna } = req.body;

  const funcion = await Funcion.obtenerFuncionPorId(funcion_id);
  if (!funcion) {
    return res.status(400).json({ success: false, message: 'Función no encontrada' });
  }

  const butacaOcupada = await Reservacion.obtenerReservacionPorButaca(funcion_id, fila, columna);
  if (butacaOcupada) {
    return res.status(400).json({ success: false, message: 'Butaca ya reservada' });
  }

  const nuevaReservacion = await Reservacion.crearReservacion(funcion_id, usuario_id, fila, columna);

  res.status(201).json({ success: true, message: 'Reservación realizada', reservacionId: nuevaReservacion });
};

module.exports = { realizarReservacion };