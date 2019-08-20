/**
 * Created by Bestard
 */
var logger = require('../tools/logger').getLogger();
var jwt = require('jsonwebtoken');
//var fs = require('fs');
var cert = 'shhhhh'; //fs.readFileSync('public.pem');

module.exports = {
    getToken: function(headerJWT, expiresIn) {
        headerJWT.alg = 'HS256';
        headerJWT.typ = 'JWT';

        var payloadJWT = {
            expiresIn: expiresIn //60 * 60 * 24 // expires in 24 hours
        };

        logger.info("INFO: Creando Token JWT.");
        var token = jwt.sign(headerJWT, cert, payloadJWT);

        logger.info("INFO: Token JWT creado con exito.");

        return token;
    },
    validateToken: function(token) {
        return new Promise(function(resolve, reject) {
            jwt.verify(token, cert, function(err, decoded) {
                if (err) {
                    logger.error("ERROR: Error validando token(JWT).", err);
                    return reject({
                        status: "ERROR",
                        data: err
                    });
                }

                logger.info('INFO: Validate token(JWT)', decoded);
                return resolve({
                    status: "OK",
                    data: decoded
                });
            });
        });
    }
};