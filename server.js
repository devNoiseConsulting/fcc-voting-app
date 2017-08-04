const mongo = require('mongodb').MongoClient;
const db = require('./db');
const dbUrl = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASSWORD + '@' + process.env.DBURL;

const debug = require('./server/debug');
const loginRouter = require('./server/login');
const pollRouter = require('./server/poll');

const express = require('express');

const app = express();
const router = app.Router;

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/public'));
}

app.use('/api', loginRouter);
app.use('/api', pollRouter);
app.get('/api', debug.reqMirror);

//app.get('*', debug.reqMirror);

db.connect(dbUrl, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(app.get('port'), () => {
          console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
          console.log(dbUrl);
        });
    }
});
