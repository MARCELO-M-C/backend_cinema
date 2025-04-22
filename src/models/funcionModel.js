const db = require('../config/db');

const crearFuncion = async ({ pelicula_id, sala_id, fecha, hora }) => {
  const [result] = await db.execute(
    'INSERT INTO funciones (pelicula_id, sala_id, fecha, hora) VALUES (?, ?, ?, ?)',
    [pelicula_id, sala_id, fecha, hora]
  );
  return result.insertId;
};

const obtenerTodasFunciones = async () => {
  const [rows] = await db.execute(`
    SELECT 
      funciones.id,
      funciones.fecha,
      funciones.hora,
      funciones.pelicula_id,
      funciones.sala_id,
      peliculas.titulo AS pelicula_titulo,
      salas.nombre AS sala_nombre
    FROM funciones
    JOIN peliculas ON funciones.pelicula_id = peliculas.id
    JOIN salas ON funciones.sala_id = salas.id
  `);
  return rows;
};

const obtenerFuncionPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM funciones WHERE id = ?', [id]);
  return rows[0];
};

const actualizarFuncion = async (id, { pelicula_id, sala_id, fecha, hora }) => {
  await db.execute(
    'UPDATE funciones SET pelicula_id = ?, sala_id = ?, fecha = ?, hora = ? WHERE id = ?',
    [pelicula_id, sala_id, fecha, hora, id]
  );
};

const eliminarFuncion = async (id) => {
  await db.execute('DELETE FROM funciones WHERE id = ?', [id]);
};

module.exports = {
  crearFuncion,
  obtenerTodasFunciones,
  obtenerFuncionPorId,
  actualizarFuncion,
  eliminarFuncion
};