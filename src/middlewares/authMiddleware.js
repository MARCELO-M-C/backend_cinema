const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Almacenar los datos del usuario decodificados en la petición
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
};

module.exports = { verificarToken };