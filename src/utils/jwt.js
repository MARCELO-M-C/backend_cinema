const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, tipo: usuario.tipo },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Expira en una hora
  );
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generarToken, verificarToken };