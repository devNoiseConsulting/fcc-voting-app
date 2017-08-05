const express = require('express');
const router = express.Router();

const debug = require('./debug');

let signup = function(req, res) {
  // validate the data

};

router.all('/login', debug.debugToken);

router.all('/signup', debug.debugToken);

module.exports = router;
