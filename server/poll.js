const express = require('express');
const router = express.Router();
const Poll = require('./model/poll');

const jwt = require('jwt-simple');

const jwtSecret = Buffer.from(process.env.JWT_SECRET, 'hex');

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
    res.status(501).send(err);
  });
};

let getPolls = function(req, res, next) {
  errorJSON.error = 'Could not find any polls.';

  // grab the parameters sent in
  let offset = req.params.offset ? parseInt(req.params.offset) : 0;
  offset = (offset < 0) ? 0 : offset;

  let limit = req.params.limit ? parseInt(req.params.limit) : 20;
  limit = (limit < 0) ? 20 : limit;
  limit = (limit > 100) ? 100 : limit;

  Poll.paginate({}, { offset: offset, limit: limit }).then(result => {
    result.docs = result.docs.map(poll => poll.toClient());
    res.status(200).send(result);
  }).catch(err => {
    res.status(501).send(err);
  });
};

let getPoll = function(req, res, next) {
  errorJSON.error = 'Could not find a poll with that id.';

  // grab the parameters sent in
  let id = req.params.id;

  // see if we can find the poll in mongo.
  Poll.findOne({_id: id}).then(poll => {
    if (poll) {
      res.status(200).send(poll.toClient());
    } else {
      res.status(403).send(errorJSON);
    }
  }).catch(err => {
    res.status(501).send(err);
  });
};

let recordPollVote = function(req, res, next) {
  let compareChoices = function(a, b) {
    return a.id - b.id;
  }

  errorJSON.error = 'Could not find a poll with that id.';

  // grab the parameters sent in
  let id = req.params.id;
  let choice = req.body.choice;

  Poll.findOne({_id: id}).then(poll => {
    if (poll) {
      poll.choices = poll.choices.map(c => {
        if (c.id == choice) {
          c.count = c.count + 1;
        }
        return c;
      });

      poll.save().then(poll => {
        res.status(200).send(poll.toClient());
      }).catch(err => {
        errorJSON.status = 500;
        errorJSON.error = 'Could not update poll.';
        res.status(500).send(errorJSON);
      });
    } else {
      res.status(403).send(errorJSON);
    }
  }).catch(err => {
    res.status(501).send(err);
  });
};

let addPollChoice = function(req, res, next) {
  errorJSON.error = 'Could not find a poll with that id.';

  // grab the parameters sent in
  let id = req.params.id;
  let display = req.body.display;

  Poll.findOne({_id: id}).then(poll => {
    if (poll) {
      // Find max choice id
      let newId = poll.choices.reduce((acc, c) => {
        if (c.id > acc) {
          acc = c.id;
        }
        return acc;
      }, -1) + 1;

      // Make new choice object
      // Push choice object onto choices array.
      poll.choices.push({id: newId, display: display, count: 1});

      poll.save().then(poll => {
        res.status(200).send(poll.toClient());
      }).catch(err => {
        errorJSON.status = 500;
        errorJSON.error = 'Could not update poll.';
        res.status(500).send(errorJSON);
      });
    } else {
      res.status(403).send(errorJSON);
    }
  }).catch(err => {
    res.status(501).send(err);
  });
};

let deletePoll = function(req, res, next) {
  errorJSON.error = 'Could not find a poll with that id or you are not allowed to remove that poll.';

  // grab the parameters sent in
  let id = req.params.id;
  let email = req.authEmail;

  Poll.remove({_id: id, owner: email}).then(commandResult => {
    if (commandResult.result.n > 0) {
      var response = {
        status: 202,
        message: "Poll successfully deleted",
        id: id
      };
      res.status(202).send(response);
    } else {
      res.status(403).send(errorJSON);
    }
  }).catch(err => {
    res.status(501).send(err);
  });
};

router.get('/poll/:offset/:limit', getPolls);
router.get('/poll/:id', getPoll);
router.get('/poll', getPolls);
router.post('/poll/:id', recordPollVote);
router.post('/poll', authCheck, createPoll);
router.put('/poll/:id', authCheck, addPollChoice);
router.delete('/poll/:id', authCheck, deletePoll);

module.exports = router;
