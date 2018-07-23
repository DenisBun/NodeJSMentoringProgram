import express from 'express';
import mongoose from 'mongoose';
import City from '../schemas/citySchema';
import appendLastModifiedData from '../utils/appendLastModifiedData';

const url = 'mongodb://localhost:27017/nodeMentoring';
const dbName = 'nodeMentoring';
const router = express.Router();

/**
* @swagger
* /api/cities:
*   post:
*     tags:
*       - Cities
*     summary: Create city
*     operationId: createCity
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/City'
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/responses/CitiesResponse'
*       400:
*         description: Cannot find user
*/

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

/**
* @swagger
* /api/cities:
*   get:
*     tags:
*       - Cities
*     summary: Get all cities
*     operationId: getAllCities
*     produces:
*       - application/json
*     parameters: []
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/responses/CitiesResponse'
*       400:
*         description: Invalid request
*/

router.get('/api/cities', (req, res) => {
  mongoose.connect(url);
  City.find({}, (err, cities) => {
    if (err) return console.error(err);
    res.json(cities);
  })
});

/**
* @swagger
* /api/cities/{id}:
*   put:
*     tags:
*       - Cities
*     summary: Update city
*     operationId: updateCity
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/CityId'
*       - $ref: '#/parameters/UpdatedOrNewCity'
*     responses:
*       200:
*         description: successful operation
*         schema:
*         -$ref: '#/responses/CitiesResponse'
*       400:
*         description: Cannot find user
*/


router.put('/api/cities/:id', (req, res) => {
  mongoose.connect(url);
  City.findOneAndUpdate(req.body.capital, { $set: { city: req.body.city, capital: req.body.capital }}, {}, () => {
    res.json(req.body);
  })
});

/**
* @swagger
* /api/cities/{id}:
*   delete:
*     tags:
*       - Cities
*     summary: Find city by id and delete
*     operationId: deleteCity
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/CityId'
*     responses:
*       200:
*         description: city was deleted
*       400:
*         description: Cannot find city
*/

router.delete('/api/cities/:id', (req, res) => {
  mongoose.connect(url);
  City.deleteOne({ id: req.params.id }, err => {
    res.json(req.params.id);
  });
});


export default router; 