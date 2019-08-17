/**
 * Created by Bestard
 */
const log4js = require('log4js');

log4js.configure({
    appenders: {
        everything: { type: 'file', filename: 'logs/archivo.log' }
    },
    categories: {
        default: { appenders: [ 'everything' ], level: 'debug' }
    }
});

module.exports = {
    getLogger: function () {
       return log4js.getLogger();
    }
};