const type = require('type')

module.exports = stringify

function stringify (obj) {
  return stringifyValue(obj)
}

function stringifyValue (obj) {
  if (type.isString(obj)) {
    return stringifyString(obj)
  } else if (type.isNumber(obj)) {
    return stringifyNumber(obj)
  } else if (type.isBoolean(obj)) {
    return stringifyBoolean(obj)
  } else if (type.isArray(obj)) {
    return stringifyArray(obj)
  } else if (type.isNull(obj)) {
    return stringifyNull(obj)
  } else if (type.isObject(obj)){
    return stringifyObject(obj)
  } else {
    throw new Error('[JSON stringify error], invalid data type')
  }
}

function stringifyBoolean(obj) {
  return obj
}

function stringifyString(obj) {
  return `"${obj}"`
}

function stringifyNumber(obj) {
  return obj
}

function stringifyNull(obj) {
  return obj
}

function stringifyArray (obj) {
  let result = '['
  for (let i = 0; i < obj.length; i++) {
    result += stringifyValue(obj[i])
    if (i !== obj.length -1) {
      result += ','
    }
  }
  result += ']'
  return result
}

function stringifyObject(obj) {
  let result = '{'
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    result += `"${keys[i]}":${stringifyValue(obj[keys[i]])}`
    if (i !== keys.length - 1) {
      result += ','
    }
  }
  result += '}'
  return result
}
