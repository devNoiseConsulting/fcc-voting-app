const util = require('util');

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
