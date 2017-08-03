var express = require('express');
var router = express.Router();

const debug = require('./debug');

router.all('/login', debug.reqMirror);

router.all('/signup', debug.reqMirror);

module.exports = router;
