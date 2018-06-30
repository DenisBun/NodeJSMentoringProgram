import express from 'express';
import mongoose from 'mongoose';
import City from '../schemas/citySchema';
import appendLastModifiedData from '../utils/appendLastModifiedData';

const url = 'mongodb://localhost:27017/nodeMentoring';
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
  mongoose.connect(url);
  const data = new City(city);
  appendLastModifiedData(data).save(err => {
    if (err) return console.error(err);
    console.log('saved!');
    res.json(city);
  });
});

router.get('/api/cities', (req, res) => {
  mongoose.connect(url);
  City.find({}, (err, cities) => {
    if (err) return console.error(err);
    res.json(cities);
  })
});

router.put('/api/cities/:id', (req, res) => {
  mongoose.connect(url);
  City.findOneAndUpdate(req.body.capital, { $set: { city: req.body.city, capital: req.body.capital }}, {}, () => {
    res.json(req.body);
  })
});

router.delete('/api/cities/:id', (req, res) => {
  mongoose.connect(url);
  City.deleteOne({ id: req.params.id }, err => {
    res.json(req.params.id);
  });
});


export default router; 