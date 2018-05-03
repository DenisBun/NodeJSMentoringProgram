import csvtojson from 'csvtojson';
import { dirWatcherEmitter } from './dirwatcher';

export default class Importer {
  constructor() {}

  listen() {
    dirWatcherEmitter.on('changed', path => {
      this.import(path);
    });
  }

  import(path) {
    return new Promise((() => {
      csvtojson()
        .fromFile(path)
        .on('json', json => {
          console.log(json);
        });
    }));
  }

  importSync(path) {
    csvtojson()
      .fromFile(path)
      .on('json', json => {
        console.log(json);
      });
  }
}