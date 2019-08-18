/**
 * Created by Bestard
 */
var nodemailer = require('nodemailer');
var logger = require('../tools/logger').getLogger();

var transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 25,
    secure: false,
    auth: {
        user: 'prueba',
        pass: 'prueba'
    }
});

module.exports = {
    sendMail: function ( data ) {
        return new Promise( function ( resolve, reject )  {
            var mailOptions = {
                from: data.from,
                to: data.to,
                subject: data.subject,
                html: data.html
            };
            transporter.sendMail(mailOptions, function(err, info){
                if (err) {
                    logger.error('ERROR: Error enviando correo', err);
                    return reject({ status:"ERROR", info:"Error enviando correo" });
                }

                logger.info('INFO: Correo enviado exitosamente', info);
                return resolve({ status:"OK", info:"Correo enviado exitosamente" });
            });
        } );
    }
};
