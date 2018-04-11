import config from './config/config.json';
import models from './config/models';

const { User, Product } = models;


console.log(config.name);
new User();
new Product();