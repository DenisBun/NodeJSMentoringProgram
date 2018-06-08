import express from 'express';
import data from '../data/mockedRoutesData';

const router = express.Router();

router.get('/api/users', (req, res) => {
  res.json(data.users);
});


export default router; 