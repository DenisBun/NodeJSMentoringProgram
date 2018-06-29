import app from './app';
// const mongo = require('mongodb').MongoClient;
// const assert = require('assert');

import productRouter from './routes/products';
import userRouter from './routes/users';
import authRouter from './routes/auth';
import citiesRouter from './routes/cities';


 
// Connection URL
const url = 'mongodb://localhost:27017/nodeMentoring';
 
// Database Name
const dbName = 'nodeMentoring';
 
// Use connect method to connect to the server
// mongo.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
 
//   const db = client.db(dbName);
 
//   client.close();
// })

const port = 8080;

app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', citiesRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));