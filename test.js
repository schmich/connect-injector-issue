var connect = require('connect');
var http = require('http');
var injector = require('connect-injector');
var request = require('request');
var assert = require('assert');

var rewrite = injector(function(req, res) {
    return true;
  }, function(data, req, res, callback) {
    callback(null, 'rewrite');
  }
);

var app = connect().use(rewrite).use(function(req, res) {
  res.end('test');
});

console.log('Starting server.');

var port = 9001;
var server = http.createServer(app).listen(port, function() {
  console.log('Sending request.');

  request('http://127.0.0.1:' + port, function(err, response, body) {
    console.log('Received response.');

    if (err) {
      assert.fail('Error in request.');
    }

    if (!/rewrite/i.test(body)) {
      assert.fail('"rewrite" string not found in response body.');
    }

    console.log('Success.');
    process.exit();
  });
});
