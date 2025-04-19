const db = require('../config/db');

const obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

const obtenerUsuarioPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

const crearUsuario = async ({ nombre, email, contraseña, tipo }) => {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nombre, email, contraseña, tipo) VALUES (?, ?, ?, ?)',
    [nombre, email, contraseña, tipo]
  );
  return result.insertId;
};

const obtenerTodosUsuarios = async () => {
  const [rows] = await db.execute('SELECT * FROM usuarios');
  return rows;
};

const actualizarUsuario = async (id, { nombre, email, tipo }) => {
  await db.execute(
    'UPDATE usuarios SET nombre = ?, email = ?, tipo = ? WHERE id = ?',
    [nombre, email, tipo, id]
  );
};

const eliminarUsuario = async (id) => {
  // Eliminar "lógico"
  await db.execute('UPDATE usuarios SET activo = false WHERE id = ?', [id]);
};

module.exports = {
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorId,
  crearUsuario,
  obtenerTodosUsuarios,
  actualizarUsuario,
  eliminarUsuario
};