const util = require('util');

const jwt = require('jwt-simple');

const jwtSecret = Buffer.from(process.env.JWT_SECRET, 'hex');


module.exports.reqMirror = function(req, res) {
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
  res.end(util.inspect(reqInfo));
};

module.exports.debugToken = function(req, res) {
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
  'secure',
  'signedCookies',
  'stale',
  'subdomains',
  'xhr'];
  let reqInfo = {};
  reqKeys.forEach(key => reqInfo[key] = req[key]);
  const payload = util.inspect(reqInfo);
  const token = jwt.encode(payload, jwtSecret);

  res.end(token);
}
