const db = require('../config/db');

// Crear nueva película
const crearPelicula = async ({ titulo, poster_url, duracion, sinopsis }) => {
  const [result] = await db.execute(
    'INSERT INTO peliculas (titulo, poster_url, duracion, sinopsis) VALUES (?, ?, ?, ?)',
    [titulo, poster_url, duracion, sinopsis]
  );
  return result.insertId;
};

// Obtener todas las películas
const obtenerTodasPeliculas = async () => {
  const [rows] = await db.execute('SELECT * FROM peliculas');
  return rows;
};

// Obtener una película por ID
const obtenerPeliculaPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM peliculas WHERE id = ?', [id]);
  return rows[0];
};

// Actualizar película
const actualizarPelicula = async (id, { titulo, poster_url, duracion, sinopsis }) => {
  await db.execute(
    'UPDATE peliculas SET titulo = ?, poster_url = ?, duracion = ?, sinopsis = ? WHERE id = ?',
    [titulo, poster_url, duracion, sinopsis, id]
  );
};

// Eliminar película
const eliminarPelicula = async (id) => {
  await db.execute('DELETE FROM peliculas WHERE id = ?', [id]);
};

module.exports = { crearPelicula, obtenerTodasPeliculas, obtenerPeliculaPorId, actualizarPelicula, eliminarPelicula };