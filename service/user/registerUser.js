/**
 * Created by Bestard
 */
var UserDB = require( '../../database/user' );
var logger = require('../../tools/logger').getLogger();
var JWT = require('../../tools/jwt');
//var Mail = require('../../tools/mail');

const EXPIRES_IN = 86400;

module.exports = function ( user ) {
    return new Promise( function (resolve, reject) {
        UserDB.insert( user )
            .then(function () {

                var token = JWT.getToken({
                    username: user.username,
                    activeEmail: user.email
                }, EXPIRES_IN);

                logger.info("INFO: Token para validar email:", token);
                console.log("INFO: Token para validar email:", token);

                //var optionsMail = {
                //    from: 'prueba@localhost.com',
                //    to: 'prueba@localhost.com',
                //    subject: "Activar Email",
                //    html: token
                //};

                // Mail.sendMail( optionsMail );

                logger.info("INFO: El usuario ha sido registrado correctamente.", user.email);
                resolve({ status:"OK", info:"Su usuario ha sido registrado correctamente." });
            }).catch(function (err) {
                logger.error("Error al registrar el usuario.", user.email, err);
                reject({ status:"ERROR", info:"Error al registrando el usuario."});
            });
    });
};