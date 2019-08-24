/**
 * Created by Bestard
 */
var registerUser = require('../service/user/registerUser');
var validateEmailUser = require('../service/user/validateEmailUser');
var Auth = require('../service/auth');

module.exports = {
    register: function(req, res) {
        var body = req.body;

        var User = {
            username: body.username,
            email: body.email,
            password: body.password
        };

        registerUser(User)
            .then(function(result1) {

                res.status(200).json(result1);

            }).catch(function(err) {

                res.status(500).json(err);

            });
    },

    validateEmail: function(req, res) {
        var token = req.body.token;
        var email = req.body.email;

        validateEmailUser(token, email)
            .then(function(result) {
                res.status(200).json(result);
            }).catch(function(err) {
                res.status(500).json(err);
            });
    },

    login: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        Auth.login(username, password)
            .then(function(result) {
                res.status(200).json(result);
            }).catch(function() {
                res.status(400).json({
                    status: "ERROR",
                    info: "Usuario o contraseña incorrectos."
                });
            });
    }
};