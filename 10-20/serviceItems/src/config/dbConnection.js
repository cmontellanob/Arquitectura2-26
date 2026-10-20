const mysql = require('mysql2');

var pool = mysql.createPool({
    host: "mysql",
    user: "root",
    password: "",
    database: "bd_tantakatu"
});

exports.pool = pool;