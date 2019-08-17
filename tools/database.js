/**
 * Created by Bestard
 */
var sqlite3 = require('sqlite3').verbose();
var logger = require('../tools/logger').getLogger();

const DBSOURCE = "db.sqlite";

//let db = new sqlite3.Database('./database/sq-lite-data-base.db')
var db;
module.exports = {
    conect:function () {
        return new Promise( function (resolve, reject) {
            db = new sqlite3.Database(DBSOURCE, function(err){
                    if(err) {
                        logger.error('ERROR: ',err.message);
                        return reject(null);
                    }
                    logger.info("INFO: Conectado a la base de datos!!!");
                    console.log("INFO: Conectado a la base de datos!!!");
            });
            resolve(db);
        } );
    },
    getConexion:function () {
        if( !db ) {
            logger.error( 'ERROR: Error de conexión.');
            console.error( 'ERROR: Error de conexión.');
            return null;
        }
        return db;
    }
};