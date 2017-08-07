const express = require('express');
const router = express.Router();
const User = require('./model/user');

const debug = require('./debug');

let signup = function(req, res, next) {
  console.log('signup', req.body.email, req.body.password);
  console.log(req.body);
  // validate the data
  data = {
    email: req.body.email,
    password: req.body.password
  }
  User.create(data)
    .then(task => {
      // Do some cookie stuff before we send the response.
      res.status(200).send(task)
      next();
    })
    .catch(err => {
      res.status(500).send(err);
    })
};

router.all('/login', debug.debugToken);

router.all('/signup', signup);

module.exports = router;
