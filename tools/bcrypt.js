/**
 * Created by Bestard
 */
var bcrypt = require('bcrypt');
const saltRounds = 10;
var logger = require('../tools/logger').getLogger();

module.exports = {
    hash: function ( plainTextPassword ) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(plainTextPassword, saltRounds, function (err, hash) {
                if (err) {
                    logger.error( 'ERROR: Error encriptando el password.',  err);
                    return reject({ status:"ERROR", data:err });
                }
                logger.info( 'INFO: Password encriptado correctamente.');
                return resolve({ status:"OK", data: hash });
            });
        });
    },
    compare: function ( plainTextPassword, hashPassword) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare( plainTextPassword, hashPassword, function ( err, res ) {
                if (err) {
                    logger.error( 'ERROR: Error veridicando el password(bcrypt).',  err);
                    return reject({status:"ERROR"});
                }

                logger.info( 'INFO: El password fue verificado(bcrypt).', res);
                return resolve({ status:"OK", data: res });
            } );
        });
    }
};