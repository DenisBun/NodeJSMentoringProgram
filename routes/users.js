import express from 'express';
import mongoose from 'mongoose';
import User from '../schemas/userSchema';
import users from '../data/users';
import appendLastModifiedData from '../utils/appendLastModifiedData';

const url = 'mongodb://localhost:27017/nodeMentoring';
const dbName = 'nodeMentoring';

const router = express.Router();

/**
* @swagger
* /api/users:
*   get:
*     tags:
*       - Users
*     summary: Get all users
*     operationId: FindAllUsers
*     produces:
*       - application/json
*     parameters: []
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/responses/UsersResponse'
*       400:
*         description: cannot find products
*/
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

/**
* @swagger
* /users/{id}:
*   delete:
*     tags:
*       - Users
*     summary: Find user by id and delete
*     operationId: deleteUser
*     produces:
*       - application/json
*     parameters:
*       - $ref: '#/parameters/UserId'
*     responses:
*       200:
*         description: user was deleted
*       400:
*         description: Cannot find user
*/
router.delete('/api/users/:id', (req, res) => {
  mongoose.connect(url);
  User.deleteOne({ id: req.params.id }, err => {
    res.json(req.params.id);
  });
});


export default router; 