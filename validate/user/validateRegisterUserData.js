/**
 * Created by Bestard
 */
var EmailValidator = require("email-validator");

module.exports = function(user) {
    if (!user.email)
        return {
            status: "ERROR",
            info: "El email es requerido."
        };

    if (!EmailValidator.validate(user.email))
        return {
            status: "ERROR",
            info: "El email no es válido."
        };

    if (!user.username)
        return {
            status: "ERROR",
            info: "El username es requerido."
        };

    if (!user.password)
        return {
            status: "ERROR",
            info: "El password es requerido."
        };

    if (user.password.length < 6)
        return {
            status: "ERROR",
            info: "El password no es seguro. Debe contener más de 6 caracteres"
        };

    return {
        status: "OK"
    };
};