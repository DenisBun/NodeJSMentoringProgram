const http = require('http');
const stream = require('stream');
const util = require('util');
const fs = require('fs');

class CustomTransform extends stream.Transform {
  _transform(chunk, enc, cb) {
    const transformedChunk = chunk.toString().replace(/{\w+}/g, 'Some message for you');
    this.push(transformedChunk);
    cb();
  }
}

util.inherits(CustomTransform, stream.Transform);

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'html');
  const fileStream = fs.createReadStream('../data/index.html');
  const ct = new CustomTransform();
  ct.pipe(fileStream);
  ct.pipe(res);
  ct.end();
});

server.listen('8001', err => {
  if (err) throw err;
  console.log('html-server-streamable is listening on 8001');
});