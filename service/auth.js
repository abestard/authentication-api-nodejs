/**
 * Created by Bestard
 */
let UserDB = require( '../database/user' );
let JWT = require( '../tools/jwt' );
let bcrypt = require( '../tools/bcrypt' );
var logger = require('../tools/logger').getLogger();

var expiresIn = 86400;

module.exports = {
    login: function (username, password) {
            return new Promise( function (resolve, reject) {
                UserDB.findByUsername(username)
                    .then(function (user) {
                        if (!user || !user.active ) {
                            logger.info('WARNING: Login:- Usuario o contraseña incorrectos.');
                            return reject({status: "ERROR"} );
                        }

                        bcrypt.compare(password, user.password)
                            .then(function (res) {
                                if( !res.data ) {
                                    logger.error('ERROR: Login:- Usuario o contraseña incorrectos.');
                                    return reject({status: "ERROR"} );
                                }
                                
                                logger.info('INFO: Login:- Usuario logueado con existo.', res);
                                delete user['password'];
                                return resolve({ status:"OK", data:user, jwt:JWT.getToken({username: username}, expiresIn)});

                            }).catch(function (err) {



                            });

                    }).catch(function (err) {

                        logger.error('ERROR: Login:- Usuario o contraseña incorrectos.');
                        return reject({status: "ERROR"} );

                    });
            });
    },
    verify: function ( token ) {
      return JWT.validateToken(token);
    }
};