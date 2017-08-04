const express = require('express');
const router = express.Router();

const debug = require('./debug');

router.post('/newpoll', debug.reqMirror);

router.get('/poll/:id', debug.reqMirror);
router.post('/poll/:id', debug.reqMirror);
router.put('/poll/:id', debug.reqMirror);
router.delete('/poll/:id', debug.reqMirror);
router.all('/poll/:id', debug.reqMirror);

module.exports = router;
