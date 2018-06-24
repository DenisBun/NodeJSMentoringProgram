import express from 'express';
import models from '../database/models/index';

const router = express.Router();

router.get('/api/users', (req, res) => {
  models.Users.findAll({attributes: ['id', 'firstName', 'lastName']}).then(users => res.json(users));
});


export default router; 