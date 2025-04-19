const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

// Cargar variables de entorno
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const userRoutes = require('./src/routes/userRoutes');
const salasRoutes = require('./src/routes/salasRoutes');
const funcionRoutes = require('./src/routes/funcionRoutes');
const reservasRoutes = require('./src/routes/reservasRoutes');
const peliculasRoutes = require('./src/routes/peliculaRoutes');

// Rutas base
app.use('/api/usuarios', userRoutes);
app.use('/api/salas', salasRoutes);
app.use('/api/funciones', funcionRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/peliculas', peliculasRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🎬 API de Cine corriendo correctamente');
});

// Manejo de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});