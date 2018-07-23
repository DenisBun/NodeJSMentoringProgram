import express from 'express';
import mongoose from 'mongoose';
import User from '../schemas/userSchema';
import users from '../data/users';
import appendLastModifiedData from '../utils/appendLastModifiedData';

const url = 'mongodb://localhost:27017/nodeMentoring';
const dbName = 'nodeMentoring';

const router = express.Router();

router.get('/api/users', (req, res) => {
  mongoose.connect(url);
  User.find({}, (err, users) => {
    if (err) return console.error(err);
    const userMap = {};
    users.forEach(user => {
      userMap[user._id] = user;
    });
    res.json(userMap);
  });
});

router.post('/api/users/seed', (req, res) => {
  mongoose.connect(url);
  users.map(appendLastModifiedData);
  User.insertMany(users, (error, docs) => {
    res.json(docs);
  });
});

router.delete('/api/users/:id', (req, res) => {
  mongoose.connect(url);
  User.deleteOne({ id: req.params.id }, err => {
    res.json(req.params.id);
  });
});


export default router; 