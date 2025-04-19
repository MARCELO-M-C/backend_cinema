const db = require('../config/db');

const crearReservacion = async (funcion_id, usuario_id, fila, columna) => {
  const [result] = await db.execute(
    'INSERT INTO reservaciones (funcion_id, usuario_id, fila, columna) VALUES (?, ?, ?, ?)',
    [funcion_id, usuario_id, fila, columna]
  );
  return result.insertId;
};

const obtenerReservacionPorButaca = async (funcion_id, fila, columna) => {
  const [rows] = await db.execute('SELECT * FROM reservaciones WHERE funcion_id = ? AND fila = ? AND columna = ?', [funcion_id, fila, columna]);
  return rows[0];
};

module.exports = { crearReservacion, obtenerReservacionPorButaca };