# c-cpp-modules-webpack-loader
Compiles C and C++ to WASM using Emscripten


### Configuration

 * test.c
```c
int add(int a, int b) {
   return a + b;
}
```


 * test.js
```javascript
const wasmC = require('./test.c');
wasmC({
  'global': {},
  'env': {
    'memoryBase': 0,
    'tableBase': 0,
    'memory': new WebAssembly.Memory({initial: 256}),
    'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'})
  }}).then(result => {
    const exports = result.instance.exports;
    const add = exports._add;
    console.log('C return value was', add(2, 3));
});
```

 * webpack.config.js
```javascript
      rules: [
        {
          test: /\.(c|cpp)$/,
          use: [{
            loader: 'wasm-loader'
          }, {
            loader: 'c-cpp-modules-webpack-loader',
            options: {
              compiller: '-Os -s WASM=1 -s SIDE_MODULE=1'
            }
          }]
        }
      ]
```

 * package.json
```javascript
  "devDependencies": {
    "webpack": ">=3.10.0",
    "wasm-loader": ">=1.1.0",
    "c-cpp-modules-webpack-loader": ">=0.9.9"
  }
```
