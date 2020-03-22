var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
    res.status(200).send(req.query.validationtoken);
});

module.exports = router;