const minimist = require('minimist');
const through2 = require('through2');
const fs = require('fs');
const csv2json = require('csvtojson');

process.stdin.setEncoding('utf8');

const args = minimist(process.argv.slice(2), {
  boolean: true,
  alias: {
     'help': 'h',
     'action': 'a',
     'file': 'f',
     'path': 'p',
  },
  default: { 'help': true },
  unknown: (arg) => {
     console.error('Unknown option: ', arg);
     return false;
  }
});

const transformStreamFromInToOut = handler => {
  process.stdin.pipe(through2(function(chunk, enc, callback) {
    this.push(handler(chunk));
    callback();
  }))
  .pipe(process.stdout);
};

const isValidFileExtension = (str, extension) => {
  if (str.substr(-extension.length, extension.length) !== extension) {
    console.error(`File must have .${extension} extension`);
    return false;
  }
  return true;
};

const showHelpMenu = () => {
  console.log('-h, --help output usage info');
  console.log('-f, --file=<path_to_file> file for action');
  console.log('-a, --action=<action_name> or -a <action_name> one of actions below:');
  console.log('-p, --path=<path_to_folder> path to files for cssBundler action');
  console.log('-----------------------------------------------------------------');
  console.log('reverse - reverse string data from process.stdin to process.stdout');
  console.log('transform - convert data from process.stdin to upper-cased data on process.stdout');
  console.log('outputFile - output file provided by --file option to process.stdout');
  console.log('convertFromFile - convert file provided by --file option from csv to json and output data to process.stdout');
  console.log('convertToFile - convert file provided by --file option from csv to json and output data to a result file with json extension');
};

const reverse = chunk => Buffer.from(chunk).toString().split('').reverse().join('');

const transform = chunk => Buffer.from(chunk).toString().toUpperCase();

const outputFile = () => {
  fs.createReadStream(args.file).pipe(process.stdout);
};


const convertFromFile = () => {
  if (!isValidFileExtension(args.file, 'csv')) { return; }
  csv2json()
    .fromFile(args.file)
    .pipe(process.stdout);
};
  
const convertToFile = () => {
  if (!isValidFileExtension(args.file, 'csv')) { return; }
  csv2json()
    .fromFile(args.file)
    .pipe(fs.createWriteStream(args.file.substr(0, args.file.length - 3) + 'json'));  
};

const cssBundler = () => {
  const bundeledFileName = '/bundle.css';
  fs.readdir(args.path, (err, files) => {
    if (err) throw err;
    fs.createWriteStream(args.path + bundeledFileName);
    files.filter(fileName => checkFileExtension(fileName, 'css'))
      .forEach(fileName => {  
        fs.createReadStream(`${args.path}\\${fileName}`)
          .pipe(through2(function(chunk, enc, cb) {
            fs.appendFile(args.path + bundeledFileName, Buffer.from(chunk).toString(), err => { if (err) console.log(err); });
            cb();
          }));
  
      });
  });
};
  
  
switch (args.action) {
  case 'reverse': transformStreamFromInToOut(reverse);
    break;
  case 'transform': transformStreamFromInToOut(transform);
    break;
  case 'outputFile': outputFile();
    break;
  case 'convertFromFile': convertFromFile();
    break;
  case 'convertToFile': convertToFile();
    break;
  case 'cssBundler': cssBundler();
    break;
  default: showHelpMenu();
}