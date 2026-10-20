var jwt = require('jsonwebtoken');
var config = require('../../config/config');

function verifyToken(req, res, next) {
    var token = req.headers['authorization']
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    token = token.substring(7);
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // Autorizacion para las rutas get
        // if (req.route.methods.get) {
        //     if (decoded.isAdmin != 'yes' && req.baseUrl != "/api/v1/login")
        //         return res.status(401).send({ auth: false, message: 'Unautorized to get user info ' });
        // }
        // // Autorizacion para las rutas put    
        // if (req.route.methods.put) {
        //     if (decoded.isAdmin != 'yes' && decoded.id != req.url.substring(1))
        //         return res.status(401).send({ auth: false, message: 'Unautorized to update user' });
        // }
        // // Autorizacion para las rutas delete    
        // if (req.route.methods.delete) {

        //     if (decoded.isAdmin != 'yes' && decoded.id != req.url.substring(1))
        //         return res.status(401).send({ auth: false, message: 'Unautorized to delete user' });
        // }
        req.userId = decoded.id;
        req.isSeller = decoded.isSeller;
        req.isBuyer = decoded.isBuyer;
        req.isAdmin = decoded.isAdmin;
        next();
    });
}
module.exports = verifyToken;