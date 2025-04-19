const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/userModel');

// Login
const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await Usuario.obtenerUsuarioPorEmail(email);

  if (!usuario) {
    return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }

  const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!esValido) {
    return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ success: true, message: 'Login exitoso', token });
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, email, contraseña, tipo } = req.body; // <--- AHORA sí incluimos tipo

  const usuarioExistente = await Usuario.obtenerUsuarioPorEmail(email);
  if (usuarioExistente) {
    return res.status(400).json({ success: false, message: 'El email ya está registrado' });
  }

  const contraseñaHash = await bcrypt.hash(contraseña, 10);
  const tipoFinal = tipo === 'admin' ? 'admin' : 'cliente'; // seguridad: solo admin o cliente

  const idUsuario = await Usuario.crearUsuario({
    nombre,
    email,
    contraseña: contraseñaHash,
    tipo: tipoFinal
  });

  res.status(201).json({ success: true, message: 'Usuario creado', userId: idUsuario });
};

// Obtener datos del usuario
const obtenerPerfil = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.obtenerUsuarioPorEmail(id);

  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  res.status(200).json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    tipo: usuario.tipo,
  });
};

module.exports = { loginUsuario, crearUsuario, obtenerPerfil };