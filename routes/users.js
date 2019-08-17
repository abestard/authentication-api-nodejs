var express = require('express');
var router = express.Router();

var userControllers = require('../controllers/userControllers');

router.post('/register', userControllers.register);

router.post('/login', userControllers.login);

router.post('/validate', userControllers.validateEmail);

module.exports = router;
