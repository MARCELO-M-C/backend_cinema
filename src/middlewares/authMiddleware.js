const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token inválido' });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuario?.tipo !== 'admin') {
    return res.status(403).json({ success: false, message: 'Solo administradores pueden realizar esta acción' });
  }
  next();
};

module.exports = { verificarToken, esAdmin };