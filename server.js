const mongoose = require('mongoose');
const dbUrl = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASSWORD + '@' + process.env.DBURL;

const debug = require('./server/debug');
const loginRouter = require('./server/login');
const pollRouter = require('./server/poll');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/public'));
}

app.use('/api', loginRouter);
app.use('/api', pollRouter);
app.get('/api', debug.reqMirror);

//app.get('*', debug.reqMirror);

// https://www.mongodb.com/blog/post/part-2-introducing-mongoose-to-your-nodejs-and-restify-api
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  //console.log(dbUrl);

  /**
	 * Connect to MongoDB via Mongoose
	 */
  const opts = {
    useMongoClient: true,
    promiseLibrary: global.Promise,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    config: {
      autoIndex: true
    }
  }

  mongoose.Promise = opts.promiseLibrary
  mongoose.connect(dbUrl, opts)

  const db = mongoose.connection

  db.on('error', (err) => {
    if (err.message.code === 'ETIMEDOUT') {
      console.log(err)
      mongoose.connect(dbUrl, opts)
    }
  })

  db.once('open', () => {
    console.log(`Connected to MongoDB`);
  });
});
