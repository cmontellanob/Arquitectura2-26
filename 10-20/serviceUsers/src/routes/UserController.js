var VerifyToken = require('./VerifyToken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var logger = require('../config/log');


// Crear usuario
router.post('/',function (req, res) {
    logger.info("Begin Register User");
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log(req.body.email);
    User.findOne({ "email": req.body.email })
        .then(usuarioExistente => {
            if (usuarioExistente) {
                console.log('El usuario ya existe:', usuarioExistente);
                return res.status(500).send(
                    { message: 'El usuario ya existe' }
                );
            } else {

                const nuevoUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    dateCreate: new Date(),
                    state: "active",
                    password: hashedPassword
                });
               // console.log(nuevoUser);

                nuevoUser.save();
                //});
                console.log("entro");
                return res.status(200).send(req.body);

            }
        });
    logger.info("End Register User");
});
// Listar todos usuarios 
router.get('/', function (req, res) {
    logger.info("Inicio Lista deusuarios");
    User.find().exec()
    .then  (users=>{
        res.status(200).send(users);
    });
    logger.info("Final lista de usuarios");
});

// Obtener un usuario
router.get('/:id', function (req, res) {
    logger.info("Begin List User");
    console.log(req.params.id);
    User.findById(req.params.id).exec()
        .then(usuarioExistente => {
            console.log(usuarioExistente);
        if (!usuarioExistente) return res.status(404).send("No user found.");
        res.status(200).send(usuarioExistente);
        logger.info("End List User");
    });
});

// Eliminar logicamenteun usuario
router.delete('/:id', function (req, res) {
    logger.info("Begin inactive User");
    console.log("inactivo");
    User.findByIdAndDelete(req.params.id).exec()
    .then (UsuarioEliminado=> {
        res.status(200).send(UsuarioEliminado);
    });
    logger.info("End inactive User");
});

// Actualizar un usuario
router.put('/:id', function (req, res) {
    logger.info("Begin Update User");
    //   console.log(req);
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
    .then (UsuarioActualizado=> {
        res.status(200).send(UsuarioActualizado);
    });
    logger.info("End Update User");
});
// add the middleware function
router.use(function (user, req, res, next) {
    res.status(200).send(user);
});

module.exports = router;