const express = require('express');
const router = express.Router();
const User = require('./model/user');

const jwt = require('jwt-simple');

const jwtSecret = Buffer.from(process.env.JWT_SECRET, 'hex');

const debug = require('./debug');

let login = function(req, res, next) {

};

let signup = function(req, res, next) {
  console.log('signup', req.body.email, req.body.password);
  console.log(req.body);
  data = {
    email: req.body.email,
    password: req.body.password
  }
  User.create(data)
    .then(task => {
      // Do some cookie stuff before we send the response.
      let payload = {email: task.email };
      let token = jwt.encode(payload, jwtSecret);

      console.log('token value', payload);
      console.log('signup cookie', token);
      res.cookie('authToken', token, { maxAge: 900000, httpOnly: true })

      res.status(200).send(task)
      next();
    })
    .catch(err => {
      res.status(500).send(err);
    })
};

let debugCookie = function(req, res, next) {
  let token = req.cookies.authToken;
  console.log('token', token);
  let decoded = jwt.decode(token, jwtSecret);
  console.log('decoded', decoded);

  res.status(200).send(decoded);
};

router.post('/login', debug.debugToken);

router.post('/signup', signup);

router.all('/debug-cookie', debugCookie);

module.exports = router;
