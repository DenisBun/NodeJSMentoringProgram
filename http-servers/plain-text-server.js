const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.end('Hello World!');
});

server.listen('8001', err => {
  if (err) throw err;
  console.log('plain-text-server is listening on 8001');
});