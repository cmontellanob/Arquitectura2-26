const mysql = require('mysql');

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'bd_tantakatu'
});

exports.pool = pool;