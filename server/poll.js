const express = require('express');
const router = express.Router();

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
    }
    res.clearCookie('authToken');
    res.status(403).send(errorJSON);
  } else {
    res.clearCookie('authToken');
    res.status(403).send(errorJSON);
  }
};

router.get('/polls/:offset', debug.reqMirror);

router.post('/newpoll', authCheck, debug.reqMirror);

router.get('/poll/:id', debug.reqMirror);
router.post('/poll/:id', debug.reqMirror);
router.put('/poll/:id', authCheck, debug.reqMirror);
router.delete('/poll/:id', authCheck, debug.reqMirror);

module.exports = router;
