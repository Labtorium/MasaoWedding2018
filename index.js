var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var dgram = require('dgram');

var html = fs.readFileSync('index.html');
var http = require('http').createServer(function(req, res) {
  if (req.method == 'GET') {
      console.log(req.url);
      var ext = path.extname(req.url);
      if (ext == '.css') {
          var file = (req.url).substr(1);
          var css = fs.readFileSync(file);
          res.writeHead(200, {'Content-Type': 'text/css'});
          res.end(css);
      } else if (ext == '.js') {
          var file = (req.url).substr(1);
          var js = fs.readFileSync(file);
          res.writeHead(200, {'Content-Type': 'application/javascript'});
          res.end(js);
      } else if (ext == '.ttf') {
          var file = (req.url).substr(1);
          var ttf = fs.readFileSync(file);
          res.writeHead(200, {'Content-Type': 'application/x-font-ttf'});
          res.end(ttf);
      } else if (ext == '.html') {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(html);
      } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(html);
      }
  }
});
var options = {
  //"transports" : ["websocket"]
}
var io = require('socket.io')(http, options);
http.listen(50000);

sock = dgram.createSocket("udp4", function (msg, rinfo) {
    var data = msg.toString('ascii', 0, rinfo.size);
    io.emit('msg', data);
    console.log(data);
});
sock.bind(5001);
