/**
 * Created by Bestard
 */
let db_tools = require('../tools/database');
let bcrypt = require('../tools/bcrypt');
var logger = require('../tools/logger').getLogger();

module.exports = {
    createTable: function () {
        return new Promise( function (resolve, reject) {
            let db = db_tools.getConexion();

            if( !db ) reject();

            db_tools.getConexion().run(`CREATE TABLE user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username text, 
                    email text UNIQUE, 
                    password text, 
                    active boolean not null default 0,
                    CONSTRAINT email_unique UNIQUE (email)
                )`, function(err){
                    if( err ) logger.info( 'WARNING: La base de datos "User" ya existe, no fue necesario crearla.');
                    else logger.info( 'INFO: Se creo la base de datos "User".');
                    resolve()
            });
        } );
    },
    insert:function ( user ) {
        var insert = 'INSERT INTO user (username, email, password) VALUES (?,?,?)';
        return new Promise(function (resolve, reject) {
            bcrypt.hash( user.password )
                .then( function (result) {
                    var dataUser = [ user.username, user.email, result.data ];
                    db_tools.getConexion().run(insert, dataUser, function ( err ) {
                        if( err ) {
                            logger.error( 'ERROR: Error insertando un usuario.',  err);
                            return reject({ status:"ERROR", data:err });
                        }
                        logger.info( 'INFO: Usuario insertado con exito.');
                        return resolve({status:"OK"});
                    });
                } ).catch(function (err) {
                    logger.error( 'ERROR: Error insertando un usuario.',  err);
                    return reject( err );
                });
        });
    },
    findByEmail:function ( email ) {
        var select = 'SELECT * FROM user WHERE email = ?';
        return new Promise(function ( resolve, reject ) {
            db_tools.getConexion().get(select,[ email ], function( err, row ){
                if( err ) {
                    logger.error("ERROR: findByEmail User", err);
                    return reject({ status:"ERROR", data:null });
                }
                logger.info("INFO: findByUsername Email:", email);
                return resolve({ status:"OK", data:(( !row )? null : row) });
            });
        });
    },
    findByUsername:function ( username ) {
        var select = 'SELECT * FROM user WHERE username = ?';
        return new Promise(function ( resolve, reject ) {
            db_tools.getConexion().get(select,[ username ], function( err, row ){
                if( err ) {
                    logger.error("ERROR: Error findByUsername User", err);
                    resolve(null);
                }
                logger.info("INFO: findByUsername Username:", username);
                resolve(( !row )? null : row )
            });
        });
    },
    findByEmailOrUsername:function ( email, username ) {
        var select = 'SELECT * FROM user WHERE email = ? OR username = ?';
        return new Promise(function ( resolve, reject ) {
            db_tools.getConexion().get(select,[ email, username ], function( err, row ){
                if( err ) {
                    logger.error("ERROR: findByEmailUsername User", err);
                    return reject({ status:"ERROR", data:null });
                }
                logger.info("INFO: findByEmailUsername Email:", email, username);
                return resolve({ status:"OK", data:(( !row )? null : row) });
            });
        });
    },
    activateEmail:function ( email ) {
        var update = 'UPDATE user SET active = true WHERE email = ?;';
        return new Promise(function ( resolve, reject ) {
            db_tools.getConexion().run(update, [ email ], function( err ){
                if( err ) {
                    logger.error("ERROR: Error activateEmail User", err);
                    return reject({ status:"ERROR" });
                }
                logger.info("INFO: Email activado", email);
                return resolve({ status:"OK" });
            });
        });
    },
};