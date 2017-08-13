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
    res.status(200).send(poll.toClient());
  }).catch(err => {
    res.status(500).send(err);
  });
};

let getPoll = function(req, res, next) {
  let errorJSON = {
    status: 403,
    error: 'Could not find a poll with that id.'
  };

  // grab the parameters sent in
  let id = req.params.id;

  // see if we can find the user in mongo.
  Poll.findOne({_id: id}).then(poll => {
    if (poll) {
      res.status(200).send(poll.toClient());
    } else {
      res.status(403).send(errorJSON);
    }
  }).catch(err => {
    res.status(403).send(err);
  });
};

let deletePoll = function(req, res, next) {
  let errorJSON = {
    status: 403,
    error: 'Could not find a poll with that id.'
  };

  // grab the parameters sent in
  let id = req.params.id;

  Poll.remove({_id: id}).then(poll => {
    var response = {
      status: 202,
      message: "Poll successfully deleted",
      id: id
    };
    res.status(202).send(response);
  }).catch(err => {
    res.status(403).send(err);
  });
};

router.get('/polls/:offset', debug.reqMirror);

router.post('/newpoll', authCheck, createPoll);

router.get('/poll/:id', getPoll);
router.post('/poll/:id', debug.reqMirror);
router.put('/poll/:id', authCheck, debug.reqMirror);
router.delete('/poll/:id', authCheck, deletePoll);

module.exports = router;
