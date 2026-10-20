var express = require('express');

var app = express();


 var db =  require('./config/db');




var UserController = require('./routes/UserController');
var LoginController = require('./routes/LoginController');
var PruebaController = require('./routes/PruebaController');


app.use('/', PruebaController);
app.use('/api/v1/users', UserController);
app.use('/api/v1/login', LoginController);

module.exports = app;