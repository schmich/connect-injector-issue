var connect = require('connect');
var http = require('http');
var injector = require('connect-injector');

var rewrite = injector(function(req, res) {
    return true;
  }, function(data, req, res, callback) {
    callback(null, 'rewrite');
  }
);

var app = connect().use(rewrite).use(function(req, res) {
  res.end('test');
});

var port = 9001;
var server = http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port);
});
