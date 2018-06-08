const http = require('http');

const server = http.createServer((req, res) => {
  req.pipe(res);
});

server.listen('8001', err => {
  if (err) throw err;
  console.log('echo-server is listening on 8001');
});