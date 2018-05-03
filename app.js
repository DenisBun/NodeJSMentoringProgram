import config from './config/config.json';
import models from './config/models';

import DirWatcher from './modules/dirwatcher';
import Importer from './modules/importer';

const { User, Product } = models;

new User();
new Product();

const importer = new Importer();
const watcher = new DirWatcher();

importer.listen();
watcher.watch('data', 5000);