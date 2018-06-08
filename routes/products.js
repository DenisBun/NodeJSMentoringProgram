import express from 'express';
import data from '../data/mockedRoutesData';

const router = express.Router();

router.get('/api/products', (req, res) => {
    res.json(data.products);
});

router.get('/api/products/:id', (req, res) => {
  const product = data.products.filter(product => product.id === req.params.id);
  res.json(product);
});

router.get('/api/products/:id/reviews', (req, res) => {
  const reviews = data.reviews.filter(review => review.productId === req.params.id);
  res.json(reviews.length ? reviews : {});
});

router.post('/api/products', (req, res) => {
  data.products = [...data.products, req.body];
  res.json(req.body);
});

export default router; 
