const mysql = require('mysql2');

// "mysql" solo resuelve dentro de Docker; localmente se usa localhost
var pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bd_tantakatu"
});

exports.pool = pool;
