var express = require('express');
var router = express.Router();

var userControllers = require('../controllers/userControllers');
var validationUser = require('../validate/validationUser');
var rulesUser = require('../validate/rulesUser');

router.post('/register', rulesUser.register, validationUser.validateRegister, userControllers.register);

router.post('/login', rulesUser.login, validationUser.validateLogin, userControllers.login);

router.post('/validate', rulesUser.validEmail, validationUser.validateValidEmail, userControllers.validateEmail);

module.exports = router;