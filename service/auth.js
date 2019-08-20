/**
 * Created by Bestard
 */
let userDb = require('../database/user');
let JWT = require('../tools/jwt');
let bcrypt = require('../tools/bcrypt');
var logger = require('../tools/logger').getLogger();

const EXPIRES_IN = 86400;

module.exports = {
    login: function(username, password) {
        return new Promise(function(resolve, reject) {
            userDb.findByUsername(username)
                .then(function(result) {
                    if (!result.data || !result.data.active) {
                        logger.info('WARNING: Login: Usuario o contraseña incorrectos');
                        return reject({
                            status: "ERROR"
                        });
                    }

                    bcrypt.compare(password, result.data.password)
                        .then(function(res) {
                            if (!res) {
                                logger.error('ERROR: Login: Usuario o contraseña incorrectos');
                                return reject({
                                    status: "ERROR"
                                });
                            }

                            logger.info('INFO: Login: Usuario logueado con existo', res);
                            delete result.data.password;
                            return resolve({
                                status: "OK",
                                data: result.data,
                                jwt: JWT.getToken({
                                    username: username
                                }, EXPIRES_IN)
                            });

                        }).catch(function(err) {

                            logger.error('ERROR: Login: Usuario o contraseña incorrectos', err);
                            return reject({
                                status: "ERROR"
                            });

                        });

                }).catch(function(err) {

                    logger.error('ERROR: Login: Usuario o contraseña incorrectos', err);
                    return reject({
                        status: "ERROR"
                    });

                });
        });
    },
    verify: function(token) {
        return JWT.validateToken(token);
    }
};