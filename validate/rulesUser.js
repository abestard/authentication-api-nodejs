/**
 * Created by Bestard
 */
const check = require('express-validator').check;

module.exports = {
    register: [
        check('username').isLength({ min: 1 }).withMessage('El username es requerido'),
        check('email').isLength({ min: 1 }).withMessage('El email es requerido')
            .isEmail().withMessage('El email no es válido.'),
        check('password').isLength({ min: 1 }).withMessage('El password es requerido')
    ],
    validEmail:[
        check('email').isLength({ min: 1 }).withMessage('El email es requerido')
            .isEmail().withMessage('El email no es válido.'),
        check('token').isLength({ min: 1 }).withMessage('El token es requerido')
    ],
    login:[
        check('username').isLength({ min: 1 }).withMessage('El username es requerido'),
        check('password').isLength({ min: 1 }).withMessage('El password es requerido')
    ]
};