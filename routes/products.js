import express from 'express';
import mongoose from 'mongoose';
import Product from '../schemas/productSchema';
import products from '../data/products';
import appendLastModifiedData from '../utils/appendLastModifiedData';

const url = 'mongodb://localhost:27017/nodeMentoring';
const dbName = 'nodeMentoring';
const router = express.Router();

/**
* @swagger
* /api/products:
*   get:
*     tags:
*       - Products
*     summary: Get all products
*     operationId: FindAllProducts
*     produces:
*       - application/json
*     parameters: []
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/responses/ProductsResponse'
*       400:
*         description: Invalid request
*/
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

/**
* @swagger
* /api/products/{id}:
*   get:
*     tags:
*       - Products
*     summary: Find product by id
*     operationId: FindProductById
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/ProductId'
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/responses/SingleProduct'
*       400:
*         description: Cannot find product
*/


router.get('/api/products/:id', (req, res) => {
  mongoose.connect(url);
  Product.findById(req.params.id, (err, product) => {
    res.json(product);
  });
});

/**
* @swagger
* /api/products:
*   post:
*     tags:
*       - Products
*     summary: Create product
*     operationId: CreateProduct
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/CreteProducts'
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/responses/SingleProduct'
*       400:
*         description: Cannot find user
*/
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

/**
* @swagger
* /api/products/{id}:
*   delete:
*     tags:
*       - Products
*     summary: Find product by id and delete
*     operationId: deleteProduct
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/ProductId'
*     responses:
*       200:
*         description: product was deleted
*       400:
*         description: Cannot find product
*/


router.delete('/api/products/:id', (req, res) => {
  mongoose.connect(url);
  Product.deleteOne({ id: req.params.id }, err => {
    res.json(req.params.id);
  });
});


export default router; 
