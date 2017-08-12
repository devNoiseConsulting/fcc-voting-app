const express = require('express');
const router = express.Router();
const Poll = require('./model/poll');


const jwt = require('jwt-simple');

const jwtSecret = Buffer.from(process.env.JWT_SECRET, 'hex');

const debug = require('./debug');

let errorJSON = {
  status: 403,
  success: false,
  error: 'Failed to authenticate token.'
};

let authCheck = function(req, res, next) {
  //write your logic here to check for token.
  let token = req.cookies.authToken;
  if (token) {
    try {
      let decoded = jwt.decode(token, jwtSecret);
      if (decoded.email) {
        req.authEmail = decoded.email;
        next();
      }
    } catch (e) {
      // It was a bad cookie.
      res.clearCookie('authToken');
      res.status(403).send(errorJSON);
    }
  } else {
    res.clearCookie('authToken');
    res.status(403).send(errorJSON);
  }
};

let createPoll = function(req, res, next) {
  data = {
    title: req.body.title,
    owner: req.authEmail,
    choices: req.body.choices,
    voters: []
  };

  Poll.create(data).then(poll => {
    res.status(200).send(poll);
  }).catch(err => {
    res.status(500).send(err);
  });
}

router.get('/polls/:offset', debug.reqMirror);

router.post('/newpoll', authCheck, createPoll);

router.get('/poll/:id', debug.reqMirror);
router.post('/poll/:id', debug.reqMirror);
router.put('/poll/:id', authCheck, debug.reqMirror);
router.delete('/poll/:id', authCheck, debug.reqMirror);

module.exports = router;
