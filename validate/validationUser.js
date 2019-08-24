/**
 * Created by Bestard
 */
const validationResult = require('express-validator').validationResult;
var UserDB = require('../database/user');

module.exports = {
    validateRegister: function (req, res, next) {
        var errors = validationResult(req).errors;
        if (errors.length) {
            return res.status(400).json({
                status: 'ERROR',
                info: errors[0].msg
            });
        } else {
            var body = req.body;
            UserDB.findByEmailOrUsername(body.email, body.username)
                .then(function(result) {

                    if (result.data) {
                        res.status(400).json({
                            status: "ERROR",
                            info: "El email esta siendo usado."
                        });
                    } else {
                        return next();
                    }
                }).catch(function() {
                res.status(400).json({
                    status: "ERROR",
                    info: "El email esta siendo usado."
                });
            });
        }
    },

    validateValidEmail: function (req, res, next) {
        var errors = validationResult(req).errors;
        if (errors.length) {
            return res.status(400).json({
                status: 'ERROR',
                info: errors[0].msg
            });
        } else {
            return next();
        }
    },

    validateLogin: function (req, res, next) {
        var errors = validationResult(req).errors;
        if (errors.length) {
            return res.status(400).json({
                status: 'ERROR',
                info: errors[0].msg
            });
        } else {
            return next();
        }
    }
};