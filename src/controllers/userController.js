const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/userModel');

// Login
const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await Usuario.obtenerUsuarioPorEmail(email);

  // Validar existencia y que esté activo
  if (!usuario || usuario.activo === 0) {
    return res.status(401).json({ success: false, message: 'Credenciales incorrectas o cuenta inactiva' });
  }

  const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!esValido) {
    return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ success: true, message: 'Login exitoso', token });
};

// Crear nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, email, contraseña, tipo } = req.body;

  const usuarioExistente = await Usuario.obtenerUsuarioPorEmail(email);
  if (usuarioExistente) {
    return res.status(400).json({ success: false, message: 'El email ya está registrado' });
  }

  const contraseñaHash = await bcrypt.hash(contraseña, 10);
  const tipoFinal = tipo === 'admin' ? 'admin' : 'cliente';

  const idUsuario = await Usuario.crearUsuario({
    nombre,
    email,
    contraseña: contraseñaHash,
    tipo: tipoFinal
  });

  res.status(201).json({ success: true, message: 'Usuario creado', userId: idUsuario });
};

// Obtener perfil
const obtenerPerfil = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.obtenerUsuarioPorId(id);

  if (!usuario || !usuario.activo) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado o inactivo' });
  }

  res.status(200).json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    tipo: usuario.tipo,
  });
};

// Obtener todos los usuarios (solo admin)
const obtenerUsuarios = async (req, res) => {
  if (req.usuario.tipo !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado' });
  }

  const usuarios = await Usuario.obtenerTodosUsuarios();
  res.status(200).json({ success: true, usuarios });
};

// Actualizar usuario (solo admin o el mismo usuario)
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, tipo } = req.body;

  if (req.usuario.tipo !== 'admin' && req.usuario.id != id) {
    return res.status(403).json({ success: false, message: 'No autorizado' });
  }

  await Usuario.actualizarUsuario(id, { nombre, email, tipo });
  res.status(200).json({ success: true, message: 'Usuario actualizado' });
};

// Deshabilitar usuario (solo admin)
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  if (req.usuario.tipo !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado' });
  }

  await Usuario.eliminarUsuario(id);
  res.status(200).json({ success: true, message: 'Usuario dado de baja' });
};

module.exports = {
  loginUsuario,
  crearUsuario,
  obtenerPerfil,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
};