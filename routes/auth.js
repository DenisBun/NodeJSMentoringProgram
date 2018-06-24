import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import data from '../data/mockedRoutesData';

const router = express.Router();

router.post('/auth', 
  // passport.authenticate('local'),
  (req, res) => {
    const { login, password } = req.body;
    const isUserExists = data.users.some(({email,password}) => email === login && password === password);
    if (isUserExists) {
        // const token = jwt.sign({ login, password }, 'secret', { expiresIn: 60 });
        res.send({
          code: 200,
          message: 'OK',
          data: {
            login,
            password,
          },
          token,
        });
      } else {
        res.json({
          code: 404,
          message: `User ${login} not Found`,
         });
     }
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/callback/facebook',
  passport.authenticate('facebook'),
  (req, res) => {
    console.log(`Hi, ${req.user.displayName}`);
    res.redirect('/');
});


router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/callback/twitter',
  passport.authenticate('twitter'),
  (req, res) => {
    console.log(`Hi, ${req.user.displayName}`);
    res.redirect('/');
});


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

router.get('/auth/callback/google',
  passport.authenticate('google'),
  (req, res) => {
    console.log(`Hi, ${req.user.displayName}`);
    res.redirect('/');
});

export default router; 