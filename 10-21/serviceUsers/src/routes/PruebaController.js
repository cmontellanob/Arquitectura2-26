
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var logger = require('../config/log');


// Inicio
router.get('/', function(req, res) {
    logger.info("Ingreso a Prueba");
    res.status(200).send({"Mensaje":"Esta es una prueba"});  
   
});

module.exports = router;