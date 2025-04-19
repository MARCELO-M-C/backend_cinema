const db = require('../config/db');

const crearPelicula = async ({ titulo, poster_url, duracion, sinopsis }) => {
  const [result] = await db.execute(
    'INSERT INTO peliculas (titulo, poster_url, duracion, sinopsis) VALUES (?, ?, ?, ?)',
    [titulo, poster_url, duracion, sinopsis]
  );
  return result.insertId;
};

const obtenerPeliculaPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM peliculas WHERE id = ?', [id]);
  return rows[0];
};

const obtenerTodasPeliculas = async () => {
  const [rows] = await db.execute('SELECT * FROM peliculas');
  return rows;
};

module.exports = { crearPelicula, obtenerPeliculaPorId, obtenerTodasPeliculas };