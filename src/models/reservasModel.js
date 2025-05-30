const db = require('../config/db');

// Crear nueva reservación
const crearReservacion = async ({ funcion_id, usuario_id, fila, columna }) => {
  const [result] = await db.execute(
    'INSERT INTO reservaciones (funcion_id, usuario_id, fila, columna) VALUES (?, ?, ?, ?)',
    [funcion_id, usuario_id, fila, columna]
  );
  return result.insertId;
};

// Obtener todas las reservaciones (solo admin debería usarla)
const obtenerTodasReservas = async () => {
  const [rows] = await db.execute(`
    SELECT 
      reservaciones.id,
      usuarios.nombre AS usuario_nombre,
      funciones.id AS funcion_id,      
      reservaciones.fila,
      reservaciones.columna
    FROM reservaciones
    JOIN usuarios ON reservaciones.usuario_id = usuarios.id
    JOIN funciones ON reservaciones.funcion_id = funciones.id
  `);
  return rows;
};

// Obtener reservaciones de un usuario
const obtenerReservacionesPorUsuario = async (usuario_id) => {
  const [rows] = await db.execute('SELECT * FROM reservaciones WHERE usuario_id = ?', [usuario_id]);
  return rows;
};

// Obtener una reservación por ID de butaca
const obtenerReservacionPorFuncionYButaca = async (funcion_id, fila, columna) => {
  const [rows] = await db.execute(
    'SELECT * FROM reservaciones WHERE funcion_id = ? AND fila = ? AND columna = ?',
    [funcion_id, fila, columna]
  );
  return rows[0];
};

// Obtener una reservación por ID
const obtenerReservacionPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM reservaciones WHERE id = ?', [id]);
  return rows[0];
};

// Actualizar una reservación por ID
const actualizarReservacion = async (id, { funcion_id, fila, columna }) => {
  await db.execute(
    'UPDATE reservaciones SET funcion_id = ?, fila = ?, columna = ? WHERE id = ?',
    [funcion_id, fila, columna, id]
  );
};

// Eliminar una reservación
const eliminarReservacion = async (id) => {
  await db.execute('DELETE FROM reservaciones WHERE id = ?', [id]);
};

const crearMultiplesReservaciones = async ({ funcion_id, usuario_id, butacas }) => {
  const insertIds = [];

  for (const butaca of butacas) {
    const { fila, columna } = butaca;
    const [result] = await db.execute(
      'INSERT INTO reservaciones (funcion_id, usuario_id, fila, columna) VALUES (?, ?, ?, ?)',
      [funcion_id, usuario_id, fila, columna]
    );
    insertIds.push(result.insertId);
  }

  return insertIds; 
};

const obtenerDatosReporte = async () => {
  const [filas] = await db.execute(`
    SELECT
      f.id AS funcion_id,
      f.fecha,
      s.nombre AS sala,
      s.filas * s.columnas AS capacidad,
      COUNT(r.id) AS butacasReservadas
    FROM funciones f
    JOIN salas s ON f.sala_id = s.id
    LEFT JOIN reservaciones r ON f.id = r.funcion_id
    WHERE f.fecha BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 8 DAY)
    GROUP BY f.id
    ORDER BY f.fecha ASC
  `);
  return filas;
};

module.exports = { crearReservacion, 
  obtenerReservacionesPorUsuario, 
  obtenerReservacionPorFuncionYButaca, 
  obtenerReservacionPorId, 
  actualizarReservacion, 
  eliminarReservacion, 
  obtenerTodasReservas, 
  crearMultiplesReservaciones, 
  obtenerDatosReporte
 };