'use strict'

/**
 * Decorate a class method such that its body should be invoked only
 * once the Promise(s) defined by `promiseName` on the instance has resolved.
 * @param {String|Array} promiseName name of promise(s) on the class instance
 */
function waitFor (promiseName) {
  const promises = Array.isArray(promiseName)
    ? promiseName
    : [promiseName]
  return (target, prop, descriptor) => {
    const fn = descriptor.value
    delete descriptor.writable
    delete descriptor.value
    descriptor.get = function () {
      return function () {
        return Promise
          .all(promises.map((promiseName) => {
            if (!(this[promiseName] instanceof Promise)) {
              throw new Error(`Expecting this['${promiseName}'] to be a Promise`)
            }
            return this[promiseName]
          }))
          .then(() => {
            return fn.apply(this, Array.from(arguments))
          })
      }.bind(this)
    }
  }
}

/* global define:false window:false */
if (typeof define === 'function' && define.amd) {
  define('waitFor', waitFor)
} else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
  module.exports = waitFor
} else if (typeof window !== 'undefined') {
  window.waitFor = waitFor
} else {
  throw new Error(
    'Environment is not supported. Please raise an issue at ' +
    'https://github.com/sdgluck/wait-for-decorator/issues'
  )
}
