const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'html');
  const file = fs.readFileSync('../data/index.html');
  const result = file.replace(/{\w+}/g, 'Some message for you');
  res.end(result);
});

server.listen('8001', err => {
  if (err) throw err;
  console.log('html-server is listening on 8001');
});