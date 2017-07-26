let pos, str

module.exports = function parse (jsonStr) {
  pos = 0
  str = jsonStr
  return parseValue()
}

function parseValue () {
  skip()
  let result = ''
  const char = str[pos]
  if (char === '{') {
    result = parseObject()
  } else if (char === '[') {
    result = parseArray()
  } else if (char === '"') {
    result = parseString()
  } else if (char === 't') {
    result = parseTrue()
  } else if (char === 'f') {
    result = parseFalse()
  } else if (char === 'n') {
    result = parseNull()
  } else if (isNumber(char)) {
    result = parseNumber()
  } else {
    throw new Error('[JSON parse error]: syntax error')
  }
  skip()
  return result
}

function parseObject() {
  const result = {}
  pos++
  while (str[pos] !== '}') {
    if (str[pos] === undefined) {
      throw new Error('[JSON parse error]: no closing bracket')
    }
    const key = parseValue()
    const value = parseValue()
    result[key] = value
  }
  pos++
  return result
}

function parseArray () {
  const result = []
  pos++
  while (str[pos] !== ']') {
    if (str[pos] === undefined) {
      throw new Error('[JSON parse error]: no closing bracket')
    }
    result.push(parseValue())
    skip()
  }
  pos++
  return result
}

function parseString() {
  let result = ''
  pos++
  while (str[pos] !== '"') {
    if (str[pos] === undefined) {
      throw new Error('[JSON parse error]: no closing quote')
    }
    result += str[pos++]
  }
  pos++
  return result
}

function parseTrue() {
  pos += 4
  return true
}

function parseFalse() {
  pos += 5
  return false
}

function parseNull() {
  pos += 4
  return null
}

function parseNumber() {
  let result = ''
  while (isNumber(str[pos])) {
    result += str[pos++]
  }
  return parseInt(result)
}

function isNumber(char) {
  return parseInt(char) > 0
}

function skip () {
  while (str[pos] === ' ' || str[pos] === ':' || str[pos] === ',' || str[pos] === '\n' || str[pos] === '\r') {
    pos++
  }
}
