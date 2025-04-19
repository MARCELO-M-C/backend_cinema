const db = require('../config/db');

const crearSala = async ({ nombre, filas, columnas }) => {
  const [result] = await db.execute(
    'INSERT INTO salas (nombre, filas, columnas) VALUES (?, ?, ?)',
    [nombre, filas, columnas]
  );
  return result.insertId;
};

const obtenerTodasSalas = async () => {
  const [rows] = await db.execute('SELECT * FROM salas');
  return rows;
};

const obtenerSalaPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM salas WHERE id = ?', [id]);
  return rows[0];
};

const actualizarSala = async (id, { nombre, filas, columnas }) => {
  await db.execute(
    'UPDATE salas SET nombre = ?, filas = ?, columnas = ? WHERE id = ?',
    [nombre, filas, columnas, id]
  );
};

const eliminarSala = async (id) => {
  await db.execute('DELETE FROM salas WHERE id = ?', [id]);
};

module.exports = {
  crearSala,
  obtenerTodasSalas,
  obtenerSalaPorId,
  actualizarSala,
  eliminarSala
};