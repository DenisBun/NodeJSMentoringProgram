const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const express = require ('express');

const url = 'mongodb://localhost:27017';
const dbName = 'nodeMentoring';
const router = express.Router();

router.post('/api/cities', (req, res) => {
  const city = req.body || {
    name: 'Brest',
    country: 'Belarus',
    capital: false,
    location: {
        lat: 52.097621,
        long: 23.734050,
    },
  };
  mongo.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log('Connected successfully to server via route POST /api/cities');
    const db = client.db(dbName);
    db.collection('cities-data').insertOne(city, (error, result) => {
      assert.equal(null, err);
      console.log('City inserted');
      res.status(200);
      client.close();
    });    
  });
});

router.get('/api/cities', (req, res) => {
  const resultArr = [];
  mongo.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log('Connected successfully to server via route GET /api/cities');
    const db = client.db(dbName);
    const cursor = db.collection('cities-data').find();
    cursor.forEach((doc, err) => {
      assert.equal(null, err);
      resultArr.push(doc);
    }, () => {
      res.json(resultArr);
      client.close();
    });
  });
});


export default router; 