const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usuarioRoutes = require('./src/routes/userRoutes');
const peliculaRoutes = require('./src/routes/peliculaRoutes');
const salaRoutes = require('./src/routes/salasRoutes');
const funcionRoutes = require('./src/routes/funcionRoutes');
const reservacionRoutes = require('./src/routes/reservasRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/funciones', funcionRoutes);
app.use('/api/reservaciones', reservacionRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});