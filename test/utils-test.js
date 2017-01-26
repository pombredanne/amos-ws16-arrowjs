const utils = require('../lib/utils')
const buster = require('buster')

buster.testCase('utils', {
  'toDebugString': {
    'should return a human readable string of a javascript object': function () {
      let obj = { x: '134', y: 123, 'this-is-z': null }
      let str = utils.toDebugString(obj)
      buster.assert.equals(str, '{ x: \'134\', y: 123, \'this-is-z\': null }')
    }
  },
  'insertByPath': {
    'valid insert - path exists in object': function () {
      let object = { a: { b: { } } }
      utils.insertByPath(object, 'a.b.id', 'something')
      buster.assert.equals(object.a.b.id, 'something')
    },
    'valid insert - path does not exist in object': function () {
      let object = { a: {} }
      utils.insertByPath(object, 'a.b.id', 'something')
      buster.assert.equals(object.a.b.id, 'something')
    },
    'object must be defined': function () {
      buster.assert.exception(() => utils.insertByPath(null, 'a.b.id', 'something'))
      buster.assert.exception(() => utils.insertByPath(undefined, 'a.b.id', 'something'))
    },
    'path must be defined': function () {
      buster.assert.exception(() => utils.insertByPath({ }, null, 'something'))
      buster.assert.exception(() => utils.insertByPath({ }, undefined, 'something'))
    },
    'path must be a string': function () {
      buster.assert.exception(() => utils.insertByPath({ }, 123, 'something'))
    },
    'path cannot include array': function () {
      buster.assert.exception(() => utils.insertByPath({ }, 'string[].a', 'something'))
    },
    'content must be defined': function () {
      buster.assert.exception(() => utils.insertByPath({ }, 'a.b.c', undefined))
      buster.assert.exception(() => utils.insertByPath({ }, 'a.b.c', null))
    }
  }
})
