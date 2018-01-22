const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function(content) {
	this.cacheable && this.cacheable();
	this.value = content;

  const options = this.query;

  const source = this.resourcePath;
  const destination = this.resourcePath + '.wasm';

  let compillerOptions;

  if (options && options.compiller) {
    compillerOptions = options.compiller;
  } else {
    compillerOptions = '-Os -s WASM=1 -s SIDE_MODULE=1';
  }

  const command = 'emcc ' + source + ' ' + compillerOptions + ' -o ' + destination;

  const execEndCode = execSync(command);
  return fs.readFileSync(destination);

}
module.exports.seperable = true;