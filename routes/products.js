import express from 'express';
import jwtVerifier from '../middlewares/jwtVerifier';
import data from '../data/mockedRoutesData';

const router = express.Router();

router.get('/api/products', jwtVerifier, (req, res) => {
    res.json(data.products);
});

router.get('/api/products/:id', jwtVerifier, (req, res) => {
  const product = data.products.filter(product => product.id === req.params.id);
  res.json(product);
});

router.get('/api/products/:id/reviews', jwtVerifier, (req, res) => {
  const reviews = data.reviews.filter(review => review.productId === req.params.id);
  res.json(reviews.length ? reviews : {});
});

router.post('/api/products', jwtVerifier,  (req, res) => {
  data.products = [...data.products, req.body];
  res.json(req.body);
});

export default router; 
