/**
 * Created by Bestard
 */
let UserDB = require('../../database/user');
let JWT = require('../../tools/jwt');
var logger = require('../../tools/logger').getLogger();

module.exports = function(token, email) {
    return new Promise(function(resolve, reject) {
        JWT.validateToken(token)
            .then(function(result) {

                if (result.data.activeEmail == email) {

                    UserDB.activateEmail(email)
                        .then(function(res) {

                            logger.info("INFO: El email ha sido activado", email, res);
                            return resolve({
                                status: "OK",
                                info: "Su email ha sido activado."
                            });

                        }).catch(function(err) {

                            logger.info("ERROR: Error validando la cuenta.", email, err);
                            return reject({
                                status: "ERROR",
                                info: "Error validando la cuenta."
                            });

                        });

                } else {

                    resolve({
                        status: "ERROR",
                        info: "Token no válido."
                    });
                    logger.info("INFO: Token no valido", email);

                }
            }).catch(function(err) {

                logger.error("ERROR: Error validando email", email, err);
                return reject({
                    status: "ERROR",
                    info: "Error validando email."
                });

            });
    });
};