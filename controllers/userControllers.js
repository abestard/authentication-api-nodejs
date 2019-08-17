/**
 * Created by Bestard
 */
var UserDB = require('../database/user');
var registerUser = require('../service/user/registerUser');
var validateEmailUser = require('../service/user/validateEmailUser');
var Auth = require( '../service/auth' );
var EmailValidator = require("email-validator");
var logger = require('../tools/logger').getLogger();

module.exports = {
    register: function (req, res) {
        let body = req.body;

        if (!body.email)
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El email es requerido."
                }
            );
        else if( !EmailValidator.validate(body.email) )
             res.status(400).json(
                 {
                     status: "ERROR",
                     info: "El email no es válido."
                 }
             );
        else if (!body.username)
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El username es requerido."
                }
            );
        else if (!body.password)
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El password es requerido."
                }
            );
        else if( body.password.length < 6 )
             res.status(400).json(
                 {
                     status: "ERROR",
                     info: "El password no es seguro. Debe contener más de 6 caracteres"
                 }
             );
        else {
            UserDB.findByEmailOrUsername(body.email, body.username)
                .then(function (result) {

                    if ( result.data ) {
                        res.status(400).json(
                            {
                                status: "ERROR",
                                info: "El email " + body.email + " esta siendo usado."
                            }
                        );
                    } else {

                        var User = {
                            username: body.username,
                            email: body.email,
                            password: body.password
                        };

                        registerUser(User)
                            .then(function (result1) {

                                res.status(200).json(result1);

                            }).catch(function (err) {

                                res.status(500).json(err);

                            });
                    }
                }).catch(function () {
                    res.status(400).json(
                        {
                            status: "ERROR",
                            info: "El email " + body.email + " esta siendo usado."
                        }
                    );
                });
        }
    },
    
    validateEmail: function (req, res) {
        var token = req.body.token;
        var email = req.body.email;

        if( !email )
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El email es requerido."
                }
            );
        else if( !EmailValidator.validate(email) )
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El email no es válido."
                }
            );
        else if( !token )
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El token es requerido."
                }
            );
        else{
            validateEmailUser( token, email )
                .then( function (result) {
                    res.status(200).json( result );
                } ).catch( function (err) {
                    res.status(500).json( err );
                } );
        }
    },
    
    login: function( req, res ){
        var username = req.body.username;
        var password = req.body.password;

        if( !username )
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El username es requerido."
                }
            );
        else if( !password )
            res.status(400).json(
                {
                    status: "ERROR",
                    info: "El password es requerido."
                }
            );
        else {
            Auth.login( username, password )
                .then(function (result) {
                    res.status(200).json( result );
                }).catch(function () {
                res.status(400).json(
                    {
                        status: "ERROR",
                        info: "Usuario o contraseña incorrectos."
                    }
                );
            });
        }
    }
};
