const db = require('../config/db'); 


const obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0]; 
};


const crearUsuario = async ({ nombre, email, contraseña, tipo }) => {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nombre, email, contraseña, tipo) VALUES (?, ?, ?, ?)', 
    [nombre, email, contraseña, tipo]
  );
  return result.insertId; 
};

module.exports = { obtenerUsuarioPorEmail, crearUsuario };