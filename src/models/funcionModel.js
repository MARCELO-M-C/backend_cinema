const db = require('../config/db');

const crearFuncion = async ({ pelicula_id, sala_id, fecha, hora }) => {
  const [result] = await db.execute(
    'INSERT INTO funciones (pelicula_id, sala_id, fecha, hora) VALUES (?, ?, ?, ?)',
    [pelicula_id, sala_id, fecha, hora]
  );
  return result.insertId;
};

const obtenerFuncionPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM funciones WHERE id = ?', [id]);
  return rows[0];
};

const obtenerTodasFunciones = async () => {
  const [rows] = await db.execute('SELECT * FROM funciones');
  return rows;
};

module.exports = { crearFuncion, obtenerFuncionPorId, obtenerTodasFunciones };