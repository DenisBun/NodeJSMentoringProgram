import express from 'express';
import passport from 'passport';

import localAuthStrategy from '../src/auth/localStrategy';
import facebookStrategy from '../src/auth/facebookStrategy';
import twitterStrategy from '../src/auth/twitterStrategy';
import googleStrategy from '../src/auth/googleStrategy';

import cookiesParser from '../middlewares/cookieParser';
import queryParser from '../middlewares/queryParser';

const middlewares = app => {
  localAuthStrategy();
  facebookStrategy();
  twitterStrategy();
  googleStrategy();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookiesParser);
  app.use(queryParser);
  app.use(passport.initialize());
  app.use(passport.session());
};

export default middlewares;