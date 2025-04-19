const db = require('../config/db');

const crearSala = async ({ nombre, pelicula_id, filas, columnas }) => {
  const [result] = await db.execute(
    'INSERT INTO salas (nombre, filas, columnas) VALUES (?, ?, ?)',
    [nombre, pelicula_id, filas, columnas]
  );
  return result.insertId;
};

const obtenerSalaPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM salas WHERE id = ?', [id]);
  return rows[0];
};

const obtenerTodasSalas = async () => {
  const [rows] = await db.execute('SELECT * FROM salas');
  return rows;
};

const actualizarCapacidadSala = async (sala_id, filas, columnas) => {
  await db.execute('UPDATE salas SET filas = ?, columnas = ? WHERE id = ?', [filas, columnas, sala_id]);
};

module.exports = { crearSala, obtenerSalaPorId, obtenerTodasSalas, actualizarCapacidadSala };