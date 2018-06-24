import express from 'express';
import models from '../database/models/index';

const router = express.Router();


router.get('/api/products', (req, res) => {
  models.Products.findAll({attributes: ['id', 'name', 'brand', 'price']}).then(products =>res.json(products));
});

router.get('/api/products/:id', (req, res) => {
  models.Products.findAll({
    attributes: ['id', 'name', 'brand', 'price'], 
    where: {
      id: req.params.id
    }
  }).then(products =>res.json(products));
});

// router.get('/api/products/:id/reviews', (req, res) => {
//   const reviews = data.reviews.filter(review => review.productId === req.params.id);
//   res.json(reviews.length ? reviews : {});
// });

router.post('/api/products',  (req, res) => {
  models.Products.create(req.body).then(products =>res.json(products));
});

export default router; 
