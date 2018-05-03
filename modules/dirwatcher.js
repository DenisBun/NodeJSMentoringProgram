import fs from 'fs';
import EventEmitter from 'eventemitter3';
import { difference, isEmpty } from 'lodash/fp';

export const dirWatcherEmitter = new EventEmitter();

export default class DirWatcher {
  constructor() {}

  watch(path, delay) {
    fs.readdir(path, (err, files) => {
      if (err) throw err;
      this.pathFiles = files;
    }); 

    this.delayInterval = setInterval(() => {
      fs.readdir(path, (err, files) => {
        if (err) throw err;

        const diff = difference(files, this.pathFiles);
        this.pathFiles = files;
        if (!isEmpty(diff)) {
          diff.forEach(d => dirWatcherEmitter.emit('changed', `${path}/${d}`));
          console.log('emit');
        }
      });
    }, delay);
  }
}