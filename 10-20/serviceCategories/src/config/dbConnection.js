const mysql = require('mysql2');

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'bd_tantakatu'
});

exports.pool = pool;