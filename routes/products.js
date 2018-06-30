import express from 'express';
import mongoose from 'mongoose';
import Product from '../schemas/productSchema';
import products from '../data/products';
import appendLastModifiedData from '../utils/appendLastModifiedData';

const url = 'mongodb://localhost:27017/nodeMentoring';
const dbName = 'nodeMentoring';
const router = express.Router();


router.get('/api/products', (req, res) => {
  mongoose.connect(url);
  Product.find({}, (err, products) => {
    if (err) return console.error(err);
    const productMap = {};

    products.forEach(function(product) {
      productMap[product._id] = product;
    });
    res.json(productMap);
  });
});

router.get('/api/products/:id', (req, res) => {
  mongoose.connect(url);
  Product.findById(req.params.id, (err, product) => {
    res.json(product);
  });
});

router.post('/api/products', (req, res) => {
  const data = new Product(req.body);
  appendLastModifiedData(data).save(err => {
    if (err) return console.error(err);
    console.log('saved!');
  });
});

router.post('/api/products/seed',  (req, res) => {
  mongoose.connect(url);
  Product.insertMany(products, (error, docs) => {
    res.json(docs);
  });
});

router.delete('/api/products/:id', (req, res) => {
  mongoose.connect(url);
  Product.deleteOne({ id: req.params.id }, err => {
    res.json(req.params.id);
  });
});


export default router; 
