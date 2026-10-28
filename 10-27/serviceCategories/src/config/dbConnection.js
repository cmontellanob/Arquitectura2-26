const mysql = require('mysql2');

// Variables definidas en .env (local) o en docker-compose.yml (contenedor)
var pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bd_tantakatu",
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
});

exports.pool = pool;
