const http = require('http');
const products = require('../data/products');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(products));
});

server.listen('8001', err => {
  if (err) throw err;
  console.log('json-server is listening on 8001');
});