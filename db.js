const mysql = require("mysql2");

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia esto según tu configuración
  password: "password", // Cambia esto según tu configuración
  database: "football_league", // Cambia esto según tu configuración
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = db;