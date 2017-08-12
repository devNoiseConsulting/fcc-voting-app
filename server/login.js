const express = require('express');
const router = express.Router();
const User = require('./model/user');

const jwt = require('jwt-simple');

const jwtSecret = Buffer.from(process.env.JWT_SECRET, 'hex');

const debug = require('./debug');

let mkToken = function(user) {
  let payload = {
    email: user.email
  };

  return jwt.encode(payload, jwtSecret);
};

let login = function(req, res, next) {
  let errorJSON = {
    status: 403,
    error: 'Login failed. Please try again.'
  };

  let hanndlePasswordCheck = function(err, isMatch, user) {
    if (err) {
      res.clearCookie('authToken');
      res.status(403).send(err);
    } else {
      if (isMatch) {
        let token = mkToken(user);
        res.cookie('authToken', token, {
          maxAge: 900000,
          httpOnly: true
        });

        res.status(200).send(user);
      } else {
        res.clearCookie('authToken');
        res.status(403).send(errorJSON);
      }
    }
  };

  // grab the parameters sent in
  let email = req.body.email;
  let password = req.body.password;

  // see if we can find the user in mongo.
  User.findOne({email: email}).then(user => {
    if (user) {
      // test to see if the password matches.
      user.comparePassword(password, hanndlePasswordCheck);
    } else {
      res.clearCookie('authToken');
      res.status(403).send(errorJSON);
    }
  }).catch(err => {
    res.clearCookie('authToken');
    res.status(403).send(err);
  });
};

let signup = function(req, res, next) {
  data = {
    email: req.body.email,
    password: req.body.password
  };
  
  User.create(data).then(user => {
    // Do some cookie stuff before we send the response.
    let token = mkToken(user);
    res.cookie('authToken', token, {
      maxAge: 900000,
      httpOnly: true
    });

    res.status(200).send(user)
    next();
  }).catch(err => {
    res.clearCookie('authToken');
    res.status(500).send(err);
  });
};

let debugCookie = function(req, res, next) {
  let token = req.cookies.authToken;
  console.log('token', token);
  let decoded = jwt.decode(token, jwtSecret);
  console.log('decoded', decoded);

  res.status(200).send(decoded);
};

router.post('/login', login);

router.post('/signup', signup);

router.all('/debug-cookie', debugCookie);

module.exports = router;
