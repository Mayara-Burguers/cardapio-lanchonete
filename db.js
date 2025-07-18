const mysql = require('mysql2/promise');
require('dotenv').config();

// Cria um "pool" de conexões, que é mais eficiente do que criar uma nova conexão a cada consulta
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("Pool de conexões com o MySQL criado com sucesso!");

module.exports = pool;