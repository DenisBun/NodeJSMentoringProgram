import express from 'express';

import cookiesParser from '../middlewares/cookieParser';
import queryParser from '../middlewares/queryParser';

const middlewares = app => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookiesParser);
  app.use(queryParser);
};

export default middlewares;