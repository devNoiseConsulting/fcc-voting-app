const mongo = require('mongodb').MongoClient;
const db = require('./db');
const dbUrl = "mongodb://" + process.env.DBUSER + ":" + process.env.DBPASSWORD + "@" + process.env.DBURL;

const express = require("express");
const fs = require("fs");
const util = require('util');

const app = express();
const router = app.Router;

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

app.get('/api', function(req, res) {
  const reqKeys = [
  'baseUrl',
  'body',
  'cookies',
  'fresh',
  'hostname',
  'ip',
  'ips',
  'method',
  'originalUrl',
  'params',
  'path',
  'protocol',
  'query',
  'route',
  'secure',
  'signedCookies',
  'stale',
  'subdomains',
  'xhr'];
  let reqInfo = {};
  reqKeys.forEach(key => reqInfo[key] = req[key]);
  //res.end(JSON.stringify(util.inspect(reqInfo), null, 2));
  res.end(util.inspect(reqInfo));
});


db.connect(dbUrl, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(app.get("port"), () => {
          console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
          console.log(dbUrl);
        });
    }
});
