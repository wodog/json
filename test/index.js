const JSON = require('..')
const assert = require('assert')

const obj = {
  str: 'aaa',
  num: 123,
  bool: true,
  null: null,
  obj: {
    one: '123',
    two: 23,
    three: null
  },
  arr: ['123', 123, null]
}
const str = '{"str":"aaa","num":123,"bool":true,"null":null,"obj":{"one":"123","two":23,"three":null},"arr":["123",123,null]}'

describe('JSON.stringify', function() {
  it('should be equal', function() {
    let s = JSON.stringify(obj)
    assert.strictEqual(s, str)
  })
})

describe('JSON.parse', function() {
  it('should be equal', function() {
    const o = JSON.parse(str)
    assert.deepEqual(o, obj)
  })
})
