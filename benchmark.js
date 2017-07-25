var Benchmark = require('benchmark');
const WJSON = require('.')
var jsonStr = '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}'
var suite = new Benchmark.Suite;

// add tests
suite.add('native', function() {
  JSON.parse(jsonStr)
})
.add('wjson', function() {
  WJSON.parse(jsonStr)
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
