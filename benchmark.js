var Benchmark = require('benchmark');
const WJSON = require('.')
var jsonStr = '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}'
const obj = {
  aa: 22,
  vv: 33,
  asd: {
    sdf:444
  },
  asdss: true,
  rr: [234, 344, {asd: 343}]
}
var suite = new Benchmark.Suite;

// add tests
suite.add('native', function() {
  // JSON.parse(jsonStr)
  JSON.stringify(obj)
})
.add('wjson', function() {
  // WJSON.parse(jsonStr)
  WJSON.stringify(obj)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
